import useModalToggleHooks from "./modal-toggle-hooks";

const API_SPECIFICATION_URL = {
  url: process.env.NEXT_PUBLIC_API_SPECIFICATION_URL || "",
  title: "API 仕様書",
  label: "API 仕様書",
};

const API_NEXT_PUBLIC_SOURCE_CODE_STORAGE_URL = {
  url: process.env.NEXT_PUBLIC_SOURCE_CODE_STORAGE_URL || "",
  title: "ソースコードのダウンロード",
  label: "ソースコードのダウンロード",
};

const useHeaderDropdownHooks = () => {
  const { isShow, onClickToggleVisibility } =
    useModalToggleHooks("#headerDropdown");

  // ヘッダーのヘルプリンク(API仕様書)のURL
  const swaggerUiUrl = API_SPECIFICATION_URL;
  // ヘッダーのヘルプリンク(ダウンロード)のURL
  const lawDownloadUiUrl = API_NEXT_PUBLIC_SOURCE_CODE_STORAGE_URL;

  return { isShow, swaggerUiUrl, lawDownloadUiUrl, onClickToggleVisibility };
};

export default useHeaderDropdownHooks;
