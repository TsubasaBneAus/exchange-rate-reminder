import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const { t } = useTranslation("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // Handle user inputs of the form
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
  };

  return (
    <>
      <form
        className={styles.formContainer}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
          setModalType("Contact");
          setModal(true);
        }}
      >
        <h1 className={styles.title}>{t("Contact.Title")}</h1>
        <hr className={styles.bar} />
        <div className={styles.form}>
          <div className={styles.inputField}>
            <label className={styles.inputLabel}>{t("Contact.Label1")}</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder={t("Contact.Placeholder1")!}
              value={formValues.name}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.inputLabel}>{t("Contact.Label2")}</label>
            <input
              className={styles.input}
              type="text"
              name="email"
              placeholder={t("Contact.Placeholder2")!}
              value={formValues.email}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.inputLabel}>{t("Contact.Label3")}</label>
            <textarea
              className={styles.input}
              name="message"
              placeholder={t("Contact.Placeholder3")!}
              value={formValues.message}
              rows={10}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange(e)
              }
              required
            />
          </div>
          <button className={styles.button} type="submit">
            {t("Contact.Button")}
          </button>
        </div>
      </form>
      <Modal modal={modal} setModal={setModal} modalType={modalType} />
    </>
  );
};

export default Contact;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
