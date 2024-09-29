import { FileType, LawsApiApi } from "@/lib/typescript-fetch";
import { expect, describe, it, vi, afterEach } from "vitest";
import * as apiModule from "@/lib/utils/api";
import { getLawFile } from "@/lib/api/get-law-file";

const successResponse = new Blob();

describe("getLawFile関数のテスト", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("成功時に法令本文のバイナリーデータを返すべき", async () => {
    const apiClient = {
      getLawfile: vi.fn().mockResolvedValue(successResponse),
    } as unknown as LawsApiApi;
    vi.spyOn(apiModule, "getApiClient").mockReturnValue(apiClient);

    const result = await getLawFile({
      lawRevisionId: "501R00000001001_20190528_000000000000000",
      fileType: FileType.Docx,
    });

    expect(apiModule.getApiClient).toHaveBeenCalled();
    expect(apiClient.getLawfile).toHaveBeenCalledWith({
      lawRevisionId: "501R00000001001_20190528_000000000000000",
      fileType: FileType.Docx,
    });
    expect(result).toEqual({
      isSuccess: true,
      value: successResponse,
    });
  });

  it("失敗時にエラーを返すべき", async () => {
    const apiClient = {
      getLawfile: vi.fn().mockRejectedValue(new Error("mock error")),
    } as unknown as LawsApiApi;
    vi.spyOn(apiModule, "getApiClient").mockReturnValue(apiClient);

    const result = await getLawFile({
      lawRevisionId: "501R00000001001_20190528_000000000000000",
      fileType: FileType.Docx,
    });

    expect(apiModule.getApiClient).toHaveBeenCalled();
    expect(apiClient.getLawfile).toHaveBeenCalledWith({
      lawRevisionId: "501R00000001001_20190528_000000000000000",
      fileType: FileType.Docx,
    });
    expect(result).toEqual({
      isSuccess: false,
      error: new Error("API error: mock error"),
    });
  });

  it("バリデーションエラー時にエラーを返すべき", async () => {
    const result = await getLawFile({
      lawRevisionId: "",
      fileType: FileType.Docx,
    });

    expect(result).toEqual({
      isSuccess: false,
      error: new Error("法令履歴ID(完全一致)の入力は必須です"),
    });
  });

  it("バリデーションエラー時にエラーを返すべき", async () => {
    const result = await getLawFile({
      lawRevisionId: "501R00000001001_20190528_000000000000000",
      fileType: "",
    });

    expect(result).toEqual({
      isSuccess: false,
      error: new Error("ファイル種別の値に誤りがあります"),
    });
  });
});
