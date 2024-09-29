import { LawTypeList } from "@/types/law";
import { LawList } from "./list";
import {
  LawSubitem1,
  LawSubitem10,
  LawSubitem2,
  LawSubitem3,
  LawSubitem4,
  LawSubitem5,
  LawSubitem6,
  LawSubitem7,
  LawSubitem8,
  LawSubitem9,
} from "./subitem";
import { LawTableStruct } from "./table-struct";
import { LawFigStruct } from "./fig-struct";
import { LawStyleStruct } from "./style-struct";
import { LawRemarks } from "./remarks";
import { LawFormatStruct } from "./format-struct";
import { LawNoteStruct } from "./note-struct";
import { LawTableColumn } from "./table-column";
import { LawTableRow } from "./table-row";
import { LawSupplProvisionAppdx } from "./suppl-provision-appdx";
import { LawSupplProvisionAppdxTable } from "./suppl-provision-appdx-table";
import { LawSupplProvisionAppdxStyle } from "./suppl-provision-appdx-style";
import { LawAppdxFormat } from "./appdx-format";
import { LawAppdxFig } from "./appdx-fig";
import { LawAppdx } from "./appdx";
import { LawAppdxStyle } from "./appdx-style";
import { LawAppdxNote } from "./appdx-note";
import { LawAppdxTable } from "./appdx-table";
import { LawSentence } from "./sentence";
import { LawItem } from "./item";
import { LawParagraph } from "./paragraph";
import { LawArticle } from "./article";
import { LawDivision } from "./division";
import { LawSubsection } from "./subsection";
import { LawSection } from "./section";
import { LawChapter } from "./chapter";
import { LawPart } from "./part";
import { LawTOC } from "./toc";
import { LawPreamble } from "./preamble";
import { LawAmendProvision } from "./amend-provision";
import { LawBodyComponent } from "./law-body";
import { LawFig } from "./fig";
import {
  ArithFormulaNode,
  LineNode,
  RubyNode,
  SubNode,
  SupNode,
  TextNode,
} from "./text-node";
import { LawTable } from "./table";
import { LawEnactStatement } from "./enact-statement";
import LawNum from "./law-num";
import { LawTOCPart } from "./toc-part";
import { LawTOCChapter } from "./toc-chapter";
import { LawTOCSection } from "./toc-section";
import { LawTOCSubsection } from "./toc-subsection";
import { LawTOCDivision } from "./toc-division";
import { LawTOCArticle } from "./toc-article";
import { LawTOCSupplProvision } from "./toc-suppl-provision";
import { LawTOCAppdxTableLabel } from "./toc-appdx-table-label";
import { LawArticleRange } from "./article-range";
import { LawMainProvision } from "./main-provision";
import { LawParagraphSentence } from "./paragraph-sentence";
import { LawAmendProvisionSentence } from "./amend-provision-sentence";
import { LawNewProvision } from "./new-provision";
import { LawClass } from "./class";
import { LawClassSentence } from "./class-sentence";
import { LawItemSentence } from "./item-sentence";
import {
  LawSubitem10Sentence,
  LawSubitem1Sentence,
  LawSubitem2Sentence,
  LawSubitem3Sentence,
  LawSubitem4Sentence,
  LawSubitem5Sentence,
  LawSubitem6Sentence,
  LawSubitem7Sentence,
  LawSubitem8Sentence,
  LawSubitem9Sentence,
} from "./subitem-sentence";
import { LawColumn } from "./column";
import { LawSupplProvision } from "./suppl-provision";
import { LawArithFormulaNum } from "./arith-formula-num";
import { LawTableHeaderRow } from "./table-header-row";
import { LawTableHeaderColumn } from "./table-header-column";
import { LawNote } from "./note";
import { LawStyle } from "./style";
import { LawFormat } from "./format";
import { LawListSentence } from "./list-sentence";
import { LawSublist1, LawSublist2, LawSublist3 } from "./sublist";
import {
  LawSublist1Sentence,
  LawSublist2Sentence,
  LawSublist3Sentence,
} from "./sublist-sentence";

/**
 * 法令関連のコンポーネント
 * @param {Object} props - プロパティオブジェクト
 * @param {LawTypeList[]} props.lawTypeList - 表示情報
 * @param {string[]} props.treeElement - 法令ツリー要素
 * @returns {JSX.Element} - 法令関連のコンポーネント
 */
export const LawAny: React.FC<{
  lawTypeList: LawTypeList[];
  treeElement: string[];
  parentElement: string;
}> = (props) => {
  const { lawTypeList, treeElement, parentElement } = props;
  const addTreeElement = (index: number) => [
    ...treeElement,
    `${parentElement}_${index}`,
  ];
  let isParagraph = false;
  let paragraphIndex = 0;

  return (
    <>
      {lawTypeList.map((dt, index) => {
        if ("LawTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.LawTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Preamble" in dt) {
          return (
            <LawPreamble
              key={`${addTreeElement(index).join("_")}`}
              preamble={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TOC" in dt) {
          return (
            <LawTOC
              key={`${addTreeElement(index).join("_")}`}
              toc={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Part" in dt) {
          return (
            <LawPart
              key={`${addTreeElement(index).join("_")}`}
              partList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("PartTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.PartTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Chapter" in dt) {
          return (
            <LawChapter
              key={`${addTreeElement(index).join("_")}`}
              chapterList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ChapterTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.ChapterTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Section" in dt) {
          return (
            <LawSection
              key={`${addTreeElement(index).join("_")}`}
              sectionList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("SectionTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.SectionTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subsection" in dt) {
          return (
            <LawSubsection
              key={`${addTreeElement(index).join("_")}`}
              subsectionList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("SubsectionTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.SubsectionTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Division" in dt) {
          return (
            <LawDivision
              key={`${addTreeElement(index).join("_")}`}
              divisionList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("DivisionTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.DivisionTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Article" in dt) {
          return (
            <LawArticle
              key={`${addTreeElement(index).join("_")}`}
              articleList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("SupplNote" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.SupplNote}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Paragraph" in dt) {
          isParagraph = true;
          paragraphIndex++;
          return (
            <LawParagraph
              key={`${addTreeElement(index).join("_")}`}
              paragraphList={[dt]}
              treeElement={addTreeElement(index)}
              parentParagraphIndex={paragraphIndex - 1}
            />
          );
        } else if ("Item" in dt) {
          return (
            <LawItem
              key={`${addTreeElement(index).join("_")}`}
              itemList={[dt]}
              treeElement={addTreeElement(index)}
              isPrecedingParagraph={isParagraph}
            />
          );
        } else if ("Subitem1" in dt) {
          return (
            <LawSubitem1
              key={`${addTreeElement(index).join("_")}`}
              subitem1List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem2" in dt) {
          return (
            <LawSubitem2
              key={`${addTreeElement(index).join("_")}`}
              subitem2List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem3" in dt) {
          return (
            <LawSubitem3
              key={`${addTreeElement(index).join("_")}`}
              subitem3List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem4" in dt) {
          return (
            <LawSubitem4
              key={`${addTreeElement(index).join("_")}`}
              subitem4List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem5" in dt) {
          return (
            <LawSubitem5
              key={`${addTreeElement(index).join("_")}`}
              subitem5List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem6" in dt) {
          return (
            <LawSubitem6
              key={`${addTreeElement(index).join("_")}`}
              subitem6List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem7" in dt) {
          return (
            <LawSubitem7
              key={`${addTreeElement(index).join("_")}`}
              subitem7List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem8" in dt) {
          return (
            <LawSubitem8
              key={`${addTreeElement(index).join("_")}`}
              subitem8List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem9" in dt) {
          return (
            <LawSubitem9
              key={`${addTreeElement(index).join("_")}`}
              subitem9List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem10" in dt) {
          return (
            <LawSubitem10
              key={`${addTreeElement(index).join("_")}`}
              subitem10List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("List" in dt) {
          return (
            <LawList
              key={`${addTreeElement(index).join("_")}`}
              listList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Sentence" in dt) {
          return (
            <LawSentence
              key={`${addTreeElement(index).join("_")}`}
              sentenceList={[dt]}
              treeElement={addTreeElement(index)}
              isPrecedingSentence={
                index > 0 &&
                lawTypeList.slice(0, index).some((dt) => "Sentence" in dt)
              }
            />
          );
        } else if ("AmendProvision" in dt) {
          return (
            <LawAmendProvision
              key={`${addTreeElement(index).join("_")}`}
              amendProvisionList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AppdxTable" in dt) {
          return (
            <LawAppdxTable
              key={`${addTreeElement(index).join("_")}`}
              appdxTableList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AppdxNote" in dt) {
          return (
            <LawAppdxNote
              key={`${addTreeElement(index).join("_")}`}
              appdxNoteList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AppdxStyle" in dt) {
          return (
            <LawAppdxStyle
              key={`${addTreeElement(index).join("_")}`}
              appdxStyle={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Appdx" in dt) {
          return (
            <LawAppdx
              key={`${addTreeElement(index).join("_")}`}
              appdxList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AppdxFig" in dt) {
          return (
            <LawAppdxFig
              key={`${addTreeElement(index).join("_")}`}
              appdxFig={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AppdxFormat" in dt) {
          return (
            <LawAppdxFormat
              key={`${addTreeElement(index).join("_")}`}
              appdxFormat={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("SupplProvisionAppdxStyle" in dt) {
          return (
            <LawSupplProvisionAppdxStyle
              key={`${addTreeElement(index).join("_")}`}
              supplProvisionAppdxStyleList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("SupplProvisionAppdxTable" in dt) {
          return (
            <LawSupplProvisionAppdxTable
              key={`${addTreeElement(index).join("_")}`}
              supplProvisionAppdxTableList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("SupplProvisionAppdx" in dt) {
          return (
            <LawSupplProvisionAppdx
              key={`${addTreeElement(index).join("_")}`}
              supplProvisionAppdxList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TableStruct" in dt) {
          return (
            <LawTableStruct
              key={`${addTreeElement(index).join("_")}`}
              tableStructList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Table" in dt) {
          return (
            <LawTable
              key={`${addTreeElement(index).join("_")}`}
              table={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TableRow" in dt) {
          return (
            <LawTableRow
              key={`${addTreeElement(index).join("_")}`}
              tableRowList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TableColumn" in dt) {
          return (
            <LawTableColumn
              key={`${addTreeElement(index).join("_")}`}
              tableColumnList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("FigStruct" in dt) {
          return (
            <LawFigStruct
              key={`${addTreeElement(index).join("_")}`}
              figStructList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("NoteStruct" in dt) {
          return (
            <LawNoteStruct
              key={`${addTreeElement(index).join("_")}`}
              noteStruct={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("StyleStruct" in dt) {
          return (
            <LawStyleStruct
              key={`${addTreeElement(index).join("_")}`}
              styleStructList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("FormatStruct" in dt) {
          return (
            <LawFormatStruct
              key={`${addTreeElement(index).join("_")}`}
              formatStructList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Remarks" in dt) {
          return (
            <LawRemarks
              key={`${addTreeElement(index).join("_")}`}
              remarksList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("LawBody" in dt) {
          return (
            <LawBodyComponent
              key={`${addTreeElement(index).join("_")}`}
              lawBody={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Fig" in dt) {
          return (
            <LawFig
              key={`${addTreeElement(index).join("_")}`}
              fig={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("EnactStatement" in dt) {
          return (
            <LawEnactStatement
              key={`${addTreeElement(index).join("_")}`}
              enactStatementList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("LawNum" in dt) {
          return (
            <LawNum key={`${addTreeElement(index).join("_")}`} value={dt} />
          );
        } else if ("TOCLabel" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.TOCLabel}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TOCPreambleLabel" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.TOCPreambleLabel}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TOCPart" in dt) {
          return (
            <LawTOCPart
              key={`${addTreeElement(index).join("_")}`}
              tocPartList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TOCChapter" in dt) {
          return (
            <LawTOCChapter
              key={`${addTreeElement(index).join("_")}`}
              tocChapterList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TOCSection" in dt) {
          return (
            <LawTOCSection
              key={`${addTreeElement(index).join("_")}`}
              tocSectionList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TOCSubsection" in dt) {
          return (
            <LawTOCSubsection
              key={`${addTreeElement(index).join("_")}`}
              tocSubsection={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TOCDivision" in dt) {
          return (
            <LawTOCDivision
              key={`${addTreeElement(index).join("_")}`}
              tocDivisionList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TOCArticle" in dt) {
          return (
            <LawTOCArticle
              key={`${addTreeElement(index).join("_")}`}
              tocArticleList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TOCSupplProvision" in dt) {
          return (
            <LawTOCSupplProvision
              key={`${addTreeElement(index).join("_")}`}
              tocSupplProvision={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TOCAppdxTableLabel" in dt) {
          return (
            <LawTOCAppdxTableLabel
              key={`${addTreeElement(index).join("_")}`}
              tocAppdxTableLabelList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ArticleRange" in dt) {
          return (
            <LawArticleRange
              key={`${addTreeElement(index).join("_")}`}
              articleRange={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("MainProvision" in dt) {
          return (
            <LawMainProvision
              key={`${addTreeElement(index).join("_")}`}
              mainProvision={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ArticleTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.ArticleTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ArticleCaption" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.ArticleCaption}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ParagraphCaption" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.ParagraphCaption}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ParagraphNum" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.ParagraphNum}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ParagraphSentence" in dt) {
          return (
            <LawParagraphSentence
              key={`${addTreeElement(index).join("_")}`}
              paragraphSentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AmendProvisionSentence" in dt) {
          return (
            <LawAmendProvisionSentence
              key={`${addTreeElement(index).join("_")}`}
              amendProvisionSentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("NewProvision" in dt) {
          return (
            <LawNewProvision
              key={`${addTreeElement(index).join("_")}`}
              newProvisionList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Class" in dt) {
          return (
            <LawClass
              key={`${addTreeElement(index).join("_")}`}
              classList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ClassTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.ClassTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ClassSentence" in dt) {
          return (
            <LawClassSentence
              key={`${addTreeElement(index).join("_")}`}
              classSentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ItemTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.ItemTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Line" in dt) {
          return (
            <LineNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Ruby" in dt) {
          return (
            <RubyNode key={`${addTreeElement(index).join("_")}`} val={dt} />
          );
        } else if ("Sup" in dt) {
          return (
            <SupNode key={`${addTreeElement(index).join("_")}`} val={dt} />
          );
        } else if ("Sub" in dt) {
          return (
            <SubNode key={`${addTreeElement(index).join("_")}`} val={dt} />
          );
        } else if ("QuoteStruct" in dt) {
          return (
            <LawAny
              key={`${addTreeElement(index).join("_")}`}
              lawTypeList={dt.QuoteStruct}
              treeElement={addTreeElement(index)}
              parentElement="QuoteStruct"
            />
          );
        } else if ("ArithFormula" in dt) {
          return (
            <ArithFormulaNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ItemSentence" in dt) {
          return (
            <LawItemSentence
              key={`${addTreeElement(index).join("_")}`}
              itemSentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem1Title" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.Subitem1Title}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem2Title" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.Subitem2Title}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem3Title" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.Subitem3Title}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem4Title" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.Subitem4Title}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem5Title" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.Subitem5Title}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem6Title" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.Subitem6Title}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem7Title" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.Subitem7Title}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem8Title" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.Subitem8Title}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem9Title" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.Subitem9Title}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem10Title" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.Subitem10Title}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem1Sentence" in dt) {
          return (
            <LawSubitem1Sentence
              key={`${addTreeElement(index).join("_")}`}
              subitem1Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem2Sentence" in dt) {
          return (
            <LawSubitem2Sentence
              key={`${addTreeElement(index).join("_")}`}
              subitem2Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem3Sentence" in dt) {
          return (
            <LawSubitem3Sentence
              key={`${addTreeElement(index).join("_")}`}
              subitem3Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem4Sentence" in dt) {
          return (
            <LawSubitem4Sentence
              key={`${addTreeElement(index).join("_")}`}
              subitem4Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem5Sentence" in dt) {
          return (
            <LawSubitem5Sentence
              key={`${addTreeElement(index).join("_")}`}
              subitem5Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem6Sentence" in dt) {
          return (
            <LawSubitem6Sentence
              key={`${addTreeElement(index).join("_")}`}
              subitem6Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem7Sentence" in dt) {
          return (
            <LawSubitem7Sentence
              key={`${addTreeElement(index).join("_")}`}
              subitem7Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem8Sentence" in dt) {
          return (
            <LawSubitem8Sentence
              key={`${addTreeElement(index).join("_")}`}
              subitem8Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem9Sentence" in dt) {
          return (
            <LawSubitem9Sentence
              key={`${addTreeElement(index).join("_")}`}
              subitem9Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Subitem10Sentence" in dt) {
          return (
            <LawSubitem10Sentence
              key={`${addTreeElement(index).join("_")}`}
              subitem10Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Column" in dt) {
          return (
            <LawColumn
              key={`${addTreeElement(index).join("_")}`}
              columnList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("SupplProvision" in dt) {
          return (
            <LawSupplProvision
              key={`${addTreeElement(index).join("_")}`}
              supplProvision={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("SupplProvisionLabel" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.SupplProvisionLabel}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("SupplProvisionAppdxTableTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.SupplProvisionAppdxTableTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AppdxTableTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.AppdxTableTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("SupplProvisionAppdxStyleTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.SupplProvisionAppdxStyleTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AppdxNoteTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.AppdxNoteTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AppdxStyleTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.AppdxStyleTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AppdxFormatTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.AppdxFormatTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ArithFormulaNum" in dt) {
          return (
            <LawArithFormulaNum
              key={`${addTreeElement(index).join("_")}`}
              arithFormulaNum={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("AppdxFigTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.AppdxFigTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TableStructTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.TableStructTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TableHeaderRow" in dt) {
          return (
            <LawTableHeaderRow
              key={`${addTreeElement(index).join("_")}`}
              tableHeaderRowList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("TableHeaderColumn" in dt) {
          return (
            <LawTableHeaderColumn
              key={`${addTreeElement(index).join("_")}`}
              tableHeaderColumnList={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("FigStructTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.FigStructTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("NoteStructTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.NoteStructTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Note" in dt) {
          return (
            <LawNote
              key={`${addTreeElement(index).join("_")}`}
              note={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("StyleStructTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.StyleStructTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Style" in dt) {
          return (
            <LawStyle
              key={`${addTreeElement(index).join("_")}`}
              style={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("FormatStructTitle" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.FormatStructTitle}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Format" in dt) {
          return (
            <LawFormat
              key={`${addTreeElement(index).join("_")}`}
              format={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("RelatedArticleNum" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.RelatedArticleNum}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("RemarksLabel" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={dt.RemarksLabel}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("ListSentence" in dt) {
          return (
            <LawListSentence
              key={`${addTreeElement(index).join("_")}`}
              listSentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Sublist1" in dt) {
          return (
            <LawSublist1
              key={`${addTreeElement(index).join("_")}`}
              sublist1List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Sublist2" in dt) {
          return (
            <LawSublist2
              key={`${addTreeElement(index).join("_")}`}
              sublist2List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Sublist3" in dt) {
          return (
            <LawSublist3
              key={`${addTreeElement(index).join("_")}`}
              sublist3List={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Sublist1Sentence" in dt) {
          return (
            <LawSublist1Sentence
              key={`${addTreeElement(index).join("_")}`}
              sublist1Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Sublist2Sentence" in dt) {
          return (
            <LawSublist2Sentence
              key={`${addTreeElement(index).join("_")}`}
              sublist2Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("Sublist3Sentence" in dt) {
          return (
            <LawSublist3Sentence
              key={`${addTreeElement(index).join("_")}`}
              sublist3Sentence={dt}
              treeElement={addTreeElement(index)}
            />
          );
        } else if ("_" in dt) {
          return (
            <TextNode
              key={`${addTreeElement(index).join("_")}`}
              val={[dt]}
              treeElement={addTreeElement(index)}
            />
          );
        }
      })}
    </>
  );
};
