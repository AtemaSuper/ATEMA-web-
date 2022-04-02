"use strict";

var NCMB = require("ncmb");
let NCMB_KEY = require("../../ncmb-key");
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);

/**
 * 客先テーブルのDaoクラスです。
 */
class ClientFieldDao {
  /**
   * 客先情報一覧を取得します。
   *
   *
   * @returns
   */
  async selectClientFieldAll() {
    var Item = ncmb.DataStore("clientFieldTable");
    const responce = await Item.equalTo("deleteFlg", false)
      .fetchAll()
      .then(function (items) {
        return items;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
}

module.exports = ClientFieldDao;
