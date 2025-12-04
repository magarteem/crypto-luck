'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { Header } from '@/widgets/Header';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    // Если на странице авторизации и пользователь уже залогинен - редирект на главную
    if (pathname === '/auth' && session) {
      router.push('/');
      return;
    }

    // Если не на странице авторизации и пользователь не залогинен - редирект на авторизацию
    if (pathname !== '/auth' && !session && status === 'unauthenticated') {
      router.push('/auth');
      return;
    }
  }, [session, status, pathname, router]);

  // Показываем загрузку пока проверяется сессия
  if (status === 'loading') {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        color: 'var(--color-text-primary)'
      }}>
        Загрузка...
      </div>
    );
  }

  // Если на странице авторизации - показываем только children (без Header)
  if (pathname === '/auth') {
    return <>{children}</>;
  }

  // Если пользователь залогинен - показываем полный layout с Header
  if (session) {
    return (
      <>
        <Header />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
      </>
    );
  }

  return null;
};

