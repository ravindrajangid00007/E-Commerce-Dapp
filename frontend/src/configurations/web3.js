import Ecommerce from '../Abi/Ecommerce.json';
const Web3 = require('web3');


// load web3
let ecommerce = "";
let address = "";
let balance = "";
const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable()
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    window.alert('Non-ethereum browser , pleases install metamask')
  }
}

const loadBlockChainData = async () => {
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  console.log("accounts 0", accounts[0]);
  address = accounts[0];
  balance = await web3.eth.getBalance(address);
  console.log("balance", balance);
  //load ecommerce contract
  const abi = Ecommerce.abi;
  const networkId = await web3.eth.net.getId();
  
  ecommerce = new web3.eth.Contract(abi, "0x098eD50e0eCf3e57db629D6C5c1e42547721862d");
  console.log("ecommerce" , ecommerce);

}


loadWeb3();
loadBlockChainData();
const user = "";

export const checkBuyerPresent = async () => {
  console.log("ecommer at checkBuyerPresent" , ecommerce);
  const res = await ecommerce.methods._isOldBuyer().call({from: address });
  console.log("checkBuyerPresent" , res);
  return res;
}

export const addBuyer = async (name, delAdd) => {
  console.log("name" , name);
  console.log("delAdd" , delAdd);
  console.log("meta" , address)
  ecommerce.methods.addBuyer(name, delAdd).send({ from: address })
    .on('receipt', (r) => {
      console.log(r.events.BuyerAdded.returnValues.name);
      return true;
    })
    .on('error', function (error, receipt) {
      console.log(error)
      return false;
    });
}

export const checkSellerPresent = async () => {
  console.log('checking for seller');
  const res = await ecommerce.methods.isOldSeller().call({ from: address })
  console.log("checking for seller" , res);
  return res;
}

export const addSeller = async (name) => {
  ecommerce.methods.addSeller(name).send({ from: address })
    .on('receipt', (r) => {
      console.log(r.events.SellerAdded.returnValues.name);
      return true;
    }).on('error', function (error, receipt) {
      console.log(error)
      return false;
    });
}



export  { ecommerce , address };