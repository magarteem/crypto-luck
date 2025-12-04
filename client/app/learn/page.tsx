import styles from './page.module.scss';

export default function LearnPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Learn</h1>
        <p className={styles.subtitle}>Learn more about Chancey and how it works</p>
        
        <div className={styles.content}>
          <p className={styles.placeholder}>
            Learn page content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}

