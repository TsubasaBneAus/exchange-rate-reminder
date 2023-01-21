import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../styles/Modal.module.css";

interface Props {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  modalType: string;
  setModalType: Dispatch<SetStateAction<string>>; // なぜかprops.setModalTypeで呼び出すと使えない
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

      case "Go back Home":
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
          callbackUrl: "/",
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
          text: "設定を変更しました。",
          button1: "戻る",
          button2: null,
        });
        setModalAction({ button1: "Refetch the data", button2: null });
        break;

      case "Currencies Unselected Error":
        setModalText({
          text: "元となる通貨と換算後の通貨を設定してください",
          button1: "戻る",
          button2: null,
        });
        setModalAction({ button1: "Go back Home", button2: null });
        break;

      case "Contact":
        setModalText({
          text: "お問い合わせのメールを送信しました。",
          button1: "ホームに戻る",
          button2: null,
        });
        setModalAction({ button1: "Go back Home", button2: null });
        break;

      case "MyPage":
        setModalText({
          text: "本当に削除しますか？",
          button1: "はい",
          button2: "いいえ",
        });
        setModalAction({
          button1: "Remove an account",
          button2: "Cancel removing an account",
        });
        break;
    }

    if (modalType === "Account Removed") {
      setModalText({
        text: "アカウントは削除されました。",
        button1: "ホームに戻る",
        button2: null,
      });
      setModalAction({ button1: "Reload the window", button2: null });
    }
  }, [props.modalType, modalType]);

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
