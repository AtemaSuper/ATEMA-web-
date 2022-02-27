const express = require('express')
const app = express()

/**
 * ログイン画面のService
 */
const User = {
    userName: 'AtemAdmin',
    password: '1234',
    objectId: 'R4XlUN8vWVoOEg5J',
    mailAddress: null,
    mailAddressConfirm: null,
    sessionToken: 'Rr6nWkhk8VNgNIT6OOTUgqtZE',
    createDate: '2022-01-20T11:11:19.095Z',
    updateDate: '2022-01-20T11:11:19.110Z',
    authData: null
}

app.get('/', function (req, res) {
    res.send({
        User
    })
})

app.get('/exsamle1', function (req, res) {
    res.send({
        User
    })
})

app.get('/exsamle2', function (req, res) {
    res.send({
        User
    })
})

module.exports = app;

