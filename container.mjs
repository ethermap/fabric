


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


import * as util from './drivers/util.js'
                                                         

// PROCESS CONTAINER // STATE STRUCT 
var state = {
    uuid: false, 
    driver: false ,
    initObj:{}, 
    access_count: 0,   
    stack_trace_buffer:[] ,
    worker_id:'w'+ Math.round( Math.random()*99999 ), // UUID EXTRINSIC 
    op_tick:{  returned_scope_closure:0   },
    messageStruct: {
        fn:'method',
        obj:{} , 
        domain:'initObj'
    }
}


// ALL INBOUND EVENTS ON DOWNSTREAM 
async function inboundMessage( e ) { 
    
    // TODO: Filter incoming extensions double check here 
    // message enveloper decrypt then route 
    var xmethod = ('method' in e.data) ? e.data.method : ('fn' in e.data) ? e.data.fn : 'init';

    
    // OUTBOUND CACHE BLAST 
    // CACHE COULD ALSO BE AT DRIVER LEVEL 
    // CACHE COULD ALSO FIRE AGAIN AFTER HARDLOAD
    // cacheBusPost( responseObj )
    // ALSO CUE and SEQUENCE NUMBER to BROADCAST IN ORDER OF CALL 
    
    // WRAP EVERY MESSAGE INVOCATION TO PREVENT JANK UPSTREAM 
    try {
        // HOW DOES THE PROCESS CONTAINER GET SUPPORTED DRIVER METHODS CAN WE USE DRIVER.EXPROTS TO BE STANDARD 
        if( state.driver ){
            
            // CALL FOREIGN METHOD 
            state.driver[ xmethod ]( e.data )
            .then( function( returned_payload ){
                var resObj = {}
                resObj['module']=state.module;
                resObj['method'] = xmethod;
                resObj['foreignMethod'] = xmethod;
                resObj['uuid'] = e.data.uuid
                resObj['payload'] = returned_payload

                outboundMessage( resObj )    
            })
            .catch( err => {
                console.log('Container: Foreign Call Error:  ', err )
            })            
        }else{
            // console.log( 'firing pre  init: ')            
            init( e.data )
            // console.log( 'firing post init: ')
        }
        
    } catch (err) {
        console.log(' Container Exception : ', err );
        console.log('             xmethod : ', xmethod );
    }
}
// ALL OUTBOUND EVENTS ON NETWORK IO 
function outboundMessage( obj ){  

    var outboundObject = obj; 
    postMessage( outboundObject ); 
}
// SUBSCRIBE INBOUND EVENTS
addEventListener('message', inboundMessage );

 
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


    // SELECT DRIVER MODULE
    // ideally this would be working path 
    // container simply proxies func calls as messages 
    var driver;
    if( 'driver' in obj ){
        driver = obj.driver + '_esm.mjs'
        state.module=obj.driver;
        state.driver=obj.driver;
    }else if( 'module' in obj ){
        driver = obj.module + '_esm.mjs'
        state.module=obj.module;
        state.driver=obj.module;
    }
    else{
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
 