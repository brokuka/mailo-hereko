import React from "react";
import Radio from "../Inputs/Radio/Radio";
import Card from "./../Card/Card";
import { useMeasure } from "react-use";

/* Style */
import styles from "./Catalog.module.scss";

const Catalog = ({ data }) => {
  const [active, setActive] = React.useState("all");
  const [width, setWidth] = React.useState(null);
  const [height, setHeight] = React.useState("auto");
  const [top, setTop] = React.useState(null);
  const [left, setLeft] = React.useState(null);
  const firstInput = React.useRef();
  const [activeElement, setActiveElement] = React.useState(firstInput.current);
  const [blockRef, blockRefStyles] = useMeasure();

  const getRefPropValue = (el, prop) => {
    return getComputedStyle(el).getPropertyValue(prop);
  };

  React.useEffect(() => {
    onClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockRefStyles.width]);

  const onClick = (e = activeElement || firstInput.current) => {
    const style = getComputedStyle(e.offsetParent);

    setActive(e.value);
    setWidth(style.width);
    setHeight(style.height);
    setTop(e.offsetParent.offsetTop);
    setLeft(e.offsetParent.offsetLeft);
    setActiveElement(e);
  };

  const customStyles = {
    width,
    height,
    top,
    left,
  };

  return (
    <>
      <div className={styles.filter} ref={blockRef}>
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
        {data
          ? data.map(({ id, ...props }) => (
              <Card isWatched key={id} id={id} {...props} />
            ))
          : Array.from(Array(12), (_, i) => <Card noData key={i} />)}
      </div>
    </>
  );
};

export default Catalog;
