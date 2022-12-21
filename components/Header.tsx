import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <header>
      <Link href="/" className={styles.title}>Exchange Rate Reminder</Link>
      <nav>
        <ul>
          <li>
            <Link href="/signup" className={styles.navbar}>登録</Link>
          </li>
          <li>
            <Link href="/login" className={styles.navbar}>ログイン</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
