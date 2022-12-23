import { useState } from "react";
import styles from "../styles/login.module.css";

const Login = () => {
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("password");

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>ログイン</h1>
      <hr className={styles.bar} />
      <div className={styles.inputField}>
        <label>メールアドレス</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputField}>
        <label>パスワード</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">ログイン</button>
    </form>
  );
};

export default Login;
