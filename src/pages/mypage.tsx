import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import styles from "../styles/MyPage.module.css";

const MyPage = () => {
  const { t } = useTranslation("");
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
    setModalType("MyPage");
    setModal(true);
  };

  // Check if users have already signed up or logged in
  if (session) {
    return (
      <div className={styles.formContainer}>
        <h1 className={styles.title}>{t("MyPage.Title")}</h1>
        <button className={styles.button} onClick={() => handleChange()}>
          {t("MyPage.Button")}
        </button>
        <Modal modal={modal} setModal={setModal} modalType={modalType} />
      </div>
    );
  } else {
    return <div className={styles.redirect} />;
  }
};

export default MyPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
