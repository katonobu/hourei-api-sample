import { RelatedArticleNumType } from "@/types/law";
import { TextNode } from "./text-node";

/**
 * 関係条⽂番号のコンポーネント
 * @param {Object} props - プロパティオブジェクト
 * @param {RelatedArticleNumType[]} props.relatedArticleNumList - 表示情報
 * @param {string[]} props.treeElement - 法令ツリー要素
 * @returns {JSX.Element} - 関係条⽂番号のコンポーネント
 */
export const LawRelatedArticleNum: React.FC<{
  relatedArticleNumList: RelatedArticleNumType[];
  treeElement: string[];
}> = (props) => {
  const { relatedArticleNumList, treeElement } = props;
  return (
    <>
      {relatedArticleNumList.length > 0 && (
        <TextNode
          val={relatedArticleNumList[0].RelatedArticleNum}
          treeElement={[...treeElement, "RelatedArticleNum"]}
        />
      )}
    </>
  );
};
