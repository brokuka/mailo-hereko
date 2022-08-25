import React from "react";
import Input from "../../components/Inputs/Input/Input";

const index = () => {
  return (
    <div style={{ height: "300px" }}>
      <Input
        icon="search"
        placeholder="eg. Capitan Marvel"
        label="Search Movies or TV Shows"
        //   iconPos="right"
      />
    </div>
  );
};

export default index;
