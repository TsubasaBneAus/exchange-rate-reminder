import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <header className={styles.header}>
        <Link href="/home" className={styles.title}>
          Exchange Rate Reminder
        </Link>
        <nav>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Link className={styles.link} href="/mypage">
                マイページ
              </Link>
              <button
                className={styles.button}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                ログアウト
              </button>
            </li>
          </ul>
        </nav>
      </header>
    );
  } else {
    return (
      <header className={styles.header}>
        <Link href="/" className={styles.title}>
          Exchange Rate Reminder
        </Link>
        <nav>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <button
                className={styles.button}
                onClick={() => signIn("google", { callbackUrl: "/home" })}
              >
                登録・ログイン
              </button>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
};

export default Header;
