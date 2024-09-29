import { FileType } from "@/lib/typescript-fetch";
import { z } from "zod";

/**
 * ファイル種別のスキーマ
 */
const validFileTypes = Object.values(FileType);

/**
 * 法令本文ファイル取得API(/lawfile)のクエリパラメータのスキーマのバリデーション
 */
export const RequestLawFileParamsSchema = z.object({
  lawRevisionId: z.string().refine((value) => value.length > 0, {
    message: "法令履歴ID(完全一致)の入力は必須です",
  }),
  fileType: z.string().refine(
    (value) => {
      const validFileTypeSet = new Set(validFileTypes);
      return validFileTypeSet.has(value as FileType);
    },
    {
      message: "ファイル種別の値に誤りがあります",
      path: ["fileType"],
    }
  ),
});

export type RequestLawFileParams = z.infer<typeof RequestLawFileParamsSchema>;
