import { z } from "zod";
import { AsOfSchema } from "./date-schemas";
import { PageSchema, SortSchema } from "./common-schema";

/**
 * キーワード検索API(/keyword)のクエリパラメータのスキーマのバリデーション
 *
 * @type {z.ZodObject<{
 *   keyword: z.ZodString,
 *   asof: z.ZodString,
 *   page?: z.ZodNumber | undefined,
 *   orderNo?: z.ZodString | undefined
 * }, "strip", {
 *   keyword: string,
 *   asof: string,
 *   page?: number | undefined,
 *   orderNo?: string | undefined
 * }>}
 */
export const RequestKeywordSearchParamsSchema = z.object({
  keyword: z.string().refine(
    (value) => {
      // 全角スペースを含む全ての空白を削除
      const noSpaces = value.replace(/\s/g, "");
      // 空白を削除した後の文字列の長さが0より大きいかチェック
      return noSpaces.length > 0;
    },
    {
      message: "キーワードの入力は必須です",
    }
  ), // キーワード
  asof: AsOfSchema, // 時点指定
  page: PageSchema.optional(), // ページ番号
  orderNo: SortSchema.optional(), // ソート順
});

export type RequestKeywordSearchParams = z.infer<
  typeof RequestKeywordSearchParamsSchema
>;
