const express = require('express')
const app = express()
//契約テーブル
const ContactDao = require('../middle/dao/contactDao')
var contactDao = new ContactDao()
//工種テーブル
const WorkTypeDao = require('../middle/dao/workTypeDao')
var workTypeDao = new WorkTypeDao()

/**
 * 自社設定画面のService
 */
//自社設定の情報を取得します。
app.post('/', async function (req, res) {
    var contactResponse = {};
    //契約テーブルから自社情報を取得します。
    await contactDao.selectContactBycontactId(req.body.contactId)
        .then(function (items) {
            contactResponse = items;
            //工種テーブルから工種情報を取得します。
            return workTypeDao.selectWorkTypeAll();
        })
        .then(function (items) {
            var workTypeResponse = items;
            //契約者の工種をレスポンス用に変換します。
            var selectWorkTypeList = [];
            for (var i = 0; i < contactResponse.workTypeIdList.length; i++) {
                var selectWorkType = {};
                var selectWorkTypeId = contactResponse.workTypeIdList[i];
                selectWorkType.workTypeId = selectWorkTypeId;
                selectWorkType.workTypeName = getWorkTypeName(selectWorkTypeId, workTypeResponse);
                selectWorkTypeList.push(selectWorkType);
            }
            //工種情報をレスポンス用に変換します。
            var workTypeList = [];
            for (var j = 0; j < workTypeResponse.length;j++) {
                var workType = {};
                workType.workTypeId = workTypeResponse[j].objectId;
                workType.workTypeName = workTypeResponse[j].workTypeName;
                workTypeList.push(workType);
            }
            //返却用のdata
            var data = {
                address: contactResponse.address,
                contactCompanyName: contactResponse.contactCompanyName,
                exceptionWorkFinishTime: contactResponse.exceptionWorkFinishTime,
                exceptionWorkStartTime: contactResponse.exceptionWorkStartTime,
                normalWorkFinishTime: contactResponse.normalWorkFinishTime,
                normalWorkStartTime: contactResponse.normalWorkStartTime,
                postNumber1: contactResponse.postNumber1,
                postNumber2: contactResponse.postNumber2,
                roundingTime: contactResponse.roundingTime,
                selectRoundingTime: contactResponse.selectRoundingTime,
                tardyTime: contactResponse.tardyTime,
                telNumber1: contactResponse.telNumber1,
                telNumber2: contactResponse.telNumber2,
                telNumber3: contactResponse.telNumber3,
                foundationDay: contactResponse.foundationDay,
                foundationMonth: contactResponse.foundationMonth,
                foundationYear: contactResponse.foundationYear,
                leaderName: contactResponse.leaderName,
                updownSelect: contactResponse.updownSelect,
                selectWorkTypeList: selectWorkTypeList,
                workTypeList: workTypeList,
                errorList: []
            };
            //dataをレスポンスで返却します。
            res.status(200).json(data);
        })
        .catch(function (err) {
            res.status(500).json(err);
        }
        );
})
//自社設定の入力情報を保存します。
app.post('/save', async function (req, res) {
    //エラーチェックを格納します。
    var errorList = ['IDが未設定です。']
    //返却用のdata
    var data = {
        errorList: errorList
    }
    //dataをレスポンスで返却します。
    res.status(200).json(data);
})
//
// privateメソッドです。
//
/**
 * 工種IDをもとに工種名を取得します。
 * 
 * @param {string} workTypeId 工種IDです。
 * @param {object} workTypeResponse 工種のレスポンスデータです。
 * 
 * @private
 * @returns
 */
function getWorkTypeName(workTypeId, workTypeResponse) {
    var worlTypeName = "";
    for (var i = 0; i < workTypeResponse.length;i++) {
        if (workTypeId == workTypeResponse[i].objectId) {
            worlTypeName = workTypeResponse[i].workTypeName;
        }
    }
    return worlTypeName;
}

module.exports = app;

