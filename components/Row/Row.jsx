import React from "react";

const Row = ({
  display = "flex",
  aligItems,
  justifyContent,
  flexDirection = "row",
  gap,
  flexWrap = "wrap",
  children,
}) => {
  const checkFlexDisplay = display === "flex" || display === "inline-flex";
  const checkFlexWrap =
    flexWrap === "wrap" || flexWrap === "nowrap" || flexWrap === "wrap-reverse";
  const checkFlexDirection =
    flexDirection === "row" || flexDirection === "column";

  if (!checkFlexDisplay)
    return console.error("Invalid display type for <Row/> component");
  if (!checkFlexWrap)
    return console.error("Invalid flexWrap type for <Row/> component");
  if (!checkFlexDirection)
    return console.error("Invalid flexDirection type for <Row/> component");

  const customStyles = {
    display,
    flexDirection,
    aligItems,
    justifyContent,
    gap,
    flexWrap,
  };

  return <div style={customStyles}>{children}</div>;
};

export default Row;
