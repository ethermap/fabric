


var methods = { init  }

var window = {}
import { ethers } from './ethers-5.6.esm.min.js';
//import { ccxt } from './ccxt.browser.js';


addEventListener('message', incomingRequest);

function incomingRequest(e) {
    var xclass = ('method' in e.data) ? e.data.method : ('fn' in e.data) ? e.data.fn : 'init';
    try {
        methods[xclass](e.data);
    } catch (err) {
        console.log( xclass )
        console.log(' err in ethers vehicle: ', err)
    }
}



function init(obj){ 
    console.log(" wow " , obj )
};