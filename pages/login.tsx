import { useState } from "react";
import styles from "../styles/login.module.css";

const login = () => {
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("");

  return (
    <form className={styles.form}>
      <h1>ログイン</h1>
      <hr />
      <div>
        <label>メールアドレス</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
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

export default login;
