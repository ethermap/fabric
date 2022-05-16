
// import  * as coingecko from 

// OLD SCHOOL IMPORTS 
importScripts('./coingecko.js')
importScripts('./curve.js')
importScripts('./ddxt.js')
importScripts('./abifinder.js')
importScripts('./messagecache.js')
importScripts('/v_modules/ethers-5.1.umd.min.js');
// import { ethers } from '/v_modules/ethers-5.6.umd.min.js';

//   ADDRESS:  Contract can map across other networks points to Address
//   BRAND:    Can apply to Tokens, Dexes, Networks 
//   DRIVER:   Default Ethers but what about others ? 
//.  NETWORK:   ( ETH mainnet  ,  ETH.robsten , AVAX.main. , AVAX. )
//   SYMBOL:   Each Wallet can have multiples ?
//   ABI: METHOD_LIST  ( can be loaded from contract URL or identifier  from fabric )
//                          mainnet.eth 
//   
//   Address of contract VS. Address of wallet / priv_key 


// NEED ABI SEARCH service 
// need pricefeeds Oracles markets 
// need wallet heat to operate 
    
// CAN READ VALUES BE BUBBLED UP DESPITE SEPARATE SOURCES , TO CENTRAL SHARED GRID 
// bubbleSignals( { brand:x , attrib1:y , attrib2:z } )


var d_router = {
    avax:'https://api.avax-test.network/ext/bc/C/rpc',
    avax_test:'https://api.avax-test.network/ext/bc/C/rpc',
    ethereum:'https://alchemy.node.something',
    ethereum_ropsten:'https://alchemy.node.something',
    polygon:''
}

var methods = {
    init: init,
    base: init,
    close: init,
    spawn: init,
    balance
}
var wid = 'w' + Math.round(Math.random() * 9999);
var access_count = 0;
var initObj;
var provider = new ethers.providers.AlchemyProvider();
var wallet = false

// ALL INCOMING MESSAGES ROUTED
onmessage = incomingRequest;
function incomingRequest(e) {
    var xclass = ('method' in e.data) ? e.data.method : ('fn' in e.data) ? e.data.fn : 'init';
    try {
        methods[xclass](e.data);
    } catch (err) {
        console.log(' err in ethers vehicle: ', err)
    }
}



async function init(obj) {

    // THIS DRIVES PROC LIST in QNAV ( COULD BE SUPERCLASS IN FUTURE )
    postMessage({ met: 'report', wid: wid, driver: 'ethers', domain: 'ethers' });

    // STORE TELEMETS 
    initObj = obj;
    ///////.
    //////.
    /////.  
    ////.   CONCENTRATE SIGNALS ACQUIRED ACROSS WORKERS !! 
    ///.
    //.

    // METADATA CONNECTOR IN CASE OF WALLET SYSTEMS 
    var cobj = {}
    driver = new ddxt[ obj.brand ]({ ...{} , ...cobj , proxy:'http://localhost:8080/'} );
    
    //// WALLET CONNECTOR FOR CLIENT  // obj.brand avax.  // networks[ brand ] => 
    provider = new ethers.providers.EtherscanProvider()
    provider = new ethers.providers.InfuraProvider()  //( [ network = "homestead" , [ apiKey ] ] )
    //provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
    var walletPrivateKey = new ethers.Wallet(obj.se); // D6D5
    wallet = walletPrivateKey.connect(provider)
}


async function markets( obj ){

    var mmm = await cv.markets()
    messageCache.post( outboundObj );
}

async function balance(obj) {

    var outboundObj = {
        uuid:obj.uuid,
        method:obj.method,
        symbol:obj.symbol
    }
    
    ///// GET PRICES
    var maintokens = await cg.markets();
    
    var bal = await wallet.getBalance();
    var balf = ethers.utils.formatEther(bal);

    maintokens[ obj.symbol.toLowerCase() ].balance = balf; 
    outboundObj.payload = maintokens; 
    messageCache.post( outboundObj );
    
}

async function zeroKool(){

    var blocknum = await provider.getBlockNumber();    

    // BALANCE OF TOKEN AND NATIVE 
    // ERC20 / AVAX on TESTNET/ENS 
    var daiAddress = "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70";
    var daiAddressTest = '0x34B6C87bb59Eb37EFe35C8d594a234Cd8C654D50';
    daiAddress = daiAddressTest;
    const daiAbi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function transfer(address to, uint amount)",
        "function balanceOf(address) view returns (uint)",
        "event Transfer(address indexed from, address indexed to, uint amount)"
    ];
    const daiContract = new ethers.Contract( daiAddress, daiAbi, provider );

    var sm = await daiContract.symbol()
    balance = await daiContract.balanceOf(wallet.address)
    var balz = ethers.utils.formatUnits(balance, 18)

    
}

async function pricedBalances( obj ){
    // FIND PRICE GECKO 
    // GET BALANCE 
    // calculate value of units 
    // build outbound object  
}

const returnMethods = (obj = {}) => {
    const members = Object.getOwnPropertyNames(obj);
    const methods = members.filter(el => {
        return typeof obj[el] === 'function';
    })
    return methods;
};



// CALL FUNCTION SANS ABI
function call_sig(method_name, types_arr, vals_arr) {
    var types_array = types_arr;
    var types_array_string = types_array.join(',');
    var funcSig = method_name + '(' + types_array_string + ')';
    let funcBytes = ethers.utils.toUtf8Bytes(funcSig);
    var funcKeccak = ethers.utils.keccak256(funcBytes);
    var funcSegment = funcKeccak.slice(0, 10);
    let bbPack = ethers.utils.solidityPack(
        ['bytes4', ...types_arr],
        [funcSegment, ...vals_arr]);
    return bbPack;
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

// The Contract object
// Read-Only Methods
// Querying the DAI Contract
// Get the ERC-20 token name
// var nm = await daiContract.name()
// Dai Stablecoin
// Get the ERC-20 token symbol (for tickers and UIs)
// DAI
// Get the balance of an address
// BigNumber: "8501797437309328201631"
// Format the DAI for displaying to the user
*/

// interface Immutables {
//   factory: Address;
//   token0: Address;
//   token1: Address;
//   fee: number;
//   tickSpacing: number;
//   maxLiquidityPerTick: number;
// }


    // var the_abi = await fetchAbi( cons[obj['carrier']] );
    // var cont = new ethers.Contract( cons[obj['carrier']] , the_abi  );
    // var dec = await usdt.connect( provider ).decimals()
    // provider = new ethers.providers.AlchemyProvider();
    // provider =  new ethers.providers.JsonRpcProvider('https://poly/gon/rpc'); 
    // provider =  new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');  
    // console.log(returnMethods(cont));
    // var pm= await getPoolImmutables();
    // CALLBACK REPEAT 
    // var intervalID = setInterval( myCallback, 3500, 'Parameter 1', 'Parameter 2');
    // async function myCallback(a, b)
    // {
    //     console.log(' worker: ', wid, self.hostname )
    //     var whalbal = await cont.connect( provider ).balanceOf( uni_whale_address )
    //     var blocknum = await  provider.getBlockNumber();
    //     postMessage( { met:'block' ,  block:blocknum  , last:whalbal , domain:'ethereum' , symbol:'ETH/USD'} );
    // } 