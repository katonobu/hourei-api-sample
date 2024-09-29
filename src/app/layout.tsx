import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { Noto_Sans_JP } from "next/font/google";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

/**
 * フォント設定
 */
const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "法令APIプロトタイプ利用サンプル",
  description: "法令APIプロトタイプ利用サンプル",
};

/**
 * ページ全体のレイアウト(ルートレイアウト)を定義するコンポーネント
 * @param {React.ReactNode} children - ページのコンテンツ
 * @returns {JSX.Element} - ページ全体のレイアウト
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">
          <div className="pt-14 pb-4 grid grid-cols-4 md:grid-cols-12 md:min-w-tablet md:max-width-tablet lg:min-w-desktop lg:max-w-desktop mx-auto">
            {children}
          </div>
          <Toaster />
        </main>
        <Footer />
      </body>
    </html>
  );
}
