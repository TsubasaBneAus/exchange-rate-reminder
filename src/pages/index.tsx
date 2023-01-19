import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Selectbox from "../components/Selectbox";
import Modal from "../components/Modal";

const Home = () => {
  const { data: session } = useSession();
  const [initialBaseCurrency, setInitialBaseCurrency] = useState("");
  const [initialConvertedCurrency, setInitialConvertedCurrency] = useState("");
  const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
  const [convertedCurrency, setConvertedCurrency] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // Get user preferences of currencies used for the exchange rate
  const getPreferences = async () => {
    const response = await fetch("/api/getPreferences");
    const result = await response.json();
    setInitialBaseCurrency(result.baseCurrency);
    setInitialConvertedCurrency(result.convertedCurrency);
  };

  useEffect(() => {
    getPreferences();
  }, []);

  // Load the current user preferences of currencies
  const showExchangeRate = () => {
    // Check if users have already set the currency for the exchange rate
    if (initialBaseCurrency === null || initialConvertedCurrency === null) {
      return <h1 className={styles.title}>通貨を設定してください</h1>;
    } else {
      return (
        <div>
          <h1 className={styles.title}>現在の為替レート</h1>
          <p className={styles.contents}>
            Base Currency: {initialBaseCurrency}
          </p>
          <p className={styles.contents}>
            Converted Currency: {initialConvertedCurrency}
          </p>
        </div>
      );
    }
  };

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if currencies used for the exchange rate are registered to the database
    if (baseCurrency !== null && convertedCurrency !== null) {
      await fetch("/api/updatePreferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baseCurrency: baseCurrency,
          convertedCurrency: convertedCurrency,
        }),
      });
      setModalType("Home");
    } else {
      setModalType("Currencies Unselected Error");
    }
  };

  // Check if users have already logged in
  if (session) {
    return (
      <div className={styles.container1}>
        <div className={styles.container3}>{showExchangeRate()}</div>
        <form
          className={styles.form}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            handleSubmit(e);
            setModal(true);
          }}
        >
          <label className={styles.label}>元となる通貨 {baseCurrency}</label>
          <Selectbox setCurrency={setBaseCurrency} />
          <label className={styles.label}>
            換算後の通貨 {convertedCurrency}
          </label>
          <Selectbox setCurrency={setConvertedCurrency} />
          <button className={styles.button} type="submit">
            設定を保存
          </button>
        </form>
        <Modal modal={modal} setModal={setModal} modalType={modalType} />
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