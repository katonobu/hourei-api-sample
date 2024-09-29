import logger from "@/lib/utils/logger";
import { Metadata } from "next";

/**
 * ページのメタデータ設定
 */
export const metadata: Metadata = {
  title: "キーワード検索画面 | 法令APIプロトタイプ利用サンプル",
  description: "キーワード検索画面",
};

/**
 * キーワード検索画面
 * @returns {JSX.Element} キーワード検索画面コンポーネント
 */
export default function Keyword() {
  logger.info({
    message: "[keyword]",
  });
  return <></>;
}
