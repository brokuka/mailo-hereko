import { useRef, useEffect, useCallback } from "react";
import Input from "../components/Input/Input";
import Container from "./../layout/Container/Container";
import axios from "axios";

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
        <Input label="Search Movies or TV Shows" placeholder="eg. Films" />
        <h2>Variant #2</h2>
        <Input
          label="Search Movies or TV Shows"
          placeholder="eg. Films"
          icon="search"
        />
        <h2>Variant #3</h2>
        <Input
          label="Search Movies or TV Shows"
          placeholder="eg. Films"
          icon="search"
          iconPos="right"
        />
        <h2>Variant #4</h2>
        <Input
          label="Search Movies or TV Shows"
          placeholder="eg. Films"
          icon="search"
          iconPos="both"
        />
        {/*         <h2>Search Movies or TV Shows</h2>
        <Input
          type="email"
          id="test"
          label="Search Movies or TV Shows"
          placeholder="eg. Films"
          icon="right"
        />
        <h2>Search Movies or TV Shows</h2>
        <Input
          type="email"
          id="test"
          label="Search Movies or TV Shows"
          placeholder="eg. Films"
          icon="both"
        /> */}
      </div>
    </Container>
  );
}

export const getStaticProps = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/watched`);

  return {
    props: {
      data: data.results,
    },
  };
};
