import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import styles from "../styles/MyPage.module.css";

const MyPage = () => {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    // Redirect to sign in page if users have not signed in or logged in yet
    if (!session) {
      signIn("google", { callbackUrl: "/" });
    }
  }, [session]);

  const handleChange = () => {
    setModalType("MyPage")
    setModal(true);
  };

  // Check if users have already signed up or logged in
  if (session) {
    return (
      <div className={styles.formContainer}>
        <h1 className={styles.title}>マイページ</h1>
        <button className={styles.button} onClick={() => handleChange()}>
          アカウントを削除する
        </button>
        <Modal modal={modal} setModal={setModal} modalType={modalType} />
      </div>
    );
  } else {
    return <div className={styles.redirect} />;
  }
};

export default MyPage;
