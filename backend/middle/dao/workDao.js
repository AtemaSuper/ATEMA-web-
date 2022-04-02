"use strict"

var NCMB = require('ncmb');
let NCMB_KEY = require('../../ncmb-key')
var ncmb = new NCMB(NCMB_KEY.application_key,NCMB_KEY.client_key);


/**
 * 工事テーブルのDaoクラスです。
 */
class WorkDao {
  /**
   * 工事情報一覧を取得します。
   * 
   * 
   * @returns
   */
  async selectWorkAll() {
    var Item = ncmb.DataStore('workTable');
    const responce = await Item.fetchAll()
          .then(function(items){
            return items
          })
          .catch(function(err){
            res.status(500)
                .json(err);
    });
    return responce;
  }
};

module.exports = WorkDao;