import type { Metadata } from "next";
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "wato787 | Portfolio",
  description: "wato787のポートフォリオサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: 'var(--font-noto-sans-jp), sans-serif' }}
      >
    <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white antialiased">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Header />
          {children}
          <Footer />
        </div>
      </div>
      </body>
    </html>
  );
}
