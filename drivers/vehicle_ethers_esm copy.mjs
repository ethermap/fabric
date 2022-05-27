

var provider 
var wallet
var contract
var methods = { init , pricedBalance  }


// BASIC VEHICLE NEEDS
// symbol 
// network 
// carrier 
// abi 



// https://raw.githubusercontent.com/ethers-io/ethers.js/master/packages/ethers/dist/ethers.esm.js
import * as ethers from './ethers-5.7.esm.js';
import * as abic from './abicache.js'
// importScripts('./outcache.js');    

// INDEXDB KV FOR FILESTORE 
// import { set,get , update,del, clear,keys,values,entries ,createStore } from './../../../web_modules/idb-keyval.js';
// import * as idbkv from './../../../web_modules/idb-keyval.js';
//import { * as ccxt } from './ccxt.browser.js';

addEventListener('message', incomingRequest);

// ALL INBOUND 
function incomingRequest(e) {
    // TODO: Filter incoming extensions double check here 
    var xclass = ('method' in e.data) ? e.data.method : ('fn' in e.data) ? e.data.fn : 'init';
    try {
        methods[xclass](e.data);
    } catch (err) {
        console.log( xclass )
        console.log(' err in ethers vehicle: ', err)
    }
}
// ALL OUTBOUND
function outboundPayload( obj ){

    //var outboundObject = { ...obj , uuid:initObj.uuid }
    var outboundObject = obj; 
    postMessage( outboundObject ); 
}





async function init(obj){ 

    // XClass: dtoken  auto_vehicle: STAK NEEDS: 
    // get contract from symbol 
    // GET CONTRACT FROM SYMBOL OR ADDRESS     
    // Provider ( Service Provider default: Infura EtherScan LocalNode )
    // symbol/address  ( contract address implied ) 
    var network = obj.network ? obj.network : 'ethereum';
    var symbol = obj.symbol; 
    // var addr = abic.networks_symbols[ network ][ symbol ]
    // SELECT PROVIDER AND WALLET CONNECTOR FOR CLIENT  // obj.brand avax.  // networks[ brand ] => 
    // provider = new ethers.providers.EtherscanProvider()
    // provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
    provider = new ethers.providers.InfuraProvider()  //( [ network = "homestead" , [ apiKey ] ] )
    var walletPrivateKey = new ethers.Wallet(obj.se); // D6D5
    wallet = walletPrivateKey.connect( provider );

    // ANY AWAITS WILL SLOW DOWN THE INIT     
    // var addr = abic.networks_symbols[ network ][ symbol ]
    // var zabi = await abic.get( symbol )
    // contract = new ethers.Contract(  addr , zabi , provider );

    var l = 1
};

async function markets(){
    return new Promise( ( resolve, reject ) => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
        .then(res => res.json())
        .then(datObj => {
            var by_symbol = {}
            for ( var i in datObj )
            {
                var curobj = datObj[i];
                by_symbol[ curobj['symbol'] ]=curobj;
            }
            //buildItems( out )
            //var wer = Object.entries( out ).map( ([key, value]) => { return value  })
            var r = 3
            by_symbol['avax']
            resolve( by_symbol ); 
        })
        .catch(err => { 
            // fetch("/data/geckmarv.json")
            // .then(res => res.json())
            // .then(out => {
            //     console.log('Checkout this JSON! ', out)	
            //     buildItems( out )
            // })
            // .catch(err => { 
            //     throw err 
            //     resolve( by_symbol ); 
            // });
            //throw err 
        });
    })    
    
}

//xyzst.frame(carrier,domain,symbol)


async function pricedBalance( obj ){
    
    // console.log( ' balance attempted on ', obj )
    // var addrz = abic.networks_symbols[ 'ethereum' ][ obj.symbol ]
    var addr = await abic.addr( obj.symbol )
    var zabi = await abic.get( obj.symbol )
    contract = new ethers.Contract(  addr , zabi , provider );

    var outObj = obj; // SET OUTBOUND FROM INCOMING ( UUID / )
    outObj.payload = {}
    var sym = await contract.symbol()
    var dec = await contract.decimals()
    var balance = await contract.balanceOf(wallet.address)
    outObj.payload.balance = ethers.utils.formatUnits( balance, dec )
    var mts = await markets()
    var price_obj = mts[ sym.toLocaleLowerCase() ]
    outObj.payload.price = price_obj.current_price
    outboundPayload( outObj )
}


    //var lu = await provider.lookupAddress("0xCF83B1C347C558923860Bd19702D80e86ff81177")
    //var lum = await provider.resolveName("metamap.eth")
    //var lum1 = await provider.resolveName("SHIB.eth")
    //var lum2 = await provider.resolveName("USDT.eth")    
    //var sym = await zContract.symbol()
    //var dec = await zContract.decimals()
    //var balance = await zContract.balanceOf(wallet.address)
    //var balz = ethers.utils.formatUnits( balance, dec )



