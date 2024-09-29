import { validateRequest } from "@/lib/utils/zod-schemas/common-schema";
import logger from "@/lib/utils/logger";
import {
  RequestLawFileParams,
  RequestLawFileParamsSchema,
} from "@/lib/utils/zod-schemas/request-law-file-params-schema";
import { fetchLawfile } from "@/lib/api/get-law-file";
import { FileType } from "@/lib/typescript-fetch";

/**
 * APIルート 法令本文ファイル取得API (/law-file/[lawRevisionId]/api?fileType=xxx)
 * クライアントサイドから法令本文ファイルの取得を行う際に利用
 * 法令本文ファイルのデータ(blob)を取得する
 * @param {Request} request
 * @param params.lawRevisionId 法令改正ID
 * @returns {Response} response
 *
 * 利用対象API: /getLawfile (GET) - 法令本文ファイル取得API
 * - APIエンドポイント [API_URL]/getLawfile
 * - リクエストメソッド: GET
 * - リクエストパラメータ: params（検索条件）
 *
 * 本データ取得処理は、@interface {RequestLawFileParams} のパラメータのうち、
 * @param {RequestLawFileParams} に記載している以下のパラメータを利用し、法令本文ファイルのデータを取得しています。
 * lawRevisionId(法令履歴ID)
 * fileType(法令本文ファイルのパス)
 *
 * - レスポンス: 法令本文ファイルのデータ（Blob）
 * - エラーハンドリング: リファラチェックエラー時はステータスコード403,バリデーションエラー時は400,エラー時は500を返却
 * - 依存関係: 環境変数（process.env.API_URL）からAPIのBase URLを取得
 * - クライアントコード生成: OpenAPI Generatorを利用して生成(TypeScript-fetch)
 */
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      lawRevisionId: string;
    };
  }
) {
  // リファラチェック(APIルートに直接のアクセスを簡易的に防ぐ)
  const referer = request.headers.get("Referer") ?? "";
  if (!referer.startsWith(process.env.APP_BASE_URL ?? "")) {
    return new Response("Forbidden", { status: 403 });
  }

  // リクエストパラメータの取得
  const { searchParams } = new URL(request.url);

  // クエリのバリデーションチェック
  const validateResult = validateRequest<RequestLawFileParams>({
    schema: RequestLawFileParamsSchema,
    params: {
      lawRevisionId: params.lawRevisionId,
      fileType: searchParams.get("fileType") ?? "",
    },
  });
  if (!validateResult.isSuccess) {
    return new Response(validateResult.error.message, { status: 400 });
  }

  // クエリパラメータとして利用するパラメータを取得
  const query = {
    lawRevisionId: params.lawRevisionId,
    fileType: searchParams.get("fileType") as FileType,
  };

  try {
    // fetchAttachment関数 内部で法令本文ファイル取得API(/getLawfile)を呼び出し、リクエスト
    const result = await fetchLawfile(query);
    // レスポンスの生成(成功時)
    return new Response(result);
  } catch (error) {
    logger.error({
      message: "[law-file/api] API error",
      error: error,
      query: query,
    });
    // レスポンスの生成(エラー時)
    return new Response("Internal Server Error", { status: 500 });
  }
}
