import { useRef, useEffect, useCallback } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Container from "./../components/Container/Container";

export default function Home() {
  const ref = useRef();

  return (
    <Container>
      <h2>Variant #1</h2>
      <Button>Search</Button>
      <h2>Variant #2</h2>
      <Button icon="left">Search</Button>
      <h2>Variant #3</h2>
      <Button icon="right">Search</Button>
      <h2>Variant #4</h2>
      <Button icon="both">Search</Button>
    </Container>
  );
}
