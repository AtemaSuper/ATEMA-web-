"use strict"

var NCMB = require('ncmb');
let NCMB_KEY = require('../../ncmb-key')
var ncmb = new NCMB(NCMB_KEY.application_key,NCMB_KEY.client_key);


/**
 * 契約テーブルのDaoクラスです。
 */
class ContactDao {
  /**
   * 契約IDをもとに自社情報を取得します。
   * 
   * @param {string} loginId 
   * 
   * @returns
   */
  selectContactBycontactId(req, res) {
      var Item = ncmb.DataStore('contactTable');
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

module.exports = ContactDao;