"use client";

import { useState } from "react";
import Icon from "../elements/icons";
import { LawSideComponent } from "./law_side";
import { RevisionInfo } from "@/lib/typescript-fetch";
import { LawNumType, LawTitleType } from "@/types/law";
import useModalToggleHooks from "@/hooks/modal-toggle-hooks";
import { DownloadLaw } from "./download-law";

/**
 * 法令メニュー表示ボタン
 * @param {Object} props - プロパティオブジェクト
 * @param {LawTitleType} props.lawTitle - 法令名
 * @param {LawNumType} props.lawNum - 法令番号
 * @param {string} props.lawType - 法令種別
 * @param {string} props.publicDate - 公布日
 * @param {RevisionInfo} props.revisionInfo - 沿革情報
 * @returns {JSX.Element} 法令メニュー表示ボタン
 */
const ViewLawMenuButton = ({
  lawTitle,
  lawNum,
  lawType,
  publicDate,
  revisionInfo,
}: {
  lawTitle: LawTitleType;
  lawNum: LawNumType;
  lawType: string;
  publicDate: string;
  revisionInfo?: RevisionInfo;
}) => {
  const { isShow, onClickToggleVisibility } = useModalToggleHooks("#lawMenu");

  const [isShowDialog, setShowDialog] = useState<boolean>(false);

  const toggleShowDialog = () => {
    setShowDialog(!isShowDialog);
  };

  const [viewType, setViewType] = useState<"Info" | "File">("Info");

  return (
    <div
      id="lawMenu"
      className="md:hidden flex flex-shrink-0 min-w-[24px] items-center"
    >
      <button
        className="min-w-max"
        onClick={onClickToggleVisibility}
        aria-label="操作メニュー"
      >
        <Icon name="moreVert" />
      </button>
      {isShow && (
        <div
          className="absolute top-10 w-60 z-10 right-0 border bg-light-Background-Primary rounded-6xl"
          data-testid="actionMenu"
        >
          <div className="font-bold px-3 py-2">操作メニュー</div>
          <ul className="border-t flex flex-col py-4 gap-4">
            <li className="px-3">
              <button
                className="flex items-center gap-1 w-full"
                type="button"
                onClick={() => {
                  onClickToggleVisibility();
                  setViewType("Info");
                  toggleShowDialog();
                }}
              >
                詳細表示
              </button>
            </li>
            <li className="px-3">
              <button
                className="flex items-center gap-1 w-full"
                type="button"
                onClick={() => {
                  onClickToggleVisibility();
                  setViewType("File");
                  toggleShowDialog();
                }}
              >
                ファイルダウンロード
              </button>
            </li>
          </ul>
        </div>
      )}
      {isShowDialog && (
        <dialog className="modalWrapper top-14 z-20">
          <div className="w-full h-screen bg-White-1000">
            {viewType == "Info" ? (
              <LawSideComponent
                lawTitle={lawTitle}
                lawNum={lawNum}
                lawType={lawType}
                publicDate={publicDate}
                revisionInfo={revisionInfo}
                toggleClose={toggleShowDialog}
              />
            ) : (
              <DownloadLaw
                lawRevisionId={revisionInfo?.lawRevisionId ?? ""}
                lawTitle={lawTitle}
                lawNum={lawNum}
                lawType={lawType}
                toggleClose={toggleShowDialog}
              />
            )}
          </div>
        </dialog>
      )}
    </div>
  );
};
export default ViewLawMenuButton;
