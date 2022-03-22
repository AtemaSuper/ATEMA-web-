"use strict"

// var NCMB = require('ncmb');
// let NCMB_KEY = require('../../ncmb-key')
// var ncmb = new NCMB(NCMB_KEY.application_key,NCMB_KEY.client_key);
//共通Logic
const CommonLogic = require('../logic/commonLogic')
var commonLogic = new CommonLogic()


/**
 * 自社設定のLogicクラスです。
 */
class OwnCompanyLogic {
    /**
     * 自社設定の入力情報をチェックします。
     * 
     * @param {string} param 画面パラメータです。 
     * 
     * @returns
     */
    checkInputData(param) {
        var errorMessageList = [];
        //基本情報の入力チェックを行います。
        if(param.pageContents == 1) {
            //会社名チェック
            errorMessageList = checkOwnCompanyName(errorMessageList, param.ownCompanyName);
            // //設立(年)チェック
            // errorMessageList = checkFoundationYear(errorMessageList, param.foundationYear);
            // //設立(月)チェック
            // errorMessageList = checkFoundationMonth(errorMessageList, param.foundationMonth);
            // //設立(日)チェック
            // errorMessageList = checkFoundationDay(errorMessageList, param.foundationDay);
            // //代表者名チェック
            // errorMessageList = checkLeaderName(errorMessageList, param.leaderName);
            // //郵便番号前3桁チェック
            // errorMessageList = checkPostNumber1(errorMessageList, param.postNumber1);
            // //郵便番号後4桁チェック
            // errorMessageList = checkPostNumber2(errorMessageList, param.postNumber2);
            // //住所チェック
            // errorMessageList = checkAddress(errorMessageList, param.address);
            // //電話番号1チェック
            // errorMessageList = checkTelNumber1(errorMessageList, param.telNumber1);
            // //電話番号2チェック
            // errorMessageList = checkTelNumber2(errorMessageList, param.telNumber2);
            // //電話番号3チェック
            // errorMessageList = checkTelNumber3(errorMessageList, param.telNumber3);
            // //工種チェック
            // errorMessageList = checkSelectWorkTypeList(errorMessageList, param.selectWorkTypeList);
        //勤怠情報の入力チェックを行います。
        }else{
            // //通常業務時間(開始)チェック
            // errorMessageList = checkNormalWorkStartTime(errorMessageList, param.normalWorkStartTime);
            // //通常業務時間(終了)チェック
            // errorMessageList = checkNormalWorkFinishTime(errorMessageList, param.normalWorkFinishTime);
            // //時間外業務時間(開始)チェック
            // errorMessageList = checkExceptionWorkStartTime(errorMessageList, param.exceptionWorkStartTime);
            // //時間外業務時間(終了)チェック
            // errorMessageList = checkExceptionWorkFinishTime(errorMessageList, param.exceptionWorkFinishTime);
            // //遅刻の発生チェック
            // errorMessageList = checkTardyTime(errorMessageList, param.tardyTime);
            // //丸めチェック
            // errorMessageList = checkRoundingTime(errorMessageList, param.roundingTime);
            // //丸め(指定)チェック
            // errorMessageList = checkSelectRoundingTime(errorMessageList, param.selectRoundingTime);
            // //切り捨て・切り上げチェック
            // errorMessageList = checkUpdownSelect(errorMessageList, param.updownSelect);
        }
        var data = {};
        //エラーがある場合
        if(!commonLogic.isEmpty(errorMessageList)){
            data = {
                checkResult: false,
                messageList: errorMessageList
            };
        }
        return data
    }
};
/**
 * 入力した会社名をチェックします。
 * 
 * @param {object} errorMessageList 
 * @param {string} value 
 */
function checkOwnCompanyName(errorMessageList, value){
    if(commonLogic.isEmpty(value)){
        errorMessageList.push("会社名が未入力です。");
    }
}

module.exports = OwnCompanyLogic;