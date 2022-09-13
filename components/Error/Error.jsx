import { useSelector } from "react-redux";
import { useMedia } from "react-use";
import Link from "next/link";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/router";
import { filterType } from "@store/filter/filter.selector";
import { selectFilteredTypeLabels } from "@store/filter/filter.selector";
import Button from "@component/Button/Button";
import Title from "@component/Title/Title";
import Icon from "@component/Icon/Icon";
import ModalSuggest from "@component/Modals/ModalSuggest";

/* Style */
import styles from "./Error.module.scss";

const Error = ({ type = "notFound" }) => {
  const filter = useSelector(filterType);
  const isTablet = useMedia("(max-width: 767.99px)", null);
  const labels = useSelector(selectFilteredTypeLabels);
  const { pathname } = useRouter();
  const [modal, setModal] = React.useState(false);
  const nodeRef = React.useState(null);
  console.log(pathname);

  const checkType = () => {
    switch (type) {
      case "notFound":
        return (
          <>
            {!isTablet && <Icon icon="404" width={400} height={320} />}

            <Title type="h1" name="Lost your way?">
              {
                "Oops! This is awkward. You are looking for something that doesn't actually exist."
              }
            </Title>

            <Link href="/">
              <a>
                <Button>Go Home</Button>
              </a>
            </Link>
          </>
        );
      case "search":
        return (
          <>
            <Title type="h2" name="Sorry, No results found">
              {!pathname.includes("suggest") &&
              !pathname.includes("[media_type]") &&
              !pathname.includes("suggestions") ? (
                <>
                  There are no{" "}
                  {filter !== "all" &&
                    labels.map(
                      (label, index) =>
                        label.toLowerCase().includes(filter) && (
                          <span className={styles.highlighted} key={index}>
                            {label}
                          </span>
                        )
                    )}{" "}
                  matching your search terms. You can suggest me manually
                </>
              ) : !pathname.includes("suggestions") ? (
                "There are no matching your search terms. You can suggest me manually"
              ) : null}
            </Title>
            {/* /suggestions */}
            {!pathname.includes("suggestions") && (
              <Button onClick={() => setModal(true)}>Suggest Manually</Button>
            )}
          </>
        );
    }
  };

  return (
    <>
      <div className={styles.root}>{checkType()}</div>

      <CSSTransition
        in={modal}
        timeout={300}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enter_active,
          exit: styles.exit,
          exitActive: styles.exit_active,
        }}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <ModalSuggest nodeRef={nodeRef} state={modal} setState={setModal} />
      </CSSTransition>
    </>
  );
};

export default Error;
