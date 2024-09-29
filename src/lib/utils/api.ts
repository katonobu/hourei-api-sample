import { Failure } from "@/types/result";
import { Configuration, LawsApiApi } from "../typescript-fetch";

type ApiClientProps = {
  headers: Record<string, string>;
};

/**
 * LawsApiApiのインスタンスを返す関数です。
 * @param {ApiClientProps} [options] - オプションの設定
 * @param {Record<string, string>} [options.headers] - リクエストヘッダー
 * @returns {LawsApiApi} - LawsApiApiのインスタンス
 */
export const getApiClient = (options?: ApiClientProps) => {
  // APIの設定 (OpenAPI Generatorで生成したクライアントコードを利用)
  // Configuration オブジェクトを生成して、APIの基本パスとヘッダーを設定
  const conf = new Configuration({
    basePath: process.env.API_URL,
    headers: {
      ...options?.headers,
    },
  });
  // APIオブジェクトを生成して返す
  return new LawsApiApi(conf);
};

/**
 * APIのエラーハンドリング
 * @param error
 * @returns
 */
export const handleError = async (error: unknown): Promise<Failure> => {
  let errorMessage = "API error"; // デフォルトのエラーメッセージ

  // errorが持つresponseプロパティがResponseインスタンスかどうかを確認
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    error.response instanceof Response
  ) {
    try {
      const errorBody = await error.response.json();
      errorMessage += errorBody.message ? `: ${errorBody.message}` : "";
    } catch (e) {
      console.error("Error reading error response body:", e);
    }
  } else if (error instanceof Error) {
    // errorがErrorインスタンスの場合、そのメッセージを使用
    errorMessage += `: ${error.message}`;
  } else {
    // errorがその他の型の場合、デフォルトのエラーメッセージを使用
    errorMessage += ": An unknown error occurred";
  }

  return {
    isSuccess: false,
    error: new Error(errorMessage),
  };
};
