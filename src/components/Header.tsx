import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { data: session } = useSession();
  const checkSession = () => {
    if (session) {
      return (
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link className={styles.link} href="/mypage">
              マイページ
            </Link>
            <button
              className={styles.button}
              onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            >
              ログアウト
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className={styles.ul}>
          <li className={styles.li}>
            <button className={styles.button} onClick={() => signIn()}>
              登録・ログイン
            </button>
          </li>
        </ul>
      );
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.title}>
        Exchange Rate Reminder
      </Link>
      <nav>{checkSession()}</nav>
    </header>
  );
};

export default Header;
