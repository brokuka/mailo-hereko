import React from "react";
import Radio from "../Inputs/Radio/Radio";
import { useDispatch, useSelector } from "react-redux";

/* Style */
import styles from "./Filter.module.scss";
import { useMeasure } from "react-use";
import { filterType } from "./../../store/filter/filter.selector";
import { setFilterType } from "../../store/filter/filterSlice";

const Filter = () => {
  const [active, setActive] = React.useState("all");
  const [width, setWidth] = React.useState(null);
  const [height, setHeight] = React.useState("auto");
  const [top, setTop] = React.useState(null);
  const [left, setLeft] = React.useState(null);
  const firstInput = React.useRef();
  const [activeElement, setActiveElement] = React.useState(firstInput.current);
  const [blockRef, blockRefStyles] = useMeasure();
  const dispatch = useDispatch();

  const type = useSelector(filterType);

  const onClick = (e = activeElement || firstInput.current) => {
    const style = getComputedStyle(e.offsetParent);

    setActive(e.value);
    setWidth(style.width);
    setHeight(style.height);
    setTop(e.offsetParent.offsetTop);
    setLeft(e.offsetParent.offsetLeft);
    setActiveElement(e);
    dispatch(setFilterType(e.value));
  };

  React.useEffect(() => {
    onClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockRefStyles.width]);

  const customStyles = {
    width,
    height,
    top,
    left,
  };

  return (
    <div className={styles.root} ref={blockRef}>
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
  );
};

export default Filter;
