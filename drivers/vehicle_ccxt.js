




importScripts('/v_modules/ccxt.browser.js');       // CEFI 
 

var tick ={ returned:'dat'}
var messageStruct = {
    fn:'fetchTicker',
    obj:tick , 
    domain:this.domain
}
var routes = {
    'init':init,
    'close':init
}
var wid = 'w'+ Math.round( Math.random()*9999 );
var access_count = 0;


onmessage = function(e) {
    console.log('Worker: VEH CXT '+ wid+' Receives Message Data:', e.data );
    var xclass = ( 'xclass' in e.data ) ? e.data.xclass : ( 'fn' in e.data )? e.data.fn : 'init';
    routes[xclass ]( e.data );
}



// CALLBACK REPEAT 
var intervalID = setInterval(myCallback, 3500, 'Parameter 1', 'Parameter 2');
async function myCallback(a, b)
{


}


async function init( obj ){
    console.log( ' init in Worker: ', wid , this , self );

    var veh = ccxt[ obj.domain ]
    var v = new veh();
    v.fetchTicker('BTC/USD').then( function( tick ){
        tick.domain = obj.domain;
        tick.symbol='BTC/USD';
        console.log( tick )
        postMessage( tick );    
    });

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