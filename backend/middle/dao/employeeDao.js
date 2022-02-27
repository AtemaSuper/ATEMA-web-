"use strict"

var NCMB = require('ncmb');
var application_key = "c693810d5d59983dad54088877981edd272984c7eb6cf7ddfdb3feb407425f13";
var client_key = "34d5ccb39527f3aef7db0048f4b1fad96ee89a4ec503e7ec35bbdeb06bd68dfd";
var ncmb = new NCMB(application_key, client_key);


/**
 * 従業員テーブルのDaoクラスです。
 */
class EmployeeDao {
  /**
   * ログインIDをもとに従業員を取得します。
   * 
   * @param {string} loginId 
   * 
   * @returns
   */
  selectEmployeeByloginId(loginId, req, res) {
      var Item = ncmb.DataStore('employeeTable');
      Item.fetchAll()
            .then(function(items){
              res.status(200)
                  .json(item);
            })
            .catch(function(err){
              res.status(500)
                  .json(err);
      });
  }
};

module.exports = EmployeeDao;