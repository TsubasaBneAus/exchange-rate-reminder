import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Selectbox from "../components/Selectbox";
import Modal from "../components/Modal";
import currencies from "../lib/currencies";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation("");
  const { data: session } = useSession();
  const [initialBase, setInitialBase] = useState<string | null>(null);
  const [initialConverted, setInitialConverted] = useState<string | null>(null);
  const [exchangeRate, setExchangeRate] = useState("");
  const [fetchedDatetime, setFetchedDatetime] = useState<string | null>(null);
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

    // Display the current exchange rate and fetched date and time
    // if users have already set preference of the currencies
    if (result.base !== null && result.converted !== null) {
      setExchangeRate(result.exchangeRate);
      setFetchedDatetime(result.fetchedDatetime);
    }
  };

  useEffect(() => {
    getPreferences();
  }, []);

  // Load the current user preferences of currencies
  const showExchangeRate = () => {
    // Check if users have already set the currency for the exchange rate
    if (initialBase === null || initialConverted === null) {
      return <h1 className={styles.title}>{t("Home.Title1")}</h1>;
    } else {
      return (
        <div className={styles.container3}>
          <h1 className={styles.title}>{t("Home.Title2")}</h1>
          <div className={styles.container4}>
            <div className={styles.container5}>
              <p className={styles.content1}>
                {initialBase} &#8594; {initialConverted}
              </p>
              <div className={styles.container6}>
                <p className={styles.content2}>{exchangeRate}</p>
                <p className={styles.content3}>
                  ({initialConverted} / {initialBase})
                </p>
              </div>
            </div>
            <p className={styles.content4}>{t("Home.Datetime")}: {fetchedDatetime}</p>
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
          language: i18n.language,
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
          {showExchangeRate()}
          <form
            className={styles.form}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              handleSubmit(e);
              setModal(true);
            }}
          >
            <label className={styles.label}>{t("Home.Label1")}</label>
            <Selectbox setCurrency={setBase} />
            <label className={styles.label}>{t("Home.Label2")}</label>
            <Selectbox setCurrency={setConverted} />
            <button className={styles.button} type="submit">
              {t("Home.Button")}
            </button>
          </form>
          <p className={styles.description1}>{t("Home.Description3")}</p>
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
      <div className={styles.container7}>
        <h1 className={styles.description2} suppressHydrationWarning>
          {t("Home.Description1")}
        </h1>
        <h1 className={styles.description2} suppressHydrationWarning>
          {t("Home.Description2")}
        </h1>
      </div>
    );
  }
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
