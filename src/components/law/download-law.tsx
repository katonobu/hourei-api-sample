"use client";
import { FileType } from "@/lib/typescript-fetch";
import logger from "@/lib/utils/logger";
import Icon from "../elements/icons";
import useModalToggleHooks from "@/hooks/modal-toggle-hooks";
import { LawNumType, LawTitleType } from "@/types/law";
import { LawTag } from "../elements/tag";
import LawTitle from "./law-title";
import LawNum from "./law-num";
import { useToast } from "../ui/use-toast";

export type FileTypeInfo = {
  fileType: FileType;
  label: string;
  extension: string;
};

const FILE_TYPE_INFO_LIST: FileTypeInfo[] = [
  {
    fileType: FileType.Xml,
    label: "XML",
    extension: ".xml",
  },
  {
    fileType: FileType.Json,
    label: "JSON",
    extension: ".json",
  },
  {
    fileType: FileType.Html,
    label: "HTML",
    extension: ".html",
  },
  {
    fileType: FileType.Rtf,
    label: "RTF",
    extension: ".rtf",
  },
  {
    fileType: FileType.Docx,
    label: "Word(Docx)",
    extension: ".docx",
  },
];

/**
 * 法令本文ファイル取得API
 * @param {string} lawRevisionId - 法令履歴ID
 * @returns {Promise<Blob>} - 法令本文ファイルのBlobデータ
 */
const fetchLawFile = async (lawRevisionId: string, fileType: FileType) => {
  const res = await fetch(
    `/law-file/${lawRevisionId}/api?fileType=${fileType}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return await res.blob();
};

/**
 * 法令のダウンロードコンポーネント
 * @param {lawRevisionId} props.lawRevisionId - 法令履歴ID
 * @param {LawTitleType} props.lawTitle - 法令名
 * @param {LawNumType} props.lawNum - 法令番号
 * @param {string} props.lawType - 法令種別
 * @param {string} props.dialogClassName - ダイアログのClassName
 * @returns {JSX.Element} - 法令のダウンロードコンポーネント
 */
export const DownloadLawDropdown: React.FC<{
  lawRevisionId: string;
  lawTitle?: LawTitleType;
  lawNum?: LawNumType;
  lawType?: string;
  dialogClassName?: string;
}> = (props) => {
  const {
    lawRevisionId,
    lawTitle,
    lawNum,
    lawType,
    dialogClassName = "",
  } = props;
  const id = `downLoadLawDropdown_${lawRevisionId}`;

  const { isShow, onClickToggleVisibility } = useModalToggleHooks(`#${id}`);

  return (
    <div id={id} className="relative items-center">
      <button
        className="min-w-max cursor-pointer"
        type="button"
        aria-label="ファイルダウンロード"
        title="ファイルダウンロード"
        onClick={onClickToggleVisibility}
      >
        <Icon name="download" />
      </button>
      {isShow && (
        <>
          <dialog className="md:hidden modalWrapper top-14 z-20">
            <div className="w-full h-screen bg-White-1000">
              <DownloadLaw
                lawRevisionId={lawRevisionId}
                lawTitle={lawTitle}
                lawNum={lawNum}
                lawType={lawType}
                toggleClose={onClickToggleVisibility}
              />
            </div>
          </dialog>
          <div className="hidden md:block">
            <DownloadLaw
              lawRevisionId={lawRevisionId}
              dialogClassName={dialogClassName}
            />
          </div>
        </>
      )}
    </div>
  );
};

/**
 * 法令のダウンロードコンポーネント
 * @param {lawRevisionId} props.lawRevisionId - 法令履歴ID
 * @param {LawTitleType} props.lawTitle - 法令名
 * @param {LawNumType} props.lawNum - 法令番号
 * @param {string} props.lawType - 法令種別
 * @param {string} props.dialogClassName - ダイアログのClassName
 * @param {() => void} props.toggleClose - サイドパネルの閉じる処理
 * @returns {JSX.Element} - 法令のダウンロードコンポーネント
 */
export const DownloadLaw: React.FC<{
  lawRevisionId: string;
  lawTitle?: LawTitleType;
  lawNum?: LawNumType;
  lawType?: string;
  dialogClassName?: string;
  toggleClose?: () => void;
}> = (props) => {
  const {
    lawRevisionId,
    lawTitle,
    lawNum,
    lawType,
    dialogClassName = "",
    toggleClose,
  } = props;
  const { toast } = useToast();

  const download = async (fileTypeInfo: FileTypeInfo) => {
    try {
      const blob = await fetchLawFile(lawRevisionId, fileTypeInfo.fileType);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      a.download = `${lawRevisionId}${fileTypeInfo.extension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        description: "ファイルダウンロードに失敗しました。",
        className: "bg-Sun-600 text-white",
      });

      logger.error({
        message: "[DownloadLaw] Download failed",
        error: error,
        query: {
          lawRevisionId: lawRevisionId,
          fileType: fileTypeInfo.fileType,
        },
      });
    }
  };

  return (
    <div
      className={`${
        toggleClose == undefined &&
        "absolute w-72 z-10 right-0 border bg-light-Background-Primary rounded-6xl"
      } ${dialogClassName}`}
      data-testid="fileDownloadMenu"
    >
      <div
        className={`flex w-full h-12 px-3 items-center ${
          toggleClose != undefined ? "justify-center" : ""
        }`}
      >
        <div
          className={`font-bold ${toggleClose != undefined ? "mr-auto" : ""}`}
        >
          ファイルダウンロード
        </div>
        {toggleClose != undefined && (
          <button
            className="flex-shrink-0 md:hidden"
            onClick={toggleClose}
            aria-label="ファイルダウンロードを閉じる"
          >
            <Icon name="close" />
          </button>
        )}
      </div>
      {lawType && lawTitle && lawNum && (
        <div className="flex items-baseline bg-inherit px-3 py-4 border-t">
          <div className="pr-2 py-1">
            <LawTag type={lawType} />
          </div>
          <div className="">
            <LawTitle value={lawTitle} />
            <LawNum value={lawNum} />
          </div>
        </div>
      )}
      <ul className="border-t flex flex-col px-3 py-6 gap-6">
        {FILE_TYPE_INFO_LIST.map((fileTypeInfo) => (
          <li key={`Download_${fileTypeInfo.fileType}`}>
            <button
              className="flex items-center gap-1 w-full"
              type="button"
              onClick={() => download(fileTypeInfo)}
            >
              <Icon name="draft" />
              {fileTypeInfo.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
