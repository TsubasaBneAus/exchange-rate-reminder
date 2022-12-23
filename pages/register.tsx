import { ChangeEvent, useState } from "react";
import styles from "../styles/register.module.css";

const Register = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password1: "",
    password2: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const register = () => {
    
  }

  return (
    <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
      <h1 className={styles.title}>アカウント登録</h1>
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
            name="password1"
            placeholder="password"
            value={formValues.password1}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.inputLabel}>パスワード再入力</label>
          <input
            className={styles.input}
            type="text"
            name="password2"
            placeholder="password"
            value={formValues.password2}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className={styles.button} type="submit" onClick={register}>
          登録
        </button>
      </div>
    </form>
  );
};

export default Register;
