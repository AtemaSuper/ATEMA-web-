"use strict"

var NCMB = require('ncmb');
let NCMB_KEY = require('../../ncmb-key')
var ncmb = new NCMB(NCMB_KEY.application_key,NCMB_KEY.client_key);


/**
 * 協力会社テーブルのDaoクラスです。
 */
class SubCompanyDao {
  /**
   * ログインIDをもとに従業員を取得します。
   * 
   * @param {string} loginId 
   * 
   * @returns
   */
  selectEmployeeByloginId(req, res) {
      var Item = ncmb.DataStore('employeeTable');
      Item.fetchAll()
            .then(function(items){
              res.status(200)
                  .json(items);
            })
            .catch(function(err){
              res.status(500)
                  .json(err);
      });
  }
};

module.exports = SubCompanyDao;