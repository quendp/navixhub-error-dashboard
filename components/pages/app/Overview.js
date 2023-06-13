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

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("./Chart"), { ssr: false });

import ReportsStats from "./ReportsStats";
import { useAllReportsStore, useApi, useVersion } from "@/store/store";
import { fetcher } from "@/utils/fetcher";

const Overview = () => {
  const allReports = useAllReportsStore((state) => state.allReports);
  const setAllReports = useAllReportsStore((state) => state.setAllReports);
  const api = useApi((state) => state.api);
  const setVersion = useVersion((state) => state.setVersion);

  const currentDay = format(new Date(), "MMM d',' yyyy");
  const [weekCount, setWeekCount] = useState(0);
  const [weekStart, setWeekStart] = useState(currentDay);
  const [monthCount, setMonthCount] = useState(0);
  const [monthStart, setMonthStart] = useState(currentDay);
  const [firstRepDate, setFirstRepDate] = useState(currentDay);

  const [monthlyReports, setMonthlyReports] = useState({});
  const [errorByName, setErrorByName] = useState([]);
  const [errorByRole, setErrorByRole] = useState([]);

  const { data, error, isLoading } = useSWR(
    `${api}?orderBy=id:desc&sizePerPage=999`,
    fetcher
  );

  useEffect(() => {
    if (data?.results?.data?.length > 0) {
      setAllReports(data);
      const firstRep = data?.results?.total - 1;
      const oldestErrData = data?.results?.data[firstRep]?.created_at;
      handleAnalyticsData(data?.results?.data);
      handleMonthlyReports(data?.results?.data);
      handleParseData(data?.results?.data);
      const firstRepFormat = format(new Date(oldestErrData), "MMM d',' yyyy");
      setFirstRepDate(firstRepFormat);
      setVersion(data?.version);
    }
  }, [data, setAllReports, setVersion]);

  const handleMonthlyReports = (dataArray) => {
    if (!dataArray) return;
    let newMonthlyRep = {};
    for (let i of dataArray) {
      const monthReported = format(new Date(i.created_at), "MMM yyyy");
      if (newMonthlyRep.hasOwnProperty(monthReported)) {
        newMonthlyRep = {
          ...newMonthlyRep,
          [monthReported]: newMonthlyRep[monthReported] + 1,
        };
      } else {
        newMonthlyRep = {
          ...newMonthlyRep,
          [monthReported]: 1,
        };
      }
    }
    setMonthlyReports(newMonthlyRep);
  };

  const handleAnalyticsData = (dataArray) => {
    if (!dataArray) return;
    const latestSunday = previousSunday(new Date());
    const formatLastSun = format(new Date(latestSunday), "MMM d',' yyyy");
    const firstDayMonth = startOfMonth(new Date());
    const formatfirstDay = format(new Date(firstDayMonth), "MMM d',' yyyy");
    let thisWeekCount = 0;
    let isWeekDone = false;
    let thisMonthCount = 0;
    let isMonthDone = false;
    for (let i of dataArray) {
      const reportDate = new Date(i.created_at);
      if (!isWeekDone) {
        const isThisWeek = compareAsc(reportDate, latestSunday);
        if (isThisWeek >= 0) {
          thisWeekCount++;
        } else {
          isWeekDone = true;
        }
      }
      if (!isMonthDone) {
        const isThisMonth = compareAsc(reportDate, firstDayMonth);
        if (isThisMonth >= 0) {
          thisMonthCount++;
        } else {
          isMonthDone = true;
        }
      }
    }
    setWeekCount(thisWeekCount);
    setWeekStart(formatLastSun);
    setMonthStart(formatfirstDay);
    setMonthCount(thisMonthCount);
  };

  const handleParseData = (dataArray) => {
    if (!dataArray) return;
    let errByName = {};
    let errByRole = {};
    for (let i of dataArray) {
      const errDescription = i.error_description;
      try {
        const parsedDesc = JSON.parse(errDescription);
        if (errByName.hasOwnProperty(parsedDesc[0]?.name)) {
          errByName = {
            ...errByName,
            [parsedDesc[0]?.name]: errByName[parsedDesc[0]?.name] + 1,
          };
        } else {
          errByName = {
            ...errByName,
            [parsedDesc[0]?.name]: 1,
          };
        }
        if (errByRole.hasOwnProperty(parsedDesc[0]?.role)) {
          errByRole = {
            ...errByRole,
            [parsedDesc[0]?.role]: errByRole[parsedDesc[0]?.role] + 1,
          };
        } else {
          errByRole = {
            ...errByRole,
            [parsedDesc[0]?.role]: 1,
          };
        }
      } catch (e) {
        console.log(errDescription, ":", e.message);
      }
    }
    setErrorByName(errByName);
    setErrorByRole(errByRole);
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
  if (!allReports || data?.results?.data?.length === 0) {
    return <p>No reports found.</p>;
  }
  return (
    <Container fluid className="overviewWrapper">
      {/* <div style={{ width: "100%", height: "650px", overflow: "hidden", borderRadius: "15px"}}>
        <iframe
          width="100%"
          height="700px"
          src="https://lookerstudio.google.com/embed/reporting/b490c4da-a572-4a38-b05d-e6ea18b46733/page/c5xTD"
          frameBorder="0"
          style={{ border: "0"}}
          allowFullScreen
        ></iframe>
      </div> */}
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
          <Analytics monthlyReports={monthlyReports} />
        </Col>
        <Col xs={12} md={8} className="p-2 p-md-4">
          <Chart reports={monthlyReports} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="p-2 p-md-4">
          <ReportsStats
            parsedData={errorByName}
            title={"Most Reports by Name"}
          />
        </Col>
        <Col xs={12} md={6} className="p-2 p-md-4">
          <ReportsStats
            parsedData={errorByRole}
            title={"Most Reports by Role"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Overview;
