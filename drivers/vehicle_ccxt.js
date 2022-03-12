

// OLD SCHOOL UNTIL ES6 SUPPORT IN R_WEBVIEW
importScripts('/v_modules/ccxt.browser.js');       
importScripts('/x_modules/fabric/misc.js');      


// LOCAL VARS 
var driver;
var wid = 'w'+ Math.round( Math.random()*9999 );
var initObj = {}
var access_count = 0;
var methods = { 'init':init, 'spawn':init , fetchTicker:fetchTicker };


// ALL INCOMING MESSAGES ROUTED
onmessage = incomingRequest;
function incomingRequest( e ){
    var xclass = ( 'method' in e.data ) ? e.data.method : ( 'fn' in e.data )? e.data.fn : 'init';
    methods[ xclass ]( e.data );
}




// FUNCTIONAL METHODS: 
async function init( obj ){
    // CREATE DRIVER INSTANCE FIRST RUN 
    driver = new ccxt[ obj.carrier ]({ ...{} , ...{key:obj.ke,secret:obj.se} });
    initObj=obj;
}


async function fetchTicker( obj ){

    driver.fetchTicker('ETH/USD').then( function( tick ){
        tick.domain = obj.domain;
        tick.symbol='ETH/USD';
        tick.method = 'fetchTicker';
        tick.uuid = initObj.uuid; 
        postMessage( tick );    
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