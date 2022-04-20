
// OLD SCHOOL IMPORTS 
importScripts('/v_modules/ethers-5.1.umd.min.js');




// ETHES 
// brand e.g. Uniswap 
// contract_address 

// LOCALS OLD SCHOOL 
var methods = {
    'init':init ,
    'base':init,
    'close':init,
    'spawn':init
}
var wid = 'w'+ Math.round( Math.random()*9999 );
var access_count = 0;

var initObj;
var provider = new ethers.providers.AlchemyProvider();

// ALL INCOMING MESSAGES ROUTED
onmessage = incomingRequest;
function incomingRequest( e ){
    var xclass = ( 'method' in e.data ) ? e.data.method : ( 'fn' in e.data )? e.data.fn : 'init';
    try {
        methods[ xclass ]( e.data );
    }catch( err ){
        console.log(' err in ethers vehicle: ', err)
    }
  
}



async function init( obj ){
    console.log( ' init in Worker: ', wid , this , self );
    postMessage( { met:'report' ,  wid:wid ,  domain:'ethers' } );

    
    //provider.getBlockNumber().then( async (result) => {   console.log("Current block number: " + result);     });
    // USDT
    //var the_abi = await fetchAbi( cons[obj['carrier']] );
    //var cont = new ethers.Contract( cons[obj['carrier']] , the_abi  );
    //var dec = await usdt.connect( provider ).decimals()

    // console.log(returnMethods(cont));

    //var pm= await getPoolImmutables();
    
    // CALLBACK REPEAT 
    // var intervalID = setInterval( myCallback, 3500, 'Parameter 1', 'Parameter 2');
    // async function myCallback(a, b)
    // {
    //     console.log(' worker: ', wid, self.hostname )
    //     var whalbal = await cont.connect( provider ).balanceOf( uni_whale_address )
    //     var blocknum = await  provider.getBlockNumber();
    //     postMessage( { met:'block' ,  block:blocknum  , last:whalbal , domain:'ethereum' , symbol:'ETH/USD'} );
    // }
}


const returnMethods = (obj = {}) => {
   const members = Object.getOwnPropertyNames(obj);
   const methods = members.filter(el => {
      return typeof obj[el] === 'function';
   })
   return methods;
};



async function fetchAbi( addr_in ){
    var prom = new Promise( async ( resolve, reject ) => {
        var esk = '6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2';
        var url = "https://api.etherscan.io/api?module=contract&action=getabi&address="+addr_in+"&apikey=6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2";
        var options = { json: true };
        const response = await fetch( url );
        const ab = await response.json();
        resolve( ab.result )
    });
    return prom;
}


//import { ethers } from "ethers";
//import { Address } from "cluster";

//const provider = new ethers.providers.JsonRpcProvider("<YOUR_ENDPOINT_HERE>");

const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";

const poolImmutablesAbi = [
  "function factory() external view returns (address)",
  "function token0() external view returns (address)",
  "function token1() external view returns (address)",
  "function fee() external view returns (uint24)",
  "function tickSpacing() external view returns (int24)",
  "function maxLiquidityPerTick() external view returns (uint128)",
];

const poolContract = new ethers.Contract(
  poolAddress,
  poolImmutablesAbi,
  provider
);

// interface Immutables {
//   factory: Address;
//   token0: Address;
//   token1: Address;
//   fee: number;
//   tickSpacing: number;
//   maxLiquidityPerTick: number;
// }

async function getPoolImmutables() {
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
    await Promise.all([
      poolContract.factory(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.maxLiquidityPerTick(),
    ]);

  const immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  };
  return immutables;
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

var tick ={ returned:'dat'}
var messageStruct = {
    fn:'fetchTicker',
    obj:tick , 
    domain:this.domain
}
*/