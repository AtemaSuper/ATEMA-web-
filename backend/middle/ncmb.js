var NCMB = require('ncmb');
var application_key = "c693810d5d59983dad54088877981edd272984c7eb6cf7ddfdb3feb407425f13";
var client_key = "34d5ccb39527f3aef7db0048f4b1fad96ee89a4ec503e7ec35bbdeb06bd68dfd";
var ncmb = new NCMB(application_key, client_key);
// クラスの新しいインスタンスを生成


const express = require('express')
const app = express()

app.post('/', function (req, res) {
    var TestClass = ncmb.DataStore('alertTable');
    var item = TestClass
    .fetchById("objectId")
    .then(item => {
        console.log('データあり');
    })
    .catch(e => {
        console.log('データなし');
    });
})

module.exports = app;


