import Sidebar from "@/components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/_globals.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function App({ Component, pageProps }) {
  return (
    <Container fluid className="m-0 p-0">
      <Row className="m-0 p-0 ">
        <Col
          xs={12}
          lg={2}
          className="sidebarWrapper d-flex justify-content-center align-items-center p-2 pt-5 p-md-5 p-lg-0"
        >
          <Sidebar />
        </Col>
        <Col className="p-2 p-md-5">
          <Component {...pageProps} />
        </Col>
      </Row>
    </Container>
  );
}
