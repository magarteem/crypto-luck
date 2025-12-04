import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { SessionProvider } from "@/providers/SessionProvider";
import { BlockchainGrid } from "@/shared/ui/BlockchainGrid";
import { AuthLayout } from "@/widgets/AuthLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chancey - Fair, Community Driven, Cryptocurrency Lottery",
  description: "A Social Web3 Lottery platform where integrity meets the thrill of winning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <SessionProvider>
          <AuthLayout>
            <div style={{ position: 'relative', minHeight: '100vh' }}>
              <BlockchainGrid />
              {children}
            </div>
          </AuthLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
