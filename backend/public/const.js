"use strict";
/** コンストラクタを宣言するファイルです。 */

/** エラーメッセージ */
const ErrorMessage = {};
/** システムエラーです。管理者に問い合わせてください。 */
ErrorMessage.SYSTEM_ERROR =
  "システムエラーです。管理者に問い合わせてください。";
/** {0}が未入力です。 */
ErrorMessage.IS_EMPTY = "{0}が未入力です。";
/** {0}は{1}型です。 */
ErrorMessage.IS_NOT_TYPE = "{0}は{1}型です。";
/** {0}の入力形式は{1}です。 */
ErrorMessage.IS_NOT_FORMAT = "{0}の入力形式は{1}です。";
/** {0}は時間形式です。 */
ErrorMessage.IS_NOT_TIME_FORMAT = "{0}は時間形式です。";
/** {0}は日付形式です。 */
ErrorMessage.IS_NOT_DATE_FORMAT = "{0}は日付形式です。";
/** {0}は最大{1}文字です。 */
ErrorMessage.IS_OVER_MAX_LENGTH = "{0}は最大{1}文字です。";
/** {0}の入力範囲は{1}です。 */
ErrorMessage.IS_NOT_INPUT_RANGE = "{0}の入力範囲は{1}です。";
/** {0}は存在しない値です。 */
ErrorMessage.IS_NOT_EXISTS = "{0}は存在しない値です。";

/** サクセスメッセージ */
const SuccessMessage = {};
/** {0}の保存が完了しました。 */
SuccessMessage.SAVE_INPPUT = "{0}の保存が完了しました。";

/** 型 */
const Type = {};
/** string型です。 */
Type.STRING = "string";
/** number型です。 */
Type.NUMBER = "number";
/** boolean型です。 */
Type.BOOLEAN = "boolean";
/** object型です。 */
Type.OBJECT = "object";

/** 型 */
const Format = {};
/** 半角英数字のみです。 */
Format.HALF = "半角英数字";
/** 半角英字のみです。 */
Format.HALF_WITH_CHAR = "半角英字";
/** 半角数字のみです。 */
Format.HALF_WITH_NUMBER = "半角数字";

