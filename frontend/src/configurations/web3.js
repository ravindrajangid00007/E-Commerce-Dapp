const Web3 = require('web3');
import {useState} from 'react';
// set provider for all later instances to use

var jsonInterface = [];
var address = "";


var contract = undefined; ;

async function loadBlockChainData() {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        const web3 = window.web3;
        //load Ecommerce contract

        contract = new web3.eth.Contract(abi, address);
        if (contract !== undefined) {
          return resolve();
        } else {
          return reject("Contract not accessible not current address");
        }
      } else {
        window.alert("Non-ethereum browser , pleases install metamask");
        return reject("Non-ethereum browser , pleases install metamask");
      }
    });
  }


export default contract;