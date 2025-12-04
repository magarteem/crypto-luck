import styles from './Logo.module.scss';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`${styles.logo} ${className || ''}`}>
      <div className={styles.logoIcon}>
        <span className={styles.logoSymbol}>C</span>
      </div>
      <span className={styles.logoText}>Chancey</span>
    </div>
  );
};

