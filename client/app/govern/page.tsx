import styles from './page.module.scss';

export default function GovernPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Govern</h1>
        <p className={styles.subtitle}>Your Voice, Your Game. Propose. Vote. Shape the Future of Chancey!</p>
        
        <div className={styles.content}>
          <p className={styles.placeholder}>
            Governance page content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}

