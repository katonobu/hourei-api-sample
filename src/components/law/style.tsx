import { StyleType } from "@/types/law";
import { LawAny } from "./any";

/**
 * 様式のコンポーネント
 * @param {Object} props - プロパティオブジェクト
 * @param {NoteType} props.note - 表示情報
 * @param {string[]} props.treeElement - 法令ツリー要素
 * @returns {JSX.Element} - 様式のコンポーネント
 */
export const LawStyle: React.FC<{
  style: StyleType;
  treeElement: string[];
}> = (props) => {
  const { style, treeElement } = props;
  return (
    <div>
      <LawAny
        lawTypeList={style.Style}
        parentElement="Style"
        treeElement={treeElement}
      />
    </div>
  );
};
