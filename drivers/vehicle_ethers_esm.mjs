

var provider 
var wallet
var contract
var methods = { init , balance  }


// BASIC VEHICLE NEEDS
// symbol 
// network 
// carrier 
// abi 



//https://raw.githubusercontent.com/ethers-io/ethers.js/master/packages/ethers/dist/ethers.esm.js
import * as ethers from './ethers-5.6.esm.js';
//import { get } from './abicache.js'
import * as abic from './abicache.js'


// INDEXDB KV FOR FILESTORE 
// import { set,get , update,del, clear,keys,values,entries ,createStore } from './../../../web_modules/idb-keyval.js';
// import * as idbkv from './../../../web_modules/idb-keyval.js';
//import { * as ccxt } from './ccxt.browser.js';

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





async function init(obj){ 

    // XClass: dtoken  auto_vehicle: STAK NEEDS: 
    // get contract from symbol 
    // GET CONTRACT FROM SYMBOL OR ADDRESS     
    // Provider ( Service Provider default: Infura EtherScan LocalNode )
    // symbol/address  ( contract address implied ) 
    var network = obj.network ? obj.network : 'ethereum';
    var symbol = obj.symbol ; 
    var addr = abic.networks_symbols[ network ][ symbol ]
    //// SELECT PROVIDER AND WALLET CONNECTOR FOR CLIENT  // obj.brand avax.  // networks[ brand ] => 
    //provider = new ethers.providers.EtherscanProvider()
    //provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
    provider = new ethers.providers.InfuraProvider()  //( [ network = "homestead" , [ apiKey ] ] )
    var walletPrivateKey = new ethers.Wallet(obj.se); // D6D5
    wallet = walletPrivateKey.connect( provider );

    // IDEAL: 
    abic.get( symbol )
    var lu = await provider.lookupAddress("0xCF83B1C347C558923860Bd19702D80e86ff81177")
    var lum = await provider.resolveName("metamap.eth")
    var lum1 = await provider.resolveName("SHIB.eth")
    var lum2 = await provider.resolveName("USDT.eth")
    
    var zabi = await abic.get( symbol )
    var zContract = new ethers.Contract(  addr , zabi , provider );
    
    var sym = await zContract.symbol()
    var dec = await zContract.decimals()
    var balance = await zContract.balanceOf(wallet.address)
    var balz = ethers.utils.formatUnits( balance, dec )
    var l = 1
};


function balance( obj ){
    console.log( ' balance attempted on ', obj )
    console.log( ethers )
}