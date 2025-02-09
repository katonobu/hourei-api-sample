import {
  ArticleCaptionType,
  ArticleTitleType,
  ArticleType,
  ParagraphType,
  SupplNoteType,
} from "@/types/law";
import { LawParagraph } from "./paragraph";
import { getType } from "@/lib/law/law";
import { TextNode } from "./text-node";

/**
 * 条のコンポーネント
 * @param {Object} props - プロパティオブジェクト
 * @param {ArticleType[]} props.articleList - 表示情報
 * @param {string[]} props.treeElement - 法令ツリー要素
 * @returns {JSX.Element} - 条のコンポーネント
 */
export const LawArticle: React.FC<{
  articleList: ArticleType[];
  treeElement: string[];
}> = (props) => {
  const { articleList, treeElement } = props;
  const addTreeElement = (index: number, isSecond: boolean) => [
    ...treeElement,
    `Article_${index}${isSecond ? "_Second" : ""}`,
  ];
  return (
    <>
      {articleList.map((dt, index) => {
        const ArticleCaption = getType<ArticleCaptionType>(
          dt.Article,
          "ArticleCaption"
        );
        const ArticleTitle = getType<ArticleTitleType>(
          dt.Article,
          "ArticleTitle"
        )[0];
        const Paragraph = getType<ParagraphType>(dt.Article, "Paragraph");
        const SupplNote = getType<SupplNoteType>(dt.Article, "SupplNote");
        return (
          <section
            key={`${addTreeElement(index, false).join("_")}`}
            className="active Article pb-4"
          >
            {"ArticleCaption" in dt.Article[0] && (
              <div className="_div_ArticleCaption font-bold pl-4">
                <TextNode
                  val={ArticleCaption[0].ArticleCaption}
                  treeElement={addTreeElement(index, false)}
                />
              </div>
            )}
            <div className="_div_ArticleTitle pl-4 indent-1">
              <span className="font-bold">
                <TextNode
                  val={ArticleTitle.ArticleTitle}
                  treeElement={addTreeElement(index, false)}
                />
              </span>
              {"ArticleCaption" in dt.Article[1] && (
                <span className="font-bold">
                  <TextNode
                    val={ArticleCaption[0].ArticleCaption}
                    treeElement={addTreeElement(index, false)}
                  />
                </span>
              )}
              {`　`}
              <LawParagraph
                paragraphList={[Paragraph[0]]}
                treeElement={addTreeElement(index, false)}
                parentParagraphIndex={0}
              />
            </div>
            <LawParagraph
              paragraphList={Paragraph.filter((dt, index) => index > 0)}
              treeElement={addTreeElement(index, true)}
              parentParagraphIndex={1}
            />
            {SupplNote.length > 0 && (
              <div className="_div_SupplNote pl-8 indent-1">
                <TextNode
                  val={SupplNote[0].SupplNote}
                  treeElement={addTreeElement(index, false)}
                />
              </div>
            )}
          </section>
        );
      })}
    </>
  );
};
