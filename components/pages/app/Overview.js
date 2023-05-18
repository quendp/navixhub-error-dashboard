import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "./Card";
import Analytics from "./Analytics";
import Chart from "./Chart";
import ReportsStats from "./ReportsStats";
const Overview = () => {
  return (
    <Container fluid className="overviewWrapper">
      <Row>
        <Col xs={12} md={4} className="p-2 p-md-4">
          <Card
            count={1}
            startDate={"May 14, 2023"}
            endDate={"May 20, 2023"}
            description={"Errors this week"}
          />
        </Col>
        <Col xs={12} md={4} className="p-2 p-md-4">
          <Card
            count={4}
            startDate={"May 14, 2023"}
            endDate={"May 20, 2023"}
            description={"Errors this month"}
          />
        </Col>
        <Col xs={12} md={4} className="p-2 p-md-4">
          <Card
            count={197}
            startDate={"May 14, 2023"}
            endDate={"May 20, 2023"}
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
