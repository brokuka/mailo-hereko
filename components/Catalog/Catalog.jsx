import React from "react";
import Radio from "../Inputs/Radio/Radio";
import Card from "./../Card/Card";
import { useMeasure } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import {
  watchedData,
  filterData,
  filteredData,
} from "../../store/watched/watchedSlice";

/* Style */
import styles from "./Catalog.module.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Catalog = () => {
  const [active, setActive] = React.useState("all");
  const [width, setWidth] = React.useState(null);
  const [height, setHeight] = React.useState("auto");
  const [top, setTop] = React.useState(null);
  const [left, setLeft] = React.useState(null);
  const firstInput = React.useRef();
  const [activeElement, setActiveElement] = React.useState(firstInput.current);
  const [blockRef, blockRefStyles] = useMeasure();
  const nodeRef = React.useRef();

  const dispatch = useDispatch();
  const data = useSelector(watchedData);
  const filtered = useSelector(filteredData);

  const getRefPropValue = (el, prop) => {
    return getComputedStyle(el).getPropertyValue(prop);
  };

  React.useEffect(() => {
    onClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockRefStyles.width]);

  React.useEffect(() => {
    if (active !== "all") dispatch(filterData(active));
  }, [active, dispatch]);

  /*   React.useEffect(() => {
    if (active === "all") {
      setFilter(data);
    } else {
      setFilter(data.filter((item) => item.media_type === active));
    }
  }, [data, active]); */

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

  const renderCards = () => {
    if (data && active === "all") {
      return data.map(({ id, ...props }) => (
        <CSSTransition
          in={active}
          timeout={300}
          key={id}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enter_active,
            exit: styles.exit,
            exitActive: styles.exit_active,
          }}
          mountOnEnter
          unmountOnExit
        >
          <Card isWatched key={id} id={id} {...props} />
        </CSSTransition>
      ));
    }

    if (data && filtered.length) {
      return filtered.map(({ id, ...props }) => (
        <CSSTransition
          in={active}
          timeout={300}
          //   unmountOnExit
          //   mountOnEnter
          key={id}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enter_active,
            exit: styles.exit,
            exitActive: styles.exit_active,
          }}
        >
          <Card isWatched key={id} id={id} {...props} />
        </CSSTransition>
      ));
    }

    if (!data) {
      return Array.from(Array(12), (_, i) => <Card noData key={i} />);
    }
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

      {/* <div className={styles.root}> */}
      {/*         {filtered
          ? filtered.map(({ id, ...props }) => (
              <Card isWatched key={id} id={id} {...props} />
            ))
          : Array.from(Array(12), (_, i) => <Card noData key={i} />)} */}
      {/*         {data
          ? filtered.length
            ? filtered.map(({ id, ...props }) => (
                <Card isWatched key={id} id={id} {...props} />
              ))
            : data.map(({ id, ...props }) => (
                <Card isWatched key={id} id={id} {...props} />
              ))
          : Array.from(Array(12), (_, i) => <Card noData key={i} />)} */}

      <TransitionGroup className={styles.root}>{renderCards()}</TransitionGroup>
      {/* </div> */}
    </>
  );
};

export default React.memo(Catalog);
