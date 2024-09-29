import { LawAny } from "@/components/law/any";
import { getType } from "@/lib/law/law";
import {
  ArithFormulaType,
  LineType,
  RtType,
  RubyType,
  SubType,
  SupType,
  TextNodeType,
  TextType,
} from "@/types/law";

/**
 * テキストノードのコンポーネント
 * @param {Array<TextNodeType>} props.val - 表示情報
 * @param {string[]} props.treeElement - 法令ツリー要素
 * @returns {JSX.Element} - 法令関連のコンポーネント
 */
export const TextNode = (props: {
  val: Array<TextNodeType>;
  treeElement?: string[];
}) => {
  const { val, treeElement = [] } = props;

  const addTreeElement = (
    type: "Line" | "Ruby" | "Sup" | "Sub" | "QuoteStruct" | "ArithFormula",
    index: number
  ) => [...treeElement, `${type}_${index}`];

  return (
    <>
      {val.map((dt, index) => {
        if ("Line" in dt) {
          return (
            <LineNode
              key={`${addTreeElement("Line", index).join("_")}`}
              val={dt}
              treeElement={addTreeElement("Line", index)}
            />
          );
        } else if ("Ruby" in dt) {
          return (
            <RubyNode
              key={`${addTreeElement("Ruby", index).join("_")}`}
              val={dt}
            />
          );
        } else if ("Sup" in dt) {
          return (
            <SupNode
              key={`${addTreeElement("Sup", index).join("_")}`}
              val={dt}
            />
          );
        } else if ("Sub" in dt) {
          return (
            <SubNode
              key={`${addTreeElement("Sub", index).join("_")}`}
              val={dt}
            />
          );
        } else if ("QuoteStruct" in dt) {
          return (
            <LawAny
              key={`${addTreeElement("QuoteStruct", index).join("_")}`}
              lawTypeList={dt.QuoteStruct}
              treeElement={addTreeElement("QuoteStruct", index)}
              parentElement="QuoteStruct"
            />
          );
        } else if ("ArithFormula" in dt) {
          return (
            <ArithFormulaNode
              key={`${addTreeElement("ArithFormula", index).join("_")}`}
              val={dt}
              treeElement={addTreeElement("ArithFormula", index)}
            />
          );
        } else {
          return dt._;
        }
      })}
    </>
  );
};

/**
 * 傍線のコンポーネント
 * @param {LineType} props.val - 表示情報
 * @param {string[]} props.treeElement - 法令ツリー要素
 * @returns {JSX.Element} - 傍線のコンポーネント
 */
export const LineNode = (props: { val: LineType; treeElement: string[] }) => {
  const { val, treeElement = [] } = props;
  const getLineStyle = (
    Style?: "dotted" | "double" | "none" | "solid"
  ): React.CSSProperties => {
    switch (Style) {
      case undefined:
        return {
          textDecorationLine: "underline",
          textDecorationStyle: "solid",
        };
      case "none":
        return {
          textDecorationLine: "none",
        };
      default:
        return {
          textDecorationLine: Style,
          textDecorationStyle: "solid",
        };
    }
  };

  return (
    <span style={getLineStyle(val.Style)}>
      <TextNode val={val.Line} treeElement={treeElement} />
    </span>
  );
};

/**
 * ルビ構造のコンポーネント
 * @param {RubyType} props.val - 表示情報
 * @returns {JSX.Element} - ルビ構造のコンポーネント
 */
export const RubyNode = ({ val }: { val: RubyType }) => {
  return (
    <ruby>
      {getType<TextType>(val.Ruby, "_")[0]._}
      <rt>{getType<RtType>(val.Ruby, "Rt")[0].Rt[0]._}</rt>
    </ruby>
  );
};

/**
 * 上付き⽂字のコンポーネント
 * @param {SupType} props.val - 表示情報
 * @returns {JSX.Element} - 上付き⽂字のコンポーネント
 */
export const SupNode = ({ val }: { val: SupType }) => {
  return <sup className="Sup">{getType<TextType>(val.Sup, "_")[0]._}</sup>;
};

/**
 * 下付き⽂字のコンポーネント
 * @param {SubType} props.val - 表示情報
 * @returns {JSX.Element} - 下付き⽂字のコンポーネント
 */
export const SubNode = ({ val }: { val: SubType }) => {
  return <sub className="Sub">{getType<TextType>(val.Sub, "_")[0]._}</sub>;
};

/**
 * 算式のコンポーネント
 * @param {ArithFormulaType} props.val - 表示情報
 * @param {string[]} props.treeElement - 法令ツリー要素
 * @returns {JSX.Element} - 算式のコンポーネント
 */
export const ArithFormulaNode = (props: {
  val: ArithFormulaType;
  treeElement: string[];
}) => {
  const { val, treeElement = [] } = props;
  return (
    <div className="pl-4">
      <LawAny
        lawTypeList={val.ArithFormula}
        treeElement={treeElement}
        parentElement="ArithFormula"
      />
    </div>
  );
};
