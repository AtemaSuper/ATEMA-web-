"use strict"

var NCMB = require('ncmb');
let NCMB_KEY = require('../../ncmb-key')
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);


/**
 * 契約テーブルのDaoクラスです。
 */
class ContactDao {
  /**
   * 契約IDをもとに自社情報を取得します。
   * 
   * @param {string} contactId 契約IDです。 
   * 
   * @returns
   */
  async selectContactBycontactId(contactId) {
    var Item = ncmb.DataStore('contactTable');
    const responce = await Item.fetchById(contactId)
      .then(function (items) {
        return items
      })
      .catch(function (err) {
        res.status(500)
          .json(err);
      });
    return responce;
  }

  /**
   * 入力情報をもとに自社情報を保存します。
   * 
   * @param {object} param 
   * @returns 
   */
  async updateContact(param) {
    //基本情報で入力した内容を保存します。
    if (param.pageContents == 1) {
      var Item = ncmb.DataStore('contactTable');
      const responce = await Item.equalTo("objectId", param.objectId)
        .fetch()
        .then(function (results) {
          results.set("ownCompanyName", param.ownCompanyName)
            .set("foundationYear", param.foundationYear)
            .set("foundationMonth", param.foundationMonth)
            .set("foundationDay", param.foundationDay)
            .set("leaderName", param.leaderName)
            .set("postNumber1", param.postNumber1)
            .set("postNumber2", param.postNumber2)
            .set("address", param.address)
            .set("telNumber1", param.telNumber1)
            .set("telNumber2", param.telNumber2)
            .set("telNumber3", param.telNumber3)
            .set("selectWorkTypeList", param.selectWorkTypeList)
          return results.update()
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ['自社設定(基本情報)を保存しました。']
          };
          return data
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
      return responce;
    //勤怠情報で入力した内容を保存します。
    } else {
      var Item = ncmb.DataStore('contactTable');
      const responce = await Item.equalTo("objectId", param.objectId)
        .fetch()
        .then(function (results) {
          results.set("normalWorkStartTime", param.normalWorkStartTime)
            .set("normalWorkFinishTime", param.normalWorkFinishTime)
            .set("exceptionWorkStartTime", param.exceptionWorkStartTime)
            .set("exceptionWorkFinishTime", param.exceptionWorkFinishTime)
            .set("tardyTime", param.tardyTime)
            .set("roundingTime", param.roundingTime)
            .set("selectRoundingTime", param.selectRoundingTime)
            .set("updownSelect", param.updownSelect)
          return results.update()
        })
        .then(function () {
          var data = {
            checkResult: true,
            messageList: ['自社設定(勤怠情報)を保存しました。']
          };
          return data
        })
        .catch(function (err) {
          res.status(500).json(err);
        });
      return responce;
    }
  }
};

module.exports = ContactDao;