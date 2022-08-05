import { useRef, useEffect, useCallback } from "react";
import Input from "../components/Input/Input";
import Container from "./../components/Container/Container";

export default function Home() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;

    console.log("ref:", el);
  }, []);

  const customStyles = {
    maxWidth: "344px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2rem auto",
    gap: "2rem",
  };

  return (
    <Container>
      <div style={customStyles}>
        <h2>Variant #1</h2>
        <Input
          type="text"
          id="test"
          label="Variant #1"
          placeholder="eg. Avenger"
          ref={ref}
        />
        <h2>Variant #2</h2>
        <Input
          type="email"
          id="test"
          label="Variant #2"
          placeholder="eg. Films"
          icon="left"
        />
        <h2>Variant #3</h2>
        <Input
          type="email"
          id="test"
          label="Variant #2"
          placeholder="eg. Films"
          icon="right"
        />
        <h2>Variant #4</h2>
        <Input
          type="email"
          id="test"
          label="Variant #2"
          placeholder="eg. Films"
          icon="both"
        />
      </div>
    </Container>
  );
}
