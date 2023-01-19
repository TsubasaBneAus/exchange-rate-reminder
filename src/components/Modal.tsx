import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../styles/Modal.module.css";

interface Props {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  modalType: string;
  getPreferences: () => void;
}

const Modal = (props: Props) => {
  const router = useRouter();
  const [modalText, setModalText] = useState({ p: "", button: "" });
  const [modalAction, setModalAction] = useState("");

  // Handle events after clicking the button
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.setModal(false);
    
    if (modalAction === "Go back to Home") {
      router.push("/");
    } else {
      props.getPreferences();
      router.push("/");
    }
  };

  useEffect(() => {
    switch (props.modalType) {
      case "Home":
        setModalText({
          p: "設定を変更しました。",
          button: "戻る",
        });
        setModalAction("Reload window");
        break;

      case "Currencies Unselected Error":
        setModalText({
          p: "通貨を設定してください",
          button: "戻る",
        });
        setModalAction("Go back to Home");
        break;

      case "Contact":
        setModalText({
          p: "お問い合わせのメールを送信しました。",
          button: "ホームに戻る",
        });
        setModalAction("Go back to Home");
        break;
    }
  }, [props.modalType]);

  if (props.modal) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>
          <p className={styles.sentence}>{modalText.p}</p>
          <button
            className={styles.button}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleClick(e)
            }
          >
            {modalText.button}
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
