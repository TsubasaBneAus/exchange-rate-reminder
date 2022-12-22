import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.layout}>
      <h2 className={styles.explanation}>為替レートをメールでお知らせするアプリケーションです。</h2>
      <h2 className={styles.explanation}>
        海外送金するタイミングやFXのために為替チャートを逐一確認するのが面倒な方へ！
      </h2>
    </div>
  );
}
