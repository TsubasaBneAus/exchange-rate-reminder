import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Modal from "../components/Modal";
import styles from "../styles/MyPage.module.css";

const MyPage = () => {
  const { t } = useTranslation("");
  const { data: session } = useSession();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    // Redirect to sign in page if a user have not signed in or logged in yet
    if (!session) {
      signIn("google", { callbackUrl: "/" });
    }
  }, [session]);

  // Handle the onclick event for deletion of a user account
  const handleClick1 = () => {
    setModalType("MyPage");
    setModal(true);
  };

  // Handle the onclick event for going back to home
  const handleClick2 = () => {
    router.push("/");
  };

  // Check if a user has already signed up or logged in
  if (session) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{t("MyPage.Title")}</h1>
        <div className={styles.buttonContainer}>
          <button className={styles.button1} onClick={handleClick1}>
            {t("MyPage.Button1")}
          </button>
          <button className={styles.button2} onClick={handleClick2}>
            {t("MyPage.Button2")}
          </button>
        </div>
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
