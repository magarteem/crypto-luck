import styles from './BlockchainGrid.module.scss';

interface BlockchainGridProps {
  className?: string;
}

export const BlockchainGrid = ({ className }: BlockchainGridProps) => {
  return (
    <div className={`${styles.grid} ${className || ''}`}>
      <div className={styles.gridLines}></div>
      <div className={styles.gridDots}></div>
    </div>
  );
};

