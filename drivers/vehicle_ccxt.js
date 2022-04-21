

// OLD SCHOOL UNTIL ES6 SUPPORT IN R_WEBVIEW
importScripts('/v_modules/ccxt.browser.js');       
importScripts('/x_modules/fabric/misc.js');      


// LOCAL VARS 
var driver;
var wid = 'w'+ Math.round( Math.random()*9999 );
var initObj = {}
var access_count = 0;

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

// AVAILABLE 
var methods = { 
    init:init, 
    spawn:init , 
    fetchTicker ,
    fetchBalance ,
    loadMarkets ,
    currencies,
    balances,
    defaultMethod,
    timeSeries,
    pricedBalances

};

// ALL INBOUND 
onmessage = incomingRequest;
function incomingRequest( e ){
    var xmethod = ( 'method' in e.data ) ? e.data.method : 'defaultMethod';  // ( 'fn' in e.data )? e.data.fn : 'init';
    methods[ xmethod ]( e.data );
}
// ALL OUTBOUND
function outboundPayload( obj ){

    var outboundObject = { ...obj , uuid:initObj.uuid }
    postMessage( outboundObject ); 
}



// FUNCTIONAL METHODS: 
async function init( obj ){
    
    // CREATE DRIVER INSTANCE FIRST RUN 
    let cobj = ( 'ke' in obj ) ? {apiKey:obj.ke,secret:obj.se} : {}

    // SILLY EXCEPTION FOR CBP
    if('pw' in obj ){ cobj.password = obj.pw }
    
    // SPAWN DRIVER
    driver = new ccxt[ obj.brand ]({ ...{} , ...cobj , proxy:'http://localhost:8080/'} );
    

    // TO REMOVE 
    // DEBUG SAVE OBJECT IN SCOPE 
    initObj=obj;
    //initObj['inserted_ke'] = obj.ke
    //fetchTicker( obj );
    // TEST INTERVAL EMIT TEST EVENT 
    //var intervalID = setInterval( myCallback, 8500, 'Parameter 1', 'Parameter 2');
    //async function myCallback(a, b)
    //{
    //  console.log(' worker: ', wid )
    //  fetchTicker( obj );
    //}
}

async function defaultMethod( obj ){

    console.log(' default Method called on vehicle CCXT with: ', obj )
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
        outObj.uuid = initObj.id;
        outObj.method = 'currencies';
        postMessage( outObj ); 
        //sendOutboundPayload( )
    });
}

async function pricedBalances( obj ){

    // GET Markets if not loaded 

    var responseObj={};
    responseObj.method = 'pricedBalances'
    responseObj.uuid = obj.id; 

    driver.fetchBalance().then( 
        // FULLFILLMENT: 

        
        async function( balances ){
            balances.method = 'fetchBalance';
            
            //postMessage( balances );    

            console.log( balances.info )
            var processedBalances={}
            for( var b in balances.info ){
                    
                let bnod = balances.info[b]
                let base = bnod.currency
                if( bnod.balance > 0 ){
                    processedBalances[ base ]=bnod    
                }
                
                
            }

            var groupedTickers={}
            if( driver.has.fetchTickers ){

                driver.fetchTickers().then( ( tickers ) => {

                    console.log( tickers )
                    for( var t in tickers ){
                        let qnod = tickers[t]
                        let base = t.split("/")[0]
                        let quot = t.split("/")[1]
                        
                        if( base in groupedTickers ){
                            groupedTickers[ base ][ quot ] = qnod
                        }else{
                            groupedTickers[ base ]= { quot:qnod }
                        }

                        // Maybe can just insert stuff into processed Balances:

                        if( processedBalances[ base ] && quot == 'USD' ){
                            processedBalances[ base ][qnod.symbol]=qnod
                        }
                    }
                    
                    // ok now merge price_per_unit into each asset apiKey//
                    // ob[ base ] 
                    var k = 5;
                    
                })
            }else{
                console.log(' no multi ticker available ')
            }

            
            await sleep(15000)
            pricedBalances()
        },
        // INCOMPLETE:
        async function( reason ){

            console.log( 'vehicle fail reason: ', reason )
        });    

    
    if( driver.markets ){

        if( driver.has.fetchTickers ){
            driver.fetchTickers().then( function(e){


                console.log( e )
            })
            
        }
    }
    // get Balances per Credential 
    // 
    // build payload array of priced Balances 


}

async function fetchTicker( obj ){

    driver.fetchTicker( obj.symbol ).then( 
        async function( tick ){
            tick.domain = obj.domain;
            tick.symbol='ETH/USD';
            tick.method = 'fetchTicker';
            tick.uuid = initObj.id; 
            postMessage( tick );
            await sleep(30000)
            fetchTicker( obj );
        },
        async function( reason ){

            console.log( 'vehicle fail reason: ', reason )
        }
    );
}

async function timeSeries( obj ){

    //driver.fetchOHLCV ('ETH/BTC', '1m')[0]
    console.log(' timeSeries ')
    // JavaScript
    let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));

    if ( driver.has.fetchOHLCV) {

        await sleep ( driver.rateLimit) // milliseconds
        var OHLCV = await driver.fetchOHLCV ( obj.symbol, '1h')
        console.log ( OHLCV ) // one minute        

        var outObj = {}
        outObj.method = obj.method;
        outObj.uuid = obj.uuid;
        outObj.meta = { symbol:obj.symbol };
        outObj.payload = OHLCV;
        
        postMessage( outObj );
        // for (symbol in driver.markets) {
        //     await sleep ( driver.rateLimit) // milliseconds
        //     var OHLCV = await driver.fetchOHLCV ( obj.symbol, '1m')
        //     console.log ( OHLCV ) // one minute
        // }
    }    
}

async function fetchBalance( obj ){
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    // 
    driver.fetchBalance().then( 
        // FULLFILLMENT: 
        async function( balances ){
            balances.method = 'fetchBalance';
            balances.uuid = initObj.id; 
            postMessage( balances );    
            await sleep(5000)
            fetchBalance()
        },
        // INCOMPLETE:
        async function( reason ){

            console.log( 'vehicle fail reason: ', reason )
        });    
}

async function balances( ob ){
    driver.fetchBalance().then( async function( balances ){
        balances.method = 'fetchBalance';
        balances.uuid = initObj.id; 
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