


//  Process Container V 0.1 ///                           ///. //
//   _     _  _______  _     _  _  _______  _        _______   
//  (_)   (_)(_______)(_)   (_)|_|(_______)(_)      (_______)  
//   _     _  _____    _______  _  _        _        _____     
//  | |   | ||  ___)_ |  ___  || || |_____ | |_____ |  ___)_   //
//   \\___// |_______)|_|   |_||_| \______)|_______)|_______)  //
//    _____ _____ _____ _____ _____ _____ _____ _____ _____    //
//  .|     |     |   | |_   _|  _  |     |   | |   __| __  |.  //
//  .|   --|  |  | | | | | | |     |-   -| | | |   __|    -|.  //
//   |_____|_____|_|___| |_| |__|__|_____|_|___|_____|__|__|   //
                                                         

// PROCESS CONTAINER // STATE STRUCT 
var state = {
    access_count: 0,   
    stack_trace_buffer:[] ,
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
    
    // WRAP EVERY MESSAGE INVOCATION TO PREVENT JANK UPSTREAM 
    try {

        // HOW DOES THE PROCESS CONTAINER GET SUPPORTED DRIVER METHODS ?
        // CAN WE USE DRIVER EXPROTS TO BE STANDARD 
        if( state.driver ){
            // Should this be .then( closure ) to enable multiple: 
            var resObj = await state.driver[ xclass ]( e.data );    
            outboundMessage( resObj )
        }else{
            init( e.data )
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
    
    const selected_driver = ( 'driver' in obj ) ? obj.driver +'.mjs': 'ethers_esm'+'.mjs'
    //const driver = ( obj.brand in ccxt ) ? 'ccxt'+'.js' : selected_driver;
    
    const driver_path = './drivers/'+'vehicle_'+selected_driver;
    state.driver = await import( driver_path );
    try{
        state.driver.init( obj )    
    }catch( err ){
        console.log('driver.init fail on ',err, obj )
    }
    

    // THIS ENABLES PROC LIST in QNAV ( COULD BE SUPERCLASS IN FUTURE )
    postMessage({ method: 'report', worker_id: state.worker_id, driver:selected_driver , domain:obj.domain , uuid:obj.uuid  });    
    var l = 3;

}



    //addEventListener('message', outboundMessage )

// // CALLBACK REPEAT 
// var intervalID = setInterval(myCallback, 3500, 'Parameter 1', 'Parameter 2');
// async function myCallback(a, b)
// {


// }