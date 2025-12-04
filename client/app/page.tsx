import styles from './page.module.scss';
import { BlockchainGrid } from '@/shared/ui/BlockchainGrid';
import { FloatingParticles } from '@/shared/ui/FloatingParticles';
import { BlockchainIcon } from '@/shared/ui/BlockchainIcon';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <BlockchainGrid />
        <FloatingParticles count={15} />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Chancey</h1>
          <p className={styles.subtitle}>
            Fair, Community Driven, Cryptocurrency Lottery
          </p>
          <div className={styles.blockchainBadge}>
            <BlockchainIcon size="small" />
            <span>Powered by Blockchain</span>
          </div>
          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.buttonPrimary}`}>
              <span className={styles.buttonIcon}>▶</span>
              Play Now
            </button>
            <button className={`${styles.button} ${styles.buttonSecondary}`}>
              <span className={styles.buttonIcon}>📄</span>
              White Paper
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.sections}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>⚖️</div>
            <BlockchainIcon size="medium" className={styles.blockchainIcon} />
          </div>
          <h2 className={styles.sectionTitle}>Fair Play</h2>
          <p className={styles.sectionText}>
            Chancey leverages blockchain technology to ensure transparent, fair play in every draw. 
            It's not just a game, but a platform where integrity is as vital as the thrill of winning.
          </p>
          <p className={styles.sectionText}>
            Participants can confidently trust in the fair distribution of winnings, backed by clear, 
            trackable records of fund management.
          </p>
        </section>
        
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>🏆</div>
            <BlockchainIcon size="medium" className={styles.blockchainIcon} />
          </div>
          <h2 className={styles.sectionTitle}>Big Prizes</h2>
          <p className={styles.sectionText}>
            Win big with our community-driven lottery system. Every ticket brings prizes and power!
          </p>
        </section>
      </div>
    </div>
  );
}
