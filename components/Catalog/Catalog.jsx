import React from "react";
import Radio from "../Inputs/Radio/Radio";
import Card from "./../Card/Card";

/* Style */
import styles from "./Catalog.module.scss";

const Catalog = ({ data }) => {
  console.log(data);
  const [active, setActive] = React.useState("all");
  const [width, setWidth] = React.useState(null);
  const [height, setHeight] = React.useState(null);
  const [top, setTop] = React.useState(null);
  const [left, setLeft] = React.useState(null);
  const firstInput = React.useRef();

  React.useEffect(() => {
    onClick(firstInput.current);
  }, []);

  const onClick = (e) => {
    const style = getComputedStyle(e.offsetParent);

    setActive(e.value);
    setWidth(style.width);
    setHeight(style.height);
    setTop(e.offsetParent.offsetTop);
    setLeft(e.offsetParent.offsetLeft);
  };

  const customStyles = {
    width,
    height,
    top,
    left,
  };

  return (
    <>
      <div className={styles.filter}>
        <Radio
          Ref={firstInput}
          value="all"
          onChange={onClick}
          state={active}
          label="All"
        />
        <Radio value="movie" onChange={onClick} state={active} label="Movies" />
        <Radio value="tv" onChange={onClick} state={active} label="TV Shows" />

        {active && (
          <span style={active && customStyles} className={styles.indicator} />
        )}
      </div>

      <div className={styles.root}>
        {data.map(({ id, ...props }) => (
          <Card isWatched key={id} id={id} {...props} />
        ))}
      </div>
    </>
  );
};

export default Catalog;
