import { FormatType } from "@/types/law";
import { LawAny } from "./any";

/**
 * 書式のコンポーネント
 * @param {Object} props - プロパティオブジェクト
 * @param {NoteType} props.note - 表示情報
 * @param {string[]} props.treeElement - 法令ツリー要素
 * @returns {JSX.Element} - 書式のコンポーネント
 */
export const LawFormat: React.FC<{
  format: FormatType;
  treeElement: string[];
}> = (props) => {
  const { format, treeElement } = props;
  return (
    <div className="_div_Format">
      <LawAny
        lawTypeList={format.Format}
        parentElement="Format"
        treeElement={treeElement}
      />
    </div>
  );
};
