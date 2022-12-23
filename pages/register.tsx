import { useState } from "react";
import styles from "../styles/register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <form className={styles.formContainer}>
      <h1 className={styles.title}>アカウント登録</h1>
      <hr className={styles.bar} />
      <div className={styles.form}>
        <div className={styles.inputField}>
          <label className={styles.inputLabel}>メールアドレス</label>
          <input
            className={styles.input}
            type="text"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.inputLabel}>パスワード</label>
          <input
            className={styles.input}
            type="text"
            placeholder="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.inputLabel}>パスワード再入力</label>
          <input
            className={styles.input}
            type="text"
            placeholder="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">
          登録
        </button>
      </div>
    </form>
  );
};

export default Register;
