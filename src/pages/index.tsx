import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Selectbox from "../components/Selectbox";

const Home = () => {
  const { data: session } = useSession();
  const [baseCurrency, setBaseCurrency] = useState("");
  const [convertedCurrency, setConvertedCurrency] = useState("");

  const showExchangeRate = () => {
    if (baseCurrency === null || convertedCurrency === null) {
      return <p className={styles.p}>通貨を設定してください</p>;
    } else {
      return <p className={styles.p}>現在の為替レート</p>;
    }
  };

  // Check if users have already logged in
  if (session) {
    return (
      <div className={styles.container1}>
        <div className={styles.container3}>{showExchangeRate()}</div>
        <form className={styles.form}>
          <label className={styles.label}>元となる通貨</label>
          <Selectbox currency={baseCurrency} setCurrency={setBaseCurrency} />
          <label className={styles.label}>換算後の通貨</label>
          <Selectbox
            currency={convertedCurrency}
            setCurrency={setConvertedCurrency}
          />
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.container2}>
        <h1 className={styles.explanation}>
          為替レートをメールでお知らせするアプリケーションです。
        </h1>
        <h1 className={styles.explanation}>
          海外送金するタイミングやFXのために為替チャートを逐一確認するのが面倒な方へ！
        </h1>
      </div>
    );
  }
};

export default Home;
