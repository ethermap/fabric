


var methods = { init , balance  }


// BASIC VEHICLE NEEDS
// symbol 
// network 
// carrier 
// abi 



//https://raw.githubusercontent.com/ethers-io/ethers.js/master/packages/ethers/dist/ethers.esm.js
import * as ethers from './ethers-5.6.esm.js';
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


function balance( obj ){


    console.log( ' balance attempted on ', obj )
    console.log( ethers )
}