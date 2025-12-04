import styles from './page.module.scss';

export default function TicketsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Tickets</h1>
        <p className={styles.subtitle}>Your lottery tickets and draws</p>
        
        <div className={styles.content}>
          <p className={styles.placeholder}>
            Tickets page content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}

