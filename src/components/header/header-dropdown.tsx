"use client";
import Link from "next/link";
import Icon from "../elements/icons";
import useHeaderDropdownHooks from "@/hooks/header-dropdown-hooks";

/**
 * 共通ヘッダー ドロップダウン コンポーネント
 * ヘルプページとして、 API仕様書へのリンクを表示する
 * @returns {React.ReactNode} ヘッダー ドロップダウン コンポーネント
 */
const HeaderDropdown = () => {
  const { isShow, swaggerUiUrl, lawDownloadUiUrl, onClickToggleVisibility } =
    useHeaderDropdownHooks();

  return (
    <div id="headerDropdown" className="relative">
      <button
        className="flex items-center gap-1"
        onClick={onClickToggleVisibility}
      >
        <Icon name="help" />
        <span className="hidden md:block">ヘルプ</span>
      </button>
      {isShow && (
        <ul className="absolute w-max right-0 p-4 border bg-light-Background-Primary rounded-6xl flex flex-col gap-4">
          <li>
            <Link
              className="text-light-Text-Link"
              href={swaggerUiUrl.url}
              title={swaggerUiUrl.title}
              target="_blank"
            >
              {swaggerUiUrl.label}
            </Link>
          </li>
          <li>
            <Link
              className="text-light-Text-Link"
              href={lawDownloadUiUrl.url}
              title={lawDownloadUiUrl.title}
              target="_blank"
            >
              {lawDownloadUiUrl.label}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HeaderDropdown;