/** テーブルのカラム名 */
const Colum = {};
/** 会社名 */
Colum.COMPANY_NAME = "会社名";
/** 設立 */
Colum.FOUNDATION = "設立";
/** 代表者名 */
Colum.LEADER_NAME = "代表者名";
/** 郵便番号1 */
Colum.POST_NUMBER1 = "郵便番号1";
/** 郵便番号2 */
Colum.POST_NUMBER2 = "郵便番号2";
/** 住所 */
Colum.ADDRESS = "住所";
/** 電話番号1 */
Colum.TEL_NUMBER1 = "電話番号1";
/** 電話番号2 */
Colum.TEL_NUMBER2 = "電話番号2";
/** 電話番号3 */
Colum.TEL_NUMBER3 = "電話番号3";
/** 工種 */
Colum.WORK_TYPE = "工種";
// /** 通常業務時間(開始) */
// Colum.NORMAL_WORK_START_TIME = "通常業務時間(開始)";
// /** 通常業務時間(終了) */
// Colum.NORMAL_WORK_FINISH_TIME = "通常業務時間(終了)";
// /** 時間外業務時間(開始) */
// Colum.EXCEPTION_WORK_START_TIME = "時間外業務時間(開始)";
// /** 時間外業務時間(終了) */
// Colum.EXCEPTION_WORK_FINISH_TIME = "時間外業務時間(終了)";
/** 勤怠開始時間 */
Colum.WORK_START_TIME = "勤怠開始時間";
/** 勤怠終了時間 */
Colum.WORK_FINISH_TIME = "勤怠終了時間";
/** 勤怠時間 */
Colum.WORKING_HOURS = "勤怠時間";
/** 遅刻の発生 */
Colum.TARDY_TIME = "遅刻の発生";
/** 丸め */
Colum.ROUNDING_TIME = "丸め";
/** 丸め(指定) */
Colum.SELECT_ROUNDING_TIME = "丸め(指定)";
/** 切り捨て・切り上げ */
Colum.UP_DOWN_SELECT = "切り捨て・切り上げ";
/** jobNo */
Colum.JOB_NO = "jobNo";
/** 契約ID */
Colum.CONTRACTOR_ID = "契約ID";
/** 社員ID */
Colum.EMPLOYEE_ID = "社員ID";
/** ログインID */
Colum.LOGIN_ID = "ログインID";
/** パスワード */
Colum.PASSWORD = "パスワード";
/** 社員名(姓) */
Colum.EMPLOYEE_FIRST_NAME = "社員名(姓)";
/** 社員名(名) */
Colum.EMPLOYEE_LAST_NAME = "社員名(名)";
/** 会社ID */
Colum.COMPANY_ID = "会社ID";
/** スタッフコード */
Colum.STAFF_CODE = "スタッフコード";
/** 誕生日 */
Colum.BIRTHDAY = "誕生日";
/** 住所 */
Colum.ADDRESS = "住所";
/** 電話番号1 */
Colum.TEL_NUMBER1 = "電話番号1";
/** 電話番号2 */
Colum.TEL_NUMBER2 = "電話番号2";
/** 電話番号3 */
Colum.TEL_NUMBER3 = "電話番号3";
/** 入社日 */
Colum.ENTRY_FIRST_DATE = "入社日";
/** 退社日 */
Colum.ENTRY_END_DATE = "退社日";
/** 雇用形態 */
Colum.EMPLOYMENT = "雇用形態";
/** 取得資格 */
Colum.LICENSE_NAME = "取得資格";
/** 資格取得日 */
Colum.LICENSE_GET_DATE = "資格取得日";
/** 出退勤ID */
Colum.ATTENDANCE_ID = "出退勤ID";
/** 年月日 */
Colum.DAY_OF_YEAR = "年月日";
/** 出勤時間 */
Colum.START = "出勤時間";
/** 退勤時間 */
Colum.END = "退勤時間";
/** 休憩開始時間 */
Colum.REST_START = "休憩開始時間";
/** 休憩終了時間 */
Colum.REST_END = "休憩終了時間";
/** 備考 */
Colum.NOTE_CONTENTS = "備考";
/** 契約形態 */
Colum.CONTACT_STATUS = "契約形態";
/** 協力会社名 */
Colum.SUB_COMPANY_NAME = "協力会社名";
/** 協力会社ID */
Colum.SUB_COMPANY_ID = "協力会社ID";
/** 役職名 */
Colum.POST_NAME = "役職名";
/** 役職ID */
Colum.POST_ID = "役職ID";
/** 出退勤管理権限 */
Colum.ATTENDANCE_AUTH = "出退勤管理権限";
/** 自社員管理権限 */
Colum.OWNWORKER_MANAGE_AUTH = "自社員管理権限";
/** 協力会社管理権限 */
Colum.SUB_COMPANY_MANAGE_AUTH = "協力会社管理権限";
/** 自社設定権限 */
Colum.OWN_COMPANY_MANAGE_AUTH = "自社設定権限";
/** 支払い設定権限 */
Colum.PAY_PLAN_AUTH = "支払い設定権限";
/** 通知ID */
Colum.ALERT_ID = "通知ID";
/** タイトル名 */
Colum.TITLE_NAME = "タイトル名";
/** 送信者ID */
Colum.SENDER_ID = "送信者ID";
/** 送信内容 */
Colum.SEND_DETAIL = "送信内容";
/** 送信日 */
Colum.SEND_DATE = "送信日";
/** 工事件名 */
Colum.WORK_FIELD_DETAIL_NAME = "工事件名";
/** 現場詳細ID */
Colum.WORK_FIELD_DETAIL_ID = "現場詳細ID";
/** 客先名 */
Colum.CLIENT_FIELD_NAME = "客先名";
/** 客先ID */
Colum.CLIENT_FIELD_ID = "客先ID";
/** 工事名 */
Colum.WORK_FIELD_NAME = "現場名";
/** 現場ID */
Colum.WORK_FIELD_ID = "現場ID";
/** 工種名 */
Colum.WORK_TYPE_NAME = "工種名";
/** 工種ID */
Colum.WORK_TYPE_ID = "工種ID";
/** ステータス */
Colum.STATUS = "ステータス";

/** 作成者ID */
Colum.CREATE_USER_ID = "作成者ID";
/** 作成日 */
Colum.CREATE_DATE = "作成日";
/** 更新者ID */
Colum.UPDATE_USER_ID = "更新者ID";
/** 更新日 */
Colum.UPDATE_DATE = "更新日";
/** 削除フラグ */
Colum.DELETE_FLG = "削除フラグ";

module.exports = { ErrorMessage, SuccessMessage, Type, Format, Colum };
