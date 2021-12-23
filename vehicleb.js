
//BaseContract,BigNumber,Contract,
//       ContractFactory,FixedNumber,Signer,
//       VoidSigner,Wallet,Wordlist 
//var window={}
import validator from '../util/validator.js';
//import * as ethers from '../../v_modules/ethers-5.1.esm.min.js';
//import { ethers } from "../../v_modules/ethers-5.2.esm.min.js";
import { ethers } from "../../web_modules/ethers.js";
//import { ccxt } from "../../web_modules/ccxt.js";

onmessage = function( ob ){
    var ttt= validator.inspect(ob);
    console.log( ob )
}