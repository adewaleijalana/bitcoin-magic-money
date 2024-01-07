const express = require("express");
const router = express.Router();
var request = require("request");

const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const headers = {
  "content-type": "text/plain;"
};

router.get('/getblockchaininfo', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockchaininfo","params":[]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:18443/`,
    method: "POST",
    headers: headers,
    body: dataString
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      console.log('data: ', data)
      res.send(data);
    }
  };
  request(options, callback);
})

router.get('/listunspent', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"listunspent","params":[]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:18443/`,
    method: "POST",
    headers: headers,
    body: dataString
  };

  callback = (error, response, body) => {
    let totalAmount = 0
    let txns = []
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      // console.log('result: ', data.result)
      data.result.forEach(element => {
        totalAmount += element.amount
        let txn = {
          txid: element.txid,
          address: element.address,
          amount: element.amount
        }
        txns.push(txn)
      });
      console.log('total unspent: ', totalAmount)
      res.send({
        'txns': txns,
        'noOfUnspent': data.result.length,
        'totalUnspent': totalAmount
      });
    }
  };
  request(options, callback);

})

module.exports = router;

//65590ea7812c3c48206da9f3

//65608529844cb04c60a4cba8