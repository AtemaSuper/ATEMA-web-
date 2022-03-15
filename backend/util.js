"use strict"
//共通で使う処理を記述します。

var Util = {

    /**
     * 
     * 値が未設定か確認します。
     * 
     * @param {object} val 判定する値です。
     * 
     * @returns {boolean} 判定結果です。
     */
    isEmpty: function (val) {
        if (!val) {
            if (val !== 0 && val !== false) {
                return true;
            }
            else if (typeof val == "object") {
                return Object.keys(val).length === 0;
            }
            else if (typeof val == "string" && val == "undefind") {
                return true;
            }
        }
        return false;
    },

    /**
     * 
     * 値が未設定もしくは０か確認します。
     * 
     * @param {object} val 判定する値です。
     * @returns 
     */
    isEmptyorZero: function (val) {
        if (this.isEmpty(val)) {
            return true;
        }
        var num = parseInt(val);
        if (isNaN(num)) {
            return false;
        }

        return num == 0;
    },
    /**
     * 指定されたJSファイルを読み込みます。
     * 
     * @param {url} pageLocation 読み込むJSファイルのurです。
     */
    appendScript: function(scripts, scriptClassName) {
        scriptClassName = 
            scriptClassName == undefined ? 'pagescript' : scriptClassName;
        
        //TODO おそらく画面固有のJSファイルを消す処理
        // $('script.' + scriptClassName).remove();

        add(0);

        function add(index) {
            if(scripts.length > index) {
                var script = document.createElement('script');
                script.setAttribute('class', scriptClassName);
                script.setAttribute('src', scripts[index]);
                document.head.appendChild(script);
                script.onload = function () {
                    add(index + 1);
                }
            }
        }
    }
};