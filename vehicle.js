


//  Process Container V 0.1 ///
//   _     _  _______  _     _  _  _______  _        _______   //
//  (_)   (_)(_______)(_)   (_)|_|(_______)(_)      (_______)  //
//   _     _  _____    _______  _  _        _        _____     //
//  | |   | ||  ___)  |  ___  || || |      | |      |  ___)    //
//   \ \ / / | |_____ | |   | || || |_____ | |_____ | |_____   //
//    \___/  |_______)|_|   |_||_| \______)|_______)|_______)  //

// PROCESS CONTAINER // STATE STRUCT 
var state = {
    access_count: 0,   
    stack_trace_buffer:[] ,
    worker_id:'w'+ Math.round( Math.random()*99999 ), // UUID EXTRINSIC 
    op_tick:{  returned_scope_closure:0   },
    messageStruct: {
        fn:'fetchTicker',
        obj:tick , 
        domain:this.domain
    }, 
    initObj:{}, 
    driver: {} 
}


// ALL INBOUND EVENTS ON DOWNSTREAM 
function inboundMessage( e ) { 
    // TODO: Filter incoming extensions double check here 
    // message enveloper decrypt then route 
    var xclass = ('method' in e.data) ? e.data.method : ('fn' in e.data) ? e.data.fn : 'init';
    
    // WRAP EVERY MESSAGE INVOCATION TO PREVENT JANK UPSTREAM 
    try {

        // HOW DOES THE PROCESS CONTAINER GET SUPPORTED DRIVER METHODS ?
        // CAN WE USE DRIVER EXPROTS TO BE STANDARD 
        driver.methods[ xclass ]( e.data );
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

    // 
    
    state.driver = obj.driver 

    addEventListener('message', outboundMessage )

}



// CALLBACK REPEAT 
var intervalID = setInterval(myCallback, 3500, 'Parameter 1', 'Parameter 2');
async function myCallback(a, b)
{


}
