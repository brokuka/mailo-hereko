import { useRef, useEffect, useCallback } from "react";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import Row from "../components/Row/Row";
import Spinner from "../components/Spinner/Spinner";
import Container from "./../components/Container/Container";

export default function Home() {
  const ref = useRef();

  return (
    <Container>
      <h2>Autorised</h2>
      <Card />
      <h2>Non authorised</h2>
      <Card isSuggesting />
      <h2>Watched list</h2>
      <Card isWatched />
      <h2>Spinner variants</h2>
      <Row display="inline-flex">
        <Spinner variant="primary" placeholder={false} size="45px" />
        <Spinner variant="secondary" />
        <Spinner variant="warning" />
        <Spinner variant="error" />
        <Spinner variant="white" placeholder={false} />
        <Spinner variant="black" />
        <Spinner variant="tertary" placeholder={false} />
        <Spinner variant="grey" placeholder={false} />
        <Spinner variant="success" placeholder={false} size="60px" />
      </Row>
    </Container>
  );
}
