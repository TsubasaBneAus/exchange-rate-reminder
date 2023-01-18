import React, { useState } from "react";
import Modal from "../components/Modal";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [modal, setModal] = useState(false);

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
    <div>
      <form
        className={styles.formContainer}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
          setModal(true);
        }}
      >
        <h1 className={styles.title}>お問い合わせ</h1>
        <hr className={styles.bar} />
        <div className={styles.form}>
          <div className={styles.inputField}>
            <label className={styles.inputLabel}>お名前</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Your Name"
              value={formValues.name}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.inputLabel}>メールアドレス</label>
            <input
              className={styles.input}
              type="text"
              name="email"
              placeholder="example@gmail.com"
              value={formValues.email}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.inputLabel}>メッセージ</label>
            <textarea
              className={styles.input}
              name="message"
              placeholder="Enter your message"
              value={formValues.message}
              rows={10}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange(e)
              }
              required
            />
          </div>
          <button className={styles.button} type="submit">
            送信
          </button>
        </div>
      </form>
      <Modal modal={modal} setModal={setModal} modalType="Contact" />
    </div>
  );
};

export default Contact;
