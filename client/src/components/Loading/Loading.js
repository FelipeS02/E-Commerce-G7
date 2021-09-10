import React from "react";
import { Container, Row, Image } from "react-bootstrap";
import loadingGif from "./spinner.gif";
const Loading = () => {
  return (
    <Container>
      <Row className="mx-auto my-auto" style={{ width: "10rem" }}>
        <Image src={loadingGif} fluid />
      </Row>
    </Container>
  );
};

export default Loading;
