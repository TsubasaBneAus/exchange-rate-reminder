import { ChangeEvent, useEffect, useState } from "react";
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
    const res = await fetch("http://localhost:3000/api/getData");
    const data = await res.json();
    console.log(data.results);
    setMessage(data.results);
    // console.log(message[0].id);
    console.log(message[0]);
  };

  return (
    <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
      <h1 className={styles.title}>ログイン</h1>
      {/* {message[0].id}
      {message[0].email}
      {message[0].password} */}
      {/* <h1>{message[0].id}</h1> */}
      <hr className={styles.bar} />
      <div className={styles.form}>
        <div className={styles.inputField}>
          <label className={styles.inputLabel}>メールアドレス</label>
          <input
            className={styles.input}
            type="text"
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
