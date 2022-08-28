import React from "react";
import Container from "../Container/Container";
import Header from "../../components/Header/Header";
import Image from "next/image";

import backgroundImage from "./bg.png";

const Layout = ({ children }) => {
  return (
    <div className="page">
      {/*       <div className="background-image">
        <Image
          src={backgroundImage}
          alt="Background image"
          layout="fill"
          placeholder="blur"
          objectFit=""
        />
      </div> */}
      <Container>
        <Header />
        {children}
      </Container>
    </div>
  );
};

export default Layout;
