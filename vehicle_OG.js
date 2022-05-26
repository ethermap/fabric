










// inboundMessage 
// outboumdMessage 

// function toWorker()
// function fromWorker() 











importScripts('/v_modules/ccxt.browser.js');       // CEFI 
importScripts('/v_modules/ethers-5.1.umd.min.js'); // DEFI 


// import ethers from '/v_modules/ethers-5.1.esm.min.js';
//importScripts('/v_modules/polygon.v.u.js')       // TRAD
const usdt_address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const usdc_address = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';    
const wbtc_address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
const dai_address = '0x6b175474e89094c44da98b954eedeac495271d0f';
const uni_address = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';
const weth_address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const usdt_whale_address = '0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503';
const usdc_whale_address = '0x0a59649758aa4d66e25f08dd01271e891fe52199';
const wbtc_whale_address = '0xccf4429db6322d5c611ee964527d42e5d685dd6a';
const dai_whale_address = '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643';
const uni_whale_address = '0x1a9c8182c09f50c8318d769245bea52c32be35bc';
const weth_whale_address = '0x030ba81f1c18d280636f32af80b9aad02cf0854e';

// import ethers from '/v_modules/ethers-5.1.esm.min.js';
// importScripts('/v_modules/polygon.v.u.js')       // TRAD
 

var cons ={

    uniswap: uni_address,
    
}

var tick ={ returned:'dat'}
var messageStruct = {
    fn:'fetchTicker',
    obj:tick , 
    domain:this.domain
}
var routes = {
    'init':init
}
var wid = 'w'+ Math.round( Math.random()*9999 );
var access_count = 0;


onmessage = function(e) {
    console.log('Worker: '+ wid+' Receives Message Data:', e.data );
    routes[ e.data.fn ]( e.data );
}




// CALLBACK REPEAT 
var intervalID = setInterval(myCallback, 3500, 'Parameter 1', 'Parameter 2');
async function myCallback(a, b)
{


}


async function init( obj ){
    console.log( ' init in Worker: ', wid , this , self );
    if ( obj.domain == 'ethereum'){
        provider = new ethers.providers.AlchemyProvider();
        provider.getBlockNumber().then( async (result) => {   console.log("Current block number: " + result);     });
        // USDT
        var tether_abi = await fetchAbi( usdt_address );
        var usdt = new ethers.Contract( usdt_address , tether_abi  );
        var dec = await usdt.connect( provider ).decimals()
        var whalbal = await usdt.connect( provider ).balanceOf( usdt_whale_address )
        var a = 34;            
        postMessage( { block:whalbal  , last:whalbal , domain:'ethereum' , symbol:'ETH/USD'} );
        
    }else{
        var veh = ccxt[ obj.domain ]
        var v = new veh();
        v.fetchTicker('BTC/USD').then( function( tick ){
            tick.domain = obj.domain;
            tick.symbol='BTC/USD';
            postMessage( tick );    
        });
    }
}




async function fetchAbi( addr_in ){
    var prom = new Promise( async ( resolve, reject ) => {
        var esk = '6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2';
        var url = "https://api.etherscan.io/api?module=contract&action=getabi&address="+addr_in+"&apikey=6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2";
        var options = {json: true};
        const response = await fetch( url );
        const ab = await response.json();
        resolve( ab.result )
    });
    return prom;
}




/*


postMessage( tick );
if( pingcount > 3 ){
    close();
}else
{
    pingcount++;
}


urllib.request( url , function (err, data, res) {
    if (err) { throw err; }  // error 
    //console.log(res.statusCode);
    //console.log(res.headers);
    //console.log(data.toString()); // data is Buffer instance
    //console.log('abi loaf status:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body);
    var abi_obj = JSON.parse( data );
    resolve( JSON.parse( abi_obj.result ) ); //  
}) 
*/