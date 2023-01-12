import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  // Check if users have already logged in
  if (session) {
    return (
      <div className={styles.layout}>
        <h1 className={styles.explanation}>ようこそ {session.user?.name}</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.layout}>
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
