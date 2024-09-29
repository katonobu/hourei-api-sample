/* tslint:disable */
/* eslint-disable */
/**
 * 法令APIプロトタイプ
 * <h2>概要</h2> 法令データを取得・検索するための機能をHTTP API方式で提供しています。  <h2>キー要素の解説</h2> 本API（各種エンドポイント）を扱う上で重要な要素について解説します。</br>  * 法令ID（`law_id`）</br> 法令を一意に特定するためのIDです。  * 法令履歴ID（`law_revision_id`）</br> 法令履歴を一意に特定するためのIDです。</br> 法令文書は改正を重ねることで、改版履歴のような版数を持ちます。</br> この版数（法令履歴）を特定するためのIDとなります。  <h2>時点について</h2> 法令APIプロトタイプでは、各法令の過去時点のデータ検索や取得が可能です。</br> 時点指定（`asof`）パラメータを用いることで指定日付時点で有効な法令履歴の特定に役立ちます。  <h2>各エンドポイントの相関性</h2> 各エンドポイントの詳細な説明については、本仕様書で後述されていますのでそちらを参照願います。</br></br> 法令一覧取得API（`/laws`）やキーワード検索API（`/keyword`）を用いて法令を検索し、法令（法令履歴）IDの取得が可能です。</br> その上で法令（法令履歴）単位で以下のようなデータを取得可能です。</br> </br> 法令履歴一覧取得API（`/law_revisions`）：法令履歴（改正履歴）情報を取得</br> 法令本文取得API（`/lawdata`）：法令本文データを取得</br> 添付ファイル取得API（`/attached`）：法令本文に関連する添付ファイルを取得</br></br> ※今回、試験的に法令本文データを別形式（docxなど）にコンバートしたファイルを取得するための法令本文ファイル取得API（`/lawfile`）というエンドポイントを新たに提供しておりますが、こちらも上述のように法令（法令履歴）IDを用いてデータ取得します。</br>  <h2>注意事項</h2> * 本プロトタイプは、一時的な試験提供ですので、実際のシステムへの組み込み等についてはお控えください。実際のサービス提供への活用を頂くには、正式提供している<a href=\"https://elaws.e-gov.go.jp/apitop/\" target=\"_blank\">現行の法令API</a>、もしくは今後検討している高度化後の法令APIをご利用頂く必要があることにご留意ください。  * 使用するデータは、テスト用データのため、一部含まれない法令や、法令標準XMLスキーマには無い属性や項目が含まれていることがあります。  * 本環境はサーバーメンテナンスを行うことがあり、メンテナンス中はご利用がいただけない事があります。また、API仕様についても、テスト期間中に変更される可能性がありますので、ご了承ください。 
 *
 * The version of the OpenAPI document: 2.1.101
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 法令種別:
 *   * `Constitution`         - 憲法
 *   * `Act`                  - 法律
 *   * `CabinetOrder`         - 政令
 *   * `ImperialOrder`        - 勅令
 *   * `MinisterialOrdinance` - 府省令
 *   * `Rule`                 - 規則
 *   * `Misc`                 - その他
 * @export
 */
export const LawType = {
    Constitution: 'Constitution',
    Act: 'Act',
    CabinetOrder: 'CabinetOrder',
    ImperialOrder: 'ImperialOrder',
    MinisterialOrdinance: 'MinisterialOrdinance',
    Rule: 'Rule',
    Misc: 'Misc'
} as const;
export type LawType = typeof LawType[keyof typeof LawType];


export function LawTypeFromJSON(json: any): LawType {
    return LawTypeFromJSONTyped(json, false);
}

export function LawTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): LawType {
    return json as LawType;
}

export function LawTypeToJSON(value?: LawType | null): any {
    return value as any;
}

