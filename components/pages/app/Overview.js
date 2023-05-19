import { useEffect, useState } from "react";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useSWR from "swr";

import previousSunday from "date-fns/previousSunday";
import startOfMonth from "date-fns/startOfMonth";
import compareAsc from "date-fns/compareAsc";
import format from "date-fns/format";

import Card from "./Card";
import Analytics from "./Analytics";
import Chart from "./Chart";
import ReportsStats from "./ReportsStats";
import { useAllReportsStore } from "@/store/store";
import { fetcher } from "@/utils/fetcher";

const Overview = () => {
  const allReports = useAllReportsStore((state) => state.allReports);
  const setAllReports = useAllReportsStore((state) => state.setAllReports);

  const currentDay = format(new Date(), "MMM d',' yyyy");
  const [weekCount, setWeekCount] = useState(0);
  const [weekStart, setWeekStart] = useState(currentDay);
  const [monthCount, setMonthCount] = useState(0);
  const [monthStart, setMonthStart] = useState(currentDay);
  const [firstRepDate, setFirstRepDate] = useState(currentDay);

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}?orderBy=id:desc&sizePerPage=999`,
    fetcher
  );

  useEffect(() => {
    const firstRep = data?.results?.total - 1;
    const oldestErrData = data?.results?.data[firstRep].created_at;
    setAllReports(data);
    handleWeekCard(data?.results?.data);
    handleMonthCard(data?.results?.data);
    if (data) {
      const firstRepFormat = format(new Date(oldestErrData), "MMM d',' yyyy");
      setFirstRepDate(firstRepFormat);
    }
  }, [data, setAllReports]);

  const handleWeekCard = (dataArray) => {
    if (!dataArray) return;
    const latestSunday = previousSunday(new Date());
    const formatLastSun = format(new Date(latestSunday), "MMM d',' yyyy");
    let thisWeekCount = 0;
    for (let i of dataArray) {
      const reportDate = new Date(i.created_at);
      const isThisWeek = compareAsc(reportDate, latestSunday);
      if (isThisWeek >= 0) {
        thisWeekCount++;
      } else {
        break;
      }
    }
    setWeekCount(thisWeekCount);
    setWeekStart(formatLastSun);
  };

  const handleMonthCard = (dataArray) => {
    if (!dataArray) return;
    const firstDayMonth = startOfMonth(new Date());
    const formatfirstDay = format(new Date(firstDayMonth), "MMM d',' yyyy");
    let thisMonthCount = 0;
    for (let i of dataArray) {
      const reportDate = new Date(i.created_at);
      const isThisMonth = compareAsc(reportDate, firstDayMonth);
      if (isThisMonth >= 0) {
        thisMonthCount++;
      } else {
        break;
      }
    }
    setMonthStart(formatfirstDay);
    setMonthCount(thisMonthCount);
  };

  if (error)
    return <p className="text-center mt-5 pt-5">An error has occurred.</p>;
  if (isLoading)
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center mt-5 pt-5"
      >
        <Image src="/loader.svg" width={30} height={30} alt="loader image" />
      </Container>
    );
  if (!allReports) {
    return <p>No reports found.</p>;
  }
  return (
    <Container fluid className="overviewWrapper">
      <Row>
        <Col xs={12} md={4} className="p-2 p-md-4">
          <Card
            count={weekCount}
            startDate={weekStart}
            endDate={currentDay}
            description={"Errors this week"}
          />
        </Col>
        <Col xs={12} md={4} className="p-2 p-md-4">
          <Card
            count={monthCount}
            startDate={monthStart}
            endDate={currentDay}
            description={"Errors this month"}
          />
        </Col>
        <Col xs={12} md={4} className="p-2 p-md-4">
          <Card
            count={data?.results?.total}
            startDate={firstRepDate}
            endDate={currentDay}
            description={"Total Errors"}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} className="p-2 p-md-4">
          <Analytics />
        </Col>
        <Col xs={12} md={8} className="p-2 p-md-4">
          <Chart />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="p-2 p-md-4">
          <ReportsStats title={"Most Reports by Name"} />
        </Col>
        <Col xs={12} md={6} className="p-2 p-md-4">
          <ReportsStats title={"Most Reports by Role"} />
        </Col>
      </Row>
    </Container>
  );
};

export default Overview;
