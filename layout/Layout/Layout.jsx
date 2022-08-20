import React from "react";
import Container from "../Container/Container";
import Header from "../../components/Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="page">
      <Container>
        <Header />
        {children}
      </Container>
    </div>
  );
};

export default Layout;
