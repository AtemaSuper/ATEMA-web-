"use strict";

var NCMB = require("ncmb");
let NCMB_KEY = require("../../ncmb-key");
var ncmb = new NCMB(NCMB_KEY.application_key, NCMB_KEY.client_key);

/**
 * 現場テーブルのDaoクラスです。
 */
class WorkFieldDao {
  /**
   * 現場情報一覧を取得します。
   *
   *
   * @returns
   */
  async selectWorkFieldAll() {
    var Item = ncmb.DataStore("workFieldTable");
    const responce = await Item.fetchAll()
      .then(function (items) {
        return items;
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
    return responce;
  }
}

module.exports = WorkFieldDao;
