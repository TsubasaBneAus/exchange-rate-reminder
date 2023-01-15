import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import styles from "../styles/Modal.module.css";

interface Props {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = (props: Props) => {
  const router = useRouter();

  // Handle events after clicking the button
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.setModal(false);
    router.push('/');
  };

  if (props.modal) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>
          <p className={styles.sentence}>
            お問い合わせのメールを送信しました。
          </p>
          <button
            className={styles.button}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleClick(e)
            }
          >
            ホームに戻る
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
