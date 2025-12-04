"use client";

import { useState } from "react";
import { signIn, signUp } from "@/features/auth";
import styles from "./page.module.scss";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("ivan@example.com");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signIn(email, password);
        if (result?.error) {
          setError(result.error);
        } else {
          window.location.href = "/";
        }
      } else {
        const result = await signUp(email, password, name);
        if (result?.error) {
          setError(result.error);
        } else {
          // После регистрации автоматически авторизуем
          const loginResult = await signIn(email, password);
          if (!loginResult?.error) {
            window.location.href = "/";
          }
        }
      }
    } catch (err) {
      setError("Произошла ошибка. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h1 className={styles.title}>Chancey</h1>
          <p className={styles.subtitle}>
            Fair, Community Driven, Cryptocurrency Lottery
          </p>
        </div>

        <div className={styles.authCard}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${isLogin ? styles.active : ""}`}
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
            >
              Войти
            </button>
            <button
              className={`${styles.tab} ${!isLogin ? styles.active : ""}`}
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {!isLogin && (
              <div className={styles.inputGroup}>
                <label htmlFor="name">Имя</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Введите ваше имя"
                />
              </div>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                //type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Минимум 6 символов"
                minLength={6}
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading
                ? "Загрузка..."
                : isLogin
                ? "Войти"
                : "Зарегистрироваться"}
            </button>
          </form>
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>О Chancey</h2>
          <p className={styles.infoText}>
            Chancey - это честная, управляемая сообществом криптовалютная
            лотерея, построенная на технологии блокчейн. Каждый билет дает
            равные шансы на победу, а все транзакции прозрачны и отслеживаемы.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>⚖️</span>
              <span>Честная игра</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🔒</span>
              <span>Безопасность</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🏆</span>
              <span>Большие призы</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
