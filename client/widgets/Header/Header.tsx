'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Logo } from '@/shared/ui/Logo';
import { Navigation } from '@/widgets/Navigation';
import { WalletProfile } from '@/widgets/WalletProfile';
import styles from './Header.module.scss';

export const Header = () => {
  const { data: session } = useSession();
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const displayEmail = session?.user?.email 
    ? `${session.user.email.slice(0, 8)}...${session.user.email.slice(-6)}`
    : '0xf39Fd6...b92266';

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Logo />
          <Navigation />
          <button 
            className={styles.walletButton}
            onClick={() => setIsWalletOpen(true)}
          >
            <span className={styles.walletAddress}>{displayEmail}</span>
            <span className={styles.network}>| Base Sepolia</span>
          </button>
        </div>
      </header>
      <WalletProfile 
        isOpen={isWalletOpen} 
        onClose={() => setIsWalletOpen(false)} 
      />
    </>
  );
};

