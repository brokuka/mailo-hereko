import React from "react";
import Radio from "../Inputs/Radio/Radio";
import { useSelector } from "react-redux";
import { useMeasure } from "react-use";
import { filterType } from "./../../store/filter/filter.selector";

/* Style */
import styles from "./Filter.module.scss";

const Filter = () => {
  const [width, setWidth] = React.useState(null);
  const [height, setHeight] = React.useState("auto");
  const [top, setTop] = React.useState(null);
  const [left, setLeft] = React.useState(null);
  const [blockRef, blockRefStyles] = useMeasure();
  const type = useSelector(filterType);

  React.useEffect(() => {
    const el = document.querySelector(`[value=${type}]`);
    const elParent = el.parentElement;
    const elStyle = getComputedStyle(elParent);

    setWidth(elStyle.width);
    setHeight(elStyle.height);
    setTop(elParent.offsetTop);
    setLeft(elParent.offsetLeft);
  }, [type, blockRefStyles]);

  const customStyles = {
    width,
    height,
    top,
    left,
  };

  return (
    <div className={styles.root} ref={blockRef}>
      <Radio value="all" label="All" filter />
      <Radio value="movie" label="Movies" filter />
      <Radio value="tv" label="TV Shows" filter />

      {type && (
        <span style={type && customStyles} className={styles.indicator} />
      )}
    </div>
  );
};

export default React.memo(Filter);
