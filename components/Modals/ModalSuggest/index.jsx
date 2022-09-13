import React from "react";
import Modal from "@component/Modals/ModalLayout";
import Input from "@component/Inputs/Input/Input";
import Button from "@component/Button/Button";
import { usePostManualMutation } from "@store/suggestions/suggestions.api";

/* Style */
import styles from "./index.module.scss";

const Index = ({ state, setState, nodeRef }) => {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState();
  const [trigger] = usePostManualMutation();
  const [modal, setModal] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await trigger({ title, link })
      .unwrap()
      .then(() => setModal(true))
      .catch(({ data }) => setError(data.message))
      .finally(() => setLoading(false));
  };

  const firstModal = () => {
    return (
      <Modal
        state={state}
        setState={setState}
        ref={nodeRef}
        title="Suggest something to watch"
      >
        {error && <span className={styles.error}>{error}</span>}
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.group}>
            <Input
              label="Title"
              icon="videoPlay"
              store={false}
              onChange={setTitle}
              value={title}
            />
            <Input
              label="Link (if available)"
              icon="link"
              store={false}
              onChange={setLink}
              value={link}
            />
          </div>
          <Button
            className={styles.button}
            type="submit"
            spinner
            spinnerVariant="white"
            spinnerJustifyContent="center"
            asyncData={loading}
          >
            Suggest
          </Button>
        </form>
      </Modal>
    );
  };

  const secondModal = () => {
    return (
      <Modal
        state={state}
        setState={setState}
        ref={nodeRef}
        icon="thankYou"
        iconSize={120}
        title="Thank you for your suggestion"
        text="Your suggestion has been succesfully added to my watchlist, I will manage sometime to watch your suggestion. ❤"
      />
    );
  };

  return (
    <>
      {!modal && firstModal()}
      {modal && secondModal()}
    </>
  );
};

export default Index;
