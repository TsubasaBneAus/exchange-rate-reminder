import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className={styles.layout}>
        <h1 className={styles.explanation}>
          Signed in as {session.user?.name} {session.user?.email}
        </h1>
        <button onClick={() => signOut()}>Sign out</button>
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
        <h1 className={styles.explanation}>
          Not signed in
        </h1>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
}

export default Home;
