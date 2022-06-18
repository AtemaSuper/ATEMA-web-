"use strict";

/**
 * 共通処理です。
 */
class Util {
  /**
   *
   * 値が未設定か確認します。
   *
   * @param {object} val 判定する値です。
   *
   * @returns {boolean} 判定結果です。
   */
  isEmpty(val) {
    if (!val) {
      if (val !== 0 && val !== false) {
        return true;
      } else if (typeof val == "object") {
        return Object.keys(val).length === 0;
      } else if (typeof val == "string" && val == "undefind") {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * 値が未設定もしくは０か確認します。
   *
   * @param {object} val 判定する値です。
   * @returns
   */
  isEmptyorZero(val) {
    if (this.isEmpty(val)) {
      return true;
    }
    var num = parseInt(val);
    if (isNaN(num)) {
      return false;
    }
    return num == 0;
  }

  /**
   *
   * 時間形式かどうかチェックします。
   *
   * @param {string} val 判定する値です。
   * @returns
   */
  isTime(val) {
    return val.match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/) !== null;
  }

  /**
   *
   * 日付形式かどうかチェックします。
   *
   * @param {string} val 判定する値です。
   * @returns
   */
  isDate(val) {
    //TODO 年-月-日の形式のみ許容する
    return true;
    if (!val.match(/(\d{4})\-(\d{2})\-(\d{2})/)) {
      console.log("dds");
      return false;
    }

    // 日付変換された日付が入力値と同じ事を確認
    // new Date()の引数に不正な日付が入力された場合、相当する日付に変換されてしまうため
    var date = new Date(val);
    if (
      date.getFullYear() != val.split("-")[0] ||
      date.getMonth() != val.split("-")[1] - 1 ||
      date.getDate() != val.split("-")[2]
    ) {
      return false;
    }

    return true;
  }

  /**
   *
   * 半角英数字かどうかチェックします。(空文字〇)
   *
   * @param {string} val 判定する値です。
   * @returns
   */
  isHalf(val) {
    return val.match(/^[0-9a-zA-Z]*$/);
  }

  /**
   *
   * 半角英字かどうかチェックします。(空文字×)
   *
   * @param {string} val 判定する値です。
   * @returns
   */
  isHalfWidthChar(val) {
    return val.match(/^[a-zA-Z]+$/);
  }

  /**
   *
   * 半角数字かどうかチェックします。(空文字×)
   *
   * @param {string} val 判定する値です。
   * @returns
   */
  isHalfWidthNumber(val) {
    return val.match(/^[0-9]+$/);
  }

  /**
   *
   * 型が指定の型かどうかチェックします。
   *
   * @param {string} val 判定する値です。
   * @param {string} type 型です。
   * @returns
   */
  isType(value, type) {
    return typeof value == type;
  }

  /**
   * 指定されたJSファイルを読み込みます。
   *
   * @param {url} pageLocation 読み込むJSファイルのurです。
   */
  appendScript(scripts, scriptClassName) {
    scriptClassName =
      scriptClassName == undefined ? "pagescript" : scriptClassName;

    //TODO おそらく画面固有のJSファイルを消す処理
    // $('script.' + scriptClassName).remove();

    add(0);

    function add(index) {
      if (scripts.length > index) {
        var script = document.createElement("script");
        script.setAttribute("class", scriptClassName);
        script.setAttribute("src", scripts[index]);
        document.head.appendChild(script);
        script.onload = function () {
          add(index + 1);
        };
      }
    }
  }

  /**
   * 文字列をフォーマットします。
   * ※Util.stringFormat('This is {0}.','javascript')
   * 　Util.stringFormat("{id} is id. ",{id:123});
   *
   * @param {string} str フォーマットする文字列です。
   * @param {object} arg 置換する値です。
   *
   * @public
   */
  stringFormat(str, arg) {
    // 置換ファンク
    var rep_fn = undefined;

    // オブジェクトの場合
    if (typeof arg == "object") {
      rep_fn = function (m, k) {
        return arg[k];
      };
    }
    // 複数引数だった場合
    else {
      var args = [];
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
      rep_fn = function (m, k) {
        return args[parseInt(k)];
      };
    }

    return str.replace(/\{(\w+)\}/g, rep_fn);
  }
}
module.exports = Util;
