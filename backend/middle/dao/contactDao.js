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
   * @param {string} contactId 契約IDです。 
   * 
   * @returns
   */
  async selectContactBycontactId(contactId) {
    var Item = ncmb.DataStore('contactTable');
    const responce = await Item.fetchById(contactId)
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

module.exports = ContactDao;