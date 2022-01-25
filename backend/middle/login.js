const express = require('express')
const app = express()
var jwt = require('jsonwebtoken');
var NCMB   = require('ncmb');
var application_key = "c693810d5d59983dad54088877981edd272984c7eb6cf7ddfdb3feb407425f13";
var client_key = "34d5ccb39527f3aef7db0048f4b1fad96ee89a4ec503e7ec35bbdeb06bd68dfd";
var ncmb = new NCMB(application_key, client_key);


app.post('/', (req, res) => {
    ncmb.User
    .login(req.body.id, req.body.password)
    .then(user => {
      console.log(user);
      const userHash = {
        userName: user.userName,
        objectId: user.objectId,
        mailAddress: user.mailAddress,
        sessionToken: user.sessionToken
      }
      var token= jwt.sign(userHash, 　, {
        expiresIn: '24h'
      });
      res.cookie('token', token);
      res.redirect('/');
    })
  });

  module.exports=app