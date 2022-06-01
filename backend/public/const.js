"use strict";
/** コンストラクタを宣言するファイルです。 */

/** エラーメッセージ */
const ErrorMessage = {};
/** {0}が未入力です。 */
ErrorMessage.IS_EMPTY = "{0}が未入力です。";

/** サクセスメッセージ */
const SuccessMessage = {};
/** {0}の保存が完了しました。 */
SuccessMessage.SAVE_INPPUT = "{0}の保存が完了しました。";

/** テーブルのカラム名 */
const Colum = {};
/** 会社名 */
Colum.COMPANY_NAME = "会社名";

module.exports = { ErrorMessage, SuccessMessage, Colum };
