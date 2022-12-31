import { ChangeEvent, useState } from "react";
import styles from "../styles/login.module.css";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [message, setMessage] = useState([]);

  const login = async () => {
    const url = "http://localhost:3000/api/login";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    const data = await res.json();
    // setMessage(data.results);
    console.log(data);
  };

  return (
    <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
      <h1 className={styles.title}>ログイン</h1>
      <hr className={styles.bar} />
      <div className={styles.form}>
        <div className={styles.inputField}>
          <label className={styles.inputLabel}>メールアドレス</label>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            name="email"
            placeholder="example@gmail.com"
            value={formValues.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.inputLabel}>パスワード</label>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            name="password"
            placeholder="password"
            value={formValues.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className={styles.button} type="submit" onClick={login}>
          ログイン
        </button>
      </div>
    </form>
  );
};

export default Login;
