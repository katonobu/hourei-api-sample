import { handleError } from "@/lib/utils/api";
import { Failure } from "@/types/result";
import { describe, it, expect, vi } from "vitest";

// Responseのモックを作成するためのヘルパー関数
const createMockResponse = (body: any, ok = false, status = 400) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
    statusText: ok ? "OK" : "Bad Request",
  });
};

describe("handleError function", () => {
  it("Errorインスタンスを正しく処理できること", async () => {
    const error = new Error("Test error message");
    const result = await handleError(error);
    expect(result).toEqual<Failure>({
      isSuccess: false,
      error: new Error("API error: Test error message"),
    });
  });

  it("Responseプロパティを持つオブジェクトを正しく処理できること", async () => {
    // Responseのモックを作成
    const mockResponse = createMockResponse({
      message: "Response error message",
    });
    const error = { response: mockResponse };
    const result = await handleError(error as unknown);
    expect(result).toEqual<Failure>({
      isSuccess: false,
      error: new Error("API error: Response error message"),
    });
  });

  it("ErrorでもResponseでもないオブジェクトを正しく処理できること", async () => {
    const error = { someProperty: "someValue" };
    const result = await handleError(error as unknown);
    expect(result).toEqual<Failure>({
      isSuccess: false,
      error: new Error("API error: An unknown error occurred"),
    });
  });

  it("レスポンスボディにメッセージがないエラーを処理できること", async () => {
    const mockResponse = createMockResponse({});
    const error = { response: mockResponse };
    const result = await handleError(error as unknown);
    expect(result).toEqual<Failure>({
      isSuccess: false,
      error: new Error("API error"),
    });
  });

  it("レスポンスボディの読み取りに失敗した場合を処理できること", async () => {
    const mockResponse = createMockResponse({
      message: "This should not be read",
    });
    // Responseのjsonメソッドをモックして、エラーを投げるようにする
    vi.spyOn(mockResponse, "json").mockRejectedValue(
      new Error("Failed to read")
    );
    const error = { response: mockResponse };
    const result = await handleError(error as unknown);
    expect(result).toEqual<Failure>({
      isSuccess: false,
      error: new Error("API error"),
    });
  });
});
