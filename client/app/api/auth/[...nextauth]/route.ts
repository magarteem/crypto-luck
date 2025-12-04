import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
          const loginUrl = `${apiUrl}/api/auth/login`;

          console.log("Attempting login to:", loginUrl);

          // Здесь будет запрос к вашему API для проверки пользователя
          const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          console.log("Response status:", response.status);
          console.log("Response ok:", response.ok);

          // Читаем тело ответа один раз
          const text = await response.text();
          console.log("Response text length:", text.length);
          console.log("Response text:", text);

          // Проверяем, что ответ не пустой
          if (!text || text.trim() === "") {
            console.error("Empty response body");
            return null;
          }

          // Пытаемся распарсить JSON
          let responseData: any = null;
          try {
            responseData = JSON.parse(text);
            console.log("Parsed response data:", responseData);
          } catch (parseError) {
            console.error("JSON parse error:", parseError);
            console.error("Failed to parse text:", text);
            return null;
          }

          // Проверяем статус ответа
          if (!response.ok) {
            console.error(
              "Auth error response:",
              response.status,
              responseData
            );
            return null;
          }

          // Проверяем, что получили валидные данные пользователя
          if (responseData && responseData.id) {
            console.log("Login successful for user:", responseData.email);
            return {
              id: responseData.id.toString(),
              email: responseData.email,
              name: responseData.name || responseData.email,
            };
          }

          console.error("Invalid user data:", responseData);
          return null;
        } catch (error) {
          console.error("Auth fetch error:", error);
          // Проверяем, не связана ли ошибка с недоступностью сервера
          if (error instanceof TypeError && error.message.includes("fetch")) {
            console.error(
              "Server might be down or unreachable. Check if backend is running on http://localhost:3001"
            );
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret:
    process.env.NEXTAUTH_SECRET ||
    "your-secret-key-change-in-production-min-32-chars-long",
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
};

const { handlers } = NextAuth(authOptions);

export const { GET, POST } = handlers;
