const express = require('express')
const app = express()

//客先テーブル
const ClientFieldDao = require('../middle/dao/clientFieldDao')
var clientFieldDao = new ClientFieldDao()
//工事テーブル
const WorkDao = require('../middle/dao/workDao')
var workDao = new WorkDao()
//現場テーブル
const WorkFieldDao = require('../middle/dao/workFieldDao')
var workFieldDao = new WorkFieldDao()

/**
 * 工事編集画面のService
 */

app.get('/', async function (req, res) {
    var clientieldResponse = {}
    var workResponse = {}
    var workFieldResponse = {}
    //客先テーブルから客先情報を取得します。
    await clientFieldDao.selectClientFieldAll()
        .then(function (items) {
            clientieldResponse = items;
            //工事テーブルから工事情報を取得します。
            return workDao.selectWorkAll();
        })
        .then(function (items) {
            workResponse = items;
            //現場テーブルから工種情報を取得します。
            return workFieldDao.selectWorkFieldAll();
        })
        .then(function (items) {
            var clientFieldList = [];
            var workList = [];
            var workFieldList = [];
            //返却用のdata
            var data = {
                clientFieldList: clientFieldList,
                workList: workList,
                workFieldList: workFieldList,
            };
                //dataをレスポンスで返却します。
                res.status(200).json(data);
            })
        .catch(function (err) {
            res.status(500).json(err);
        }
        );
})

module.exports = app;

