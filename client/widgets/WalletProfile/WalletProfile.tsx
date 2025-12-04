'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import styles from './WalletProfile.module.scss';

interface WalletProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletProfile = ({ isOpen, onClose }: WalletProfileProps) => {
  const { data: session } = useSession();
  const [network] = useState('Base Sepolia');
  const [chanceyBalance] = useState('0.0');
  const [ethBalance] = useState('0.0');

  const handleDisconnect = async () => {
    await signOut({ callbackUrl: '/auth' });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.walletAddress}>
            {session?.user?.email || 'user@example.com'}
          </div>
          <div className={styles.network}>{network}</div>
          {session?.user?.name && (
            <div className={styles.userName}>{session.user.name}</div>
          )}
        </div>

        <div className={styles.divider}></div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Wallet Balances</h3>
          <div className={styles.balanceItem}>
            <div className={styles.tokenIcon}>
              <span className={styles.chanceyIcon}>C</span>
            </div>
            <span className={styles.balanceValue}>{chanceyBalance}</span>
          </div>
          <div className={styles.balanceItem}>
            <div className={styles.tokenIcon}>
              <span className={styles.ethIcon}>◆</span>
            </div>
            <span className={styles.balanceValue}>{ethBalance}</span>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Redeem your CHANCEY</h3>
          <div className={styles.redeemItem}>
            <span className={styles.redeemIcon}>🎫</span>
            <span className={styles.redeemText}>Free Tickets</span>
          </div>
          <div className={styles.redeemItem}>
            <span className={styles.redeemIcon}>💎</span>
            <span className={styles.redeemText}>Pot Claim</span>
          </div>
        </div>

        <div className={styles.divider}></div>

        <button className={styles.disconnectButton} onClick={handleDisconnect}>
          DISCONNECT
        </button>
      </div>
    </>
  );
};
