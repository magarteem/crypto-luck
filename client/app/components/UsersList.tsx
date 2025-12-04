'use client';

import { useEffect, useState } from 'react';
import { User, UsersResponse } from '../types/user';

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/users');
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки пользователей');
        }
        
        const data: UsersResponse = await response.json();
        setUsers(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Загрузка пользователей...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Ошибка: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Список пользователей</h1>
      <div style={{ display: 'grid', gap: '16px' }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0' }}>{user.name}</h3>
            <p style={{ margin: '4px 0', color: '#666' }}>
              Email: {user.email}
            </p>
            <p style={{ margin: '4px 0', color: '#666' }}>
              Роль: <strong>{user.role}</strong>
            </p>
          </div>
        ))}
      </div>
      {users.length === 0 && (
        <p>Пользователи не найдены</p>
      )}
    </div>
  );
}
