

// OLD SCHOOL UNTIL ES6 SUPPORT IN R_WEBVIEW
importScripts('/v_modules/ccxt.browser.js');       
importScripts('/x_modules/fabric/misc.js');      


// LOCAL VARS 
var driver;
var wid = 'w'+ Math.round( Math.random()*9999 );
var initObj = {}
var access_count = 0;

// AVAILABLE 
var methods = { 
    init:init, 
    spawn:init , 
    fetchTicker ,
    fetchBalance ,
    loadMarkets ,
    currencies

};

// ALL INBOUND 
onmessage = incomingRequest;
function incomingRequest( e ){
    var xclass = ( 'method' in e.data ) ? e.data.method : ( 'fn' in e.data )? e.data.fn : 'init';
    methods[ xclass ]( e.data );
}
// ALL OUTBOUND
function outboundPayload( obj ){

    var outboundObject = { ...obj , uuid:initObj.uuid }
    postMessage( outboundObject ); 
}



// FUNCTIONAL METHODS: 
async function init( obj ){
    // CREATE DRIVER INSTANCE FIRST RUN 
    let cobj = ( 'apiKey' in obj ) ? {apiKey:obj.ke,secret:obj.se} : {}
    driver = new ccxt[ obj.brand ]({ 
        ...{} , ...cobj , proxy:'http://localhost:8080/'} );
    initObj=obj;
    //fetchTicker( obj );


    var intervalID = setInterval( myCallback, 8500, 'Parameter 1', 'Parameter 2');
    async function myCallback(a, b)
    {
        console.log(' worker: ', wid )
        //fetchTicker( obj );
    }
}

async function loadMarkets( obj ){

    //\ XIPIdIX /\\ 
    driver.loadMarkets().then( function(obj){
        console.log( obj );
        var outObj ={}
        outObj.payload = obj; 
        outObj.uuid = initObj.uuid;
        outObj.method = 'loadMarkets';
        postMessage( outObj ); 
    });
}



// YOU ARE HERE APRIL 8 
// USING CURRENCIES INSTEAD OF loadMarkets
// FASTER AND FEWER 
// ALSO LIKELY EXPANDING SWITCH TO BALANCES INSTAD OF CURRENCES CAUSE MEM
// arg both necessary
async function currencies( obj ){

    //\ XIPIdIX /\\ 
    driver.loadMarkets().then( function(obj){
        //console.log( obj );
        var outObj ={}
        outObj.payload = driver.currencies; 
        outObj.uuid = initObj.uuid;
        outObj.method = 'currencies';
        postMessage( outObj ); 
        //sendOutboundPayload( )
    });
}

async function fetchTicker( obj ){
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    driver.fetchTicker( obj.symbol ).then( async function( tick ){
        tick.domain = obj.domain;
        tick.symbol='ETH/USD';
        tick.method = 'fetchTicker';
        tick.uuid = initObj.uuid; 
        postMessage( tick );
        await sleep(30000)
        fetchTicker( obj );
    });
}


async function fetchBalance( obj ){
    driver.fetchBalance().then( function( balances ){
        balances.method = 'fetchBalances';
        balances.uuid = initObj.uuid; 
        postMessage( balances );    
    });    
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