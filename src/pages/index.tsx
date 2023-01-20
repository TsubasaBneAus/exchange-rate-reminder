import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Selectbox from "../components/Selectbox";
import Modal from "../components/Modal";
import currencies from "../lib/currencies";

const Home = () => {
  const { data: session } = useSession();
  const [initialBase, setInitialBase] = useState<string | null>(null);
  const [initialConverted, setInitialConverted] = useState<string | null>(null);
  const [exchangeRate, setExchangeRate] = useState("");
  const [base, setBase] = useState<string | null>(null);
  const [converted, setConverted] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // Get user preferences of currencies used for the exchange rate
  const getPreferences = async () => {
    const response = await fetch("/api/getPreferences");
    const result = await response.json();
    currencies.map((each) => {
      if (result.base === each.value) {
        setInitialBase(each.name);
      }
      if (result.converted === each.value) {
        setInitialConverted(each.name);
      }
    });

    // Display the current exchange rate if users have already set preference of the currencies
    if (result.base !== null && result.converted !== null) {
      setExchangeRate(result.exchangeRate);
    }
  };

  useEffect(() => {
    getPreferences();
  }, []);

  // Load the current user preferences of currencies
  const showExchangeRate = () => {
    // Check if users have already set the currency for the exchange rate
    if (initialBase === null || initialConverted === null) {
      return <h1 className={styles.title}>通貨を設定してください</h1>;
    } else {
      return (
        <div className={styles.topContainer}>
          <h1 className={styles.title}>現在の為替レート</h1>
          <div className={styles.contentsContainer}>
            <p className={styles.content1}>
              {initialBase} &#8594; {initialConverted}
            </p>
            <div className={styles.rateContainer}>
              <p className={styles.content2}>{exchangeRate}</p>
              <p className={styles.content3}>
                ({initialConverted} / {initialBase})
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if currencies used for the exchange rate are registered to the database
    if (base !== null && converted !== null) {
      await fetch("/api/updatePreferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base: base,
          converted: converted,
        }),
      });
      setModalType("Home");
    } else {
      setModalType("Currencies Unselected Error");
    }
  };

  // Check if users have already signed up or logged in
  if (session) {
    return (
      <div className={styles.container1}>
        <div className={styles.container2}>
          <div className={styles.container3}>{showExchangeRate()}</div>
          <form
            className={styles.form}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              handleSubmit(e);
              setModal(true);
            }}
          >
            <label className={styles.label}>元となる通貨</label>
            <Selectbox setCurrency={setBase} />
            <label className={styles.label}>換算後の通貨</label>
            <Selectbox setCurrency={setConverted} />
            <button className={styles.button} type="submit">
              設定を保存
            </button>
          </form>
        </div>
        <Modal
          modal={modal}
          setModal={setModal}
          modalType={modalType}
          getPreferences={getPreferences}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.container4}>
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
