import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LanguageMenu from "./LanguageMenu";

const Header = () => {
  const { t, i18n } = useTranslation("");
  const { data: session } = useSession();

  // Change the contents of the navigation bar according to the user session
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
              className={styles.button1}
              onClick={() => signOut({ callbackUrl: `/${i18n.language}` })}
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
              className={styles.button2}
              onClick={() =>
                signIn("google", { callbackUrl: `/${i18n.language}` })
              }
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
          <li className={styles.li}>
            <LanguageMenu />
          </li>
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
