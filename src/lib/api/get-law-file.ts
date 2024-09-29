import { FileType, GetLawfileRequest } from "../typescript-fetch";
import { getApiClient, handleError } from "../utils/api";
import { validateRequest } from "../utils/zod-schemas/common-schema";
import { Result } from "@/types/result";
import logger from "../utils/logger";
import {
  RequestLawFileParams,
  RequestLawFileParamsSchema,
} from "../utils/zod-schemas/request-law-file-params-schema";

/**
 * GetLawfileRequestオブジェクトを受け取り、法令本文ファイルのデータを取得する非同期関数です。
 * @param {GetLawfileRequest} query - 法令本文ファイルの取得に必要なクエリパラメータ
 * @returns {Promise<Blob>} - 法令本文ファイルのデータを含むPromiseオブジェクト
 */
export const fetchLawfile = async (query: GetLawfileRequest) => {
  // APIクライアントの生成
  const api = getApiClient();
  // 添付ファイル取得API(/lawfile)を呼び出し
  // api.getLawfileメソッドにクエリパラメータを渡し、法令本文ファイルのデータを取得
  return await api.getLawfile(query);
};

/**
 * 法令画面の法令本文ファイル取得処理
 * 法令本文ファイル取得API(/lawfile)を利用
 * 法令画面の法令本文ファイル(blob)を取得する
 * @param {GetLawfileRequest} params - 検索条件
 * @param {string} params.lawRevisionId - 法令ID
 * @param {FileType} params.fileType - ファイル種別
 * @returns {Promise<Result<Blob>>} - 法令本文ファイルのデータ
 *
 * 利用対象API: /lawfile (GET) - 法令本文ファイル取得API
 * - APIエンドポイント [API_URL]/lawfile
 * - リクエストメソッド: GET
 * - リクエストパラメータ: params（検索条件）
 *
 *    本データ取得処理は、@interface {GetLawfileRequest} のパラメータのうち、
 *    @param {GetLawfileRequest} に記載している以下のパラメータを利用し、法令本文ファイルのデータを取得しています。
 *    lawRevisionId(法令履歴ID),
 *    fileType(ファイル種別)
 *
 * - レスポンス: 法令本文ファイルのデータ（Blob）
 * - エラーハンドリング: APIからのエラーレスポンスや通信エラーに対しては、Errorオブジェクトを生成して返す
 * - 依存関係: 環境変数（process.env.API_URL）からAPIのBase URLを取得
 * - クライアントコード生成: OpenAPI Generatorを利用して生成(TypeScript-fetch)
 *
 */
export const getLawFile = async ({
  lawRevisionId,
  fileType,
}: RequestLawFileParams): Promise<Result<Blob>> => {
  // リクエストパラメータのバリデーションチェック
  const validateResult = validateRequest<RequestLawFileParams>({
    schema: RequestLawFileParamsSchema,
    params: { lawRevisionId, fileType },
  });
  // バリデーションエラーの場合は Error オブジェクトを返す
  if (!validateResult.isSuccess) return validateResult;

  // リクエストパラメータの整形、クエリ作成
  // 本データ取得処理(/lawfile)は、@interface {GetLawfileRequest} のパラメータのうち、
  // @param {GetLawfileRequest} に記載している以下のパラメータを利用し、法令本文ファイルのデータを取得しています。
  const query: GetLawfileRequest = {
    lawRevisionId: lawRevisionId,
    fileType: fileType as FileType,
  };

  try {
    // fetchLawfile関数 内部で添付ファイル取得API(/lawfile)を呼び出し、リクエスト
    logger.info("[API] lawfile request");
    const result = await fetchLawfile(query);
    // API呼び出しに成功した場合の処理
    // isSuccessをtrueにして、取得したデータをvalueに格納
    return {
      isSuccess: true,
      value: result,
    };
  } catch (error) {
    logger.error({
      message: "[getLawFile] API error",
      error: error,
      query: query,
    });
    // API呼び出しに失敗した場合の処理
    // isSuccessをfalseにして、エラー情報をerrorに格納
    return handleError(error);
  }
};
