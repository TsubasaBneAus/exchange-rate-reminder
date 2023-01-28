import { GetServerSideProps } from "next";
import { signOut } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/Modal.module.css";

interface Props {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  modalType: string;
  getPreferences?: () => void;
}

interface ModalText {
  text: string;
  button1: string;
  button2: string | null;
}

interface ModalAction {
  button1: string;
  button2: string | null;
}

const Modal = (props: Props) => {
  const { t, i18n } = useTranslation("");
  const router = useRouter();
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalText, setModalText] = useState<ModalText>({
    text: "",
    button1: "",
    button2: "",
  });
  const [modalAction, setModalAction] = useState<ModalAction>({
    button1: "",
    button2: "",
  });

  // Handle the click event for the button 1
  const handleClick1 = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // Change button actions for each modal
    switch (modalAction.button1) {
      case "Refetch the data":
        props.setModal(false);
        props.getPreferences?.();
        router.push("/");
        break;

      case "Back to Home":
        props.setModal(false);
        router.push("/");
        break;

      case "Remove an account":
        await fetch("/api/deleteAccount");
        setModalType("Account Removed");
        break;

      case "Reload the window":
        props.setModal(false);
        signOut({
          callbackUrl: `/${i18n.language}`,
        });
        break;
    }
  };

  // Handle the click event for the button 2
  const handleClick2 = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.setModal(false);
  };

  // Display another button
  const showAnotherButton = () => {
    if (modalAction.button2 !== null) {
      return (
        <button
          className={styles.button}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleClick2(e)
          }
        >
          {modalText.button2}
        </button>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    switch (props.modalType) {
      case "Home":
        setModalText({
          text: t("Modal.Text1"),
          button1: t("Modal.Button1"),
          button2: null,
        });
        setModalAction({ button1: "Refetch the data", button2: null });
        break;

      case "Currencies Unselected Error":
        setModalText({
          text: t("Modal.Text2"),
          button1: t("Modal.Button1"),
          button2: null,
        });
        setModalAction({ button1: "Back to Home", button2: null });
        break;

      case "Contact":
        setModalText({
          text: t("Modal.Text3"),
          button1: t("Modal.Button2"),
          button2: null,
        });
        setModalAction({ button1: "Back to Home", button2: null });
        break;

      case "MyPage":
        setModalText({
          text: t("Modal.Text4"),
          button1: t("Modal.Button3"),
          button2: t("Modal.Button4"),
        });
        setModalAction({
          button1: "Remove an account",
          button2: "Cancel removing an account",
        });
        break;
    }

    if (modalType === "Account Removed") {
      setModalText({
        text: t("Modal.Text5"),
        button1: t("Modal.Button2"),
        button2: null,
      });
      setModalAction({ button1: "Reload the window", button2: null });
    }
  }, [props.modalType, modalType, t]);

  if (props.modal) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>
          <p className={styles.sentence}>{modalText.text}</p>
          <button
            className={styles.button}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleClick1(e)
            }
          >
            {modalText.button1}
          </button>
          {showAnotherButton()}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
