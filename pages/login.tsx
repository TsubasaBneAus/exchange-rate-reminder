import { useState } from "react";
import styles from "../styles/login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className={styles.formContainer}>
      <h1 className={styles.title}>ログイン</h1>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">
          ログイン
        </button>
      </div>
    </form>
  );
};

export default Login;
