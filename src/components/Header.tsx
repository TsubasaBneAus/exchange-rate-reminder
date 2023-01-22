import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
// import Select, { SingleValue } from "react-select";
import styles from "../styles/Header.module.css";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// interface SelectedOption {
//   value: string;
//   label: string;
// }

const Header = () => {
  const { t } = useTranslation("");
  const { data: session } = useSession();
  // const [language, setLanguage] = useState("japanese");
  // const options = [
  //   { value: "english", label: "English" },
  //   { value: "japanese", label: "Japanese" },
  // ];

  const navbar = () => {
    // Check if users have already signed up or logged in
    if (session) {
      return (
        <>
          <li className={styles.li}>
            <Link
              className={styles.link}
              href="/mypage"
              suppressHydrationWarning
            >
              {t("Header.MyPage")}
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} href="/contact">
              {t("Header.Contact")}
            </Link>
          </li>
          <li className={styles.li}>
            <button
              className={styles.button}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              {t("Header.SignOut")}
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className={styles.li}>
            <button
              className={styles.button}
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              {t("Header.SignIn")}
            </button>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} href="/contact">
              {t("Header.Contact")}
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.title}>
        Exchange Rate Reminder
      </Link>
      <nav>
        <ul className={styles.ul}>
          {navbar()}
          {/* <Select
            options={options}
            onChange={(selectedOption: SingleValue<SelectedOption>) => {
              setLanguage(selectedOption!.value);
            }}
          /> */}
        </ul>
      </nav>
    </header>
  );
};
export default Header;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
