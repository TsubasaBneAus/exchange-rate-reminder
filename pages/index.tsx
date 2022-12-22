import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.layout}>
      <h1 className={styles.explanation}>為替レートをメールでお知らせするアプリケーションです。</h1>
      <h1 className={styles.explanation}>
        海外送金するタイミングやFXのために為替チャートを逐一確認するのが面倒な方へ！
      </h1>
    </div>
  );
}
