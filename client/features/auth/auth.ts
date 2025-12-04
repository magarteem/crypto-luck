'use client';

import { signIn as nextAuthSignIn } from 'next-auth/react';

export async function signIn(email: string, password: string) {
  try {
    const result = await nextAuthSignIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: 'Неверный email или пароль' };
    }

    return { success: true };
  } catch (error) {
    return { error: 'Произошла ошибка при входе' };
  }
}

export async function signUp(email: string, password: string, name: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || 'Ошибка при регистрации' };
    }

    return { success: true };
  } catch (error) {
    return { error: 'Произошла ошибка при регистрации' };
  }
}

