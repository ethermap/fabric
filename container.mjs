


//  Process Container V 0.1 ///                           ///. //
//   _     _  _______  _     _  _  _______  _        _______   
//  (_)   (_)(_______)(_)   (_)|_|(_______)(_)      (_______)  
//   _     _  _____    _______  _  _        _        _____     
//  | |   | ||  ___)_ |  ___  || || |_____ | |_____ |  ___)_   //
//   \\___// |_______)|_|   |_||_| \______)|_______)|_____ \   //
//    \___/ _____ _____ _____ _____ _____ _____ _____ ____\ \  //
//  .|     |     |   | |_   _|  _  |     |   | |   __| __  |.  //
//  .|   --|  |  | | | | | | |     |-   -| | | |   __|    -|.  //
//   |_____|_____|_|___| |_| |__|__|_____|_|___|_____|__|__|   //

// import * as ccx  from './drivers/ccxtesbuilt.js'
import * as entities from './entities.js'
//import * as ccx  from './drivers/ccxt.browser.js'
import * as util from './drivers/util.js'

//import * as ccx  from '/drivers/ccxtesbuilt2.js'
                                                         

console.log(' Process Container running  ')

// PROCESS CONTAINER // STATE STRUCT 
var state = {
    access_count: 0,   
    stack_trace_buffer:[] ,
    uuid: false, 
    worker_id:'w'+ Math.round( Math.random()*99999 ), // UUID EXTRINSIC 
    op_tick:{  returned_scope_closure:0   },
    messageStruct: {
        fn:'fetchTicker',
        obj:{} , 
        domain:'initObj'
    }, 
    initObj:{}, 
    driver: false 
}


// ALL INBOUND EVENTS ON DOWNSTREAM 
async function inboundMessage( e ) { 
    
    // TODO: Filter incoming extensions double check here 
    // message enveloper decrypt then route 
    var xclass = ('method' in e.data) ? e.data.method : ('fn' in e.data) ? e.data.fn : 'init';

    
    // OUTBOUND CACHE BLAST 
    // cacheBusPost( responseObj )
    
    // WRAP EVERY MESSAGE INVOCATION TO PREVENT JANK UPSTREAM 
    try {
        // HOW DOES THE PROCESS CONTAINER GET SUPPORTED DRIVER METHODS ?
        // CAN WE USE DRIVER EXPROTS TO BE STANDARD 
        if( state.driver ){
            
            // CALL FOREIGN METHOD 
            state.driver[ xclass ]( e.data )
            .then( function( returned_payload ){
                var resObj = {}
                resObj['method'] = xclass;
                resObj['foreignMethod'] = xclass;
                resObj['uuid'] = e.data.uuid
                resObj['payload'] = returned_payload
                outboundMessage( resObj )    
            })
            .catch( err => {
                console.log(' Container Foreign call error:  ', err )
            })            
        }else{
            // console.log( 'firing pre  init: ')            
            init( e.data )
            // console.log( 'firing post init: ')
        }
        
    } catch (err) {
        console.log( xclass )
        console.log(' err in ethers vehicle: ', err)
    }
}
// ALL OUTBOUND EVENTS ON NETWORK IO 
function outboundMessage( obj ){  

    var outboundObject = obj; 
    postMessage( outboundObject ); 
}


// SUBSCRIBE INBOUND EVENTS
addEventListener('message', inboundMessage );

// SUBSCRIBE OUTBOUND EVENTS 
async function init( obj ){
    
    // THIS SHOULD WORK  EMPTY , IT SOULD SHUT DOWNSTREAM//
    // PARTIALLY POPOULATED iT WILL GET WHAT IT CAN 
    // FOR EXAMPLE NO CREDITS FOR  Extractor of files , or login session 
    // OR credentialled like CEFI or DEFI Wallet / Controller 
    // const basePath = (''+location+'').replace(/\/[^/]+$/, '/'); //PRE_SHAKEN IMPORT DEPS 
    // IF DRIVER EXISTS IN CCXT instead // 
    // WORKER SUBCLASS ROUTING VIA XCLASS GLUEMAPPER?? // 
    // const driver = ('driver' in intentObj)?intentObj.driver:'ethers';
    // await util.sleep( 5000 )
    // util.elapsed() 


    // SELECT DRIVER 
    var driver;
    if( 'brand' in obj ){
        if( obj.brand in entities.nodes ){
            driver = 'ccxt_esm.mjs';     
        }else{
            driver = 'ethers_esm.mjs'
        }
    }else if( 'driver' in obj ){
        driver = obj.driver + '_esm.mjs'
    }else{
        driver = 'default_esm.mjs'
    }
    
    
    var driver_path = './drivers/'+'vehicle_'+driver;
    
    // DYNO IMPORT SHOULD BE MODULE REPO GLUEMAPPER MATRIX 
    state.driver = await import( driver_path );
    
    // INIT IF NEEDS STATE 
    try{
        state.driver.init( obj )    
    }catch( err ){
        console.log('container.init Non-Exist on ', obj , 'err: ',err )
    }
    

    // THIS ENABLES PROC LIST in QNAV ( COULD BE SUPERCLASS IN FUTURE )
    postMessage({ method: 'report', worker_id: state.worker_id, driver:driver , domain:obj.domain , uuid:obj.uuid  });    
    var l = 3;

}



    //addEventListener('message', outboundMessage )

// // CALLBACK REPEAT 
// var intervalID = setInterval(myCallback, 3500, 'Parameter 1', 'Parameter 2');
// async function myCallback(a, b)
// {


// }
