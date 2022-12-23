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

  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const res = await fetch("/login");
      console.log(res);
      const json = await res.json();
      console.log(json);
      await setMessage(json.message);
    } catch(err){
      console.log(err);
    }
  };

  // const login = () => {
  //   fetch("/login")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // };

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
            name="email"
            placeholder="example@gmail.com"
            value={formValues.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.inputLabel}>パスワード:{message}</label>
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
