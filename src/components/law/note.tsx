import { NoteType } from "@/types/law";
import { LawAny } from "./any";

/**
 * 記のコンポーネント
 * @param {Object} props - プロパティオブジェクト
 * @param {NoteType} props.note - 表示情報
 * @param {string[]} props.treeElement - 法令ツリー要素
 * @returns {JSX.Element} - 記のコンポーネント
 */
export const LawNote: React.FC<{
  note: NoteType;
  treeElement: string[];
}> = (props) => {
  const { note, treeElement } = props;
  return (
    <div className="_div_Note">
      <LawAny
        lawTypeList={note.Note}
        parentElement="Note"
        treeElement={treeElement}
      />
    </div>
  );
};
