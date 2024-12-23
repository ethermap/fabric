        


import * as util from './drivers/util.js'
import * as ccx  from './drivers/ccxt.browser.js'

/*_____      ___            __                 _____                                     
_/  ___\____ \_ |___ ______|__| ____     _____/  ___\  _____________ ______  _____  _____  
\   __\\__  \ | __  \\  __ \  |/ ___\   /  _ \   __\  /  ___/|  __  \\___  \/  ___\/  __ \ 
 |  |   / __ \| \_\  \  | \/  |  \___  (  (_) )  |    \___  \|  |_)  )/  _  \  \___\  ___/_
 |__|  (______)____ _/__|  |__|\____/   \____/|__|   /______/|   ___/(______/\_____/\_____/
                                                             |__|                     */
// LOCALS IN MOD SCOPE
var procs = {};                           // ALL PROCESSES
var eventer = new EventTarget();          // FABRIC EVENTER 
var channel = new MessageChannel();       // FOR WORKER PORTS 
var port1 = channel.port1;                // PORT
var port2 = channel.port2;                // PORT
var creds = false;                        // future cache ref 
                                          // should operate with pre injected creds 
// var is_worker = ! document;
// var scriptnode = document.createElement('script');
// scriptnode.setAttribute('id','pchecker');
// var script_path = is_worker ? null : (function() {
// 	var id = '9998998';
// 	return document.querySelector('#pchecker').previousSibling.src;
// })();



// STANDARD CAPABILITY 
var input_to_capability={                 // MAP-INTERACTION : FABRIC-REQUEST
        init: 'init',                     // START PROCESS 
 focusObject: 'loadCluster' ,             // LOADS  Metadata about object + time series segment 
 objectAdded: 'loadSupportingObjectProc'  // fabric.publishIntent( vector:object )
}

// CREDENTIAL PROVIDER
function init( initObj ){
    creds = initObj.creds; 
}

// MESSAGE TO WORKERS:
function messageToWorker( intentObj ){
    //FIND Worker by ID in existing workers list: 
    mergeIntent( intentObj )
    //If worker does not exist , spawn worker: 
    //after worker spawned or retrieved postMessage () 
    //(currently landled by mergeIntent)
}

// MESSAGE FROM WORKERS: 
function messageFromWorker( e ){
    var messageObject = e.data;

    // REJECT IF NO METHOD OR DATA 
    if( ! messageObject ) return
    if( !('method' in messageObject) ) return 
    
    // USE SELF REPORT EVENTS TO ADD SUCCESSFUL WORKERS METADATA 
    if( messageObject.method == 'report'){
        procs[ messageObject.uuid ]['wid'] = messageObject['worker_id'];
        console.log('        report:| ')
        for( var p in procs ){
            console.log('              ', p , ' : ', procs[p] )
        }
        var d = 3;
    }else{
        // PROPAGATE MESSAGES ONWARDS AS EVENTS 
        // fabricEvent struct 
        // { foreign_method:
        //           method:  
        //             uuid:
        //          payload:
        // }
        var d5 = 5;
        dispatchEvent( new CustomEvent('fabricEvent', {detail:e.data} )  );
        //console.log('Fabric: ', e.data.method  , e.data );        
    }
    
}

// MESSAGE ERROR FROM WORKER 
async function errorFromWorker( e ){
    // ROUTE TO MAIN CONE IF REF EXISTS
    console.log(' Fabric ERROR: ', e );
    // TODO: Add ref from options 
}

// GENERAL PROC STARTER 
async function mergeIntent( intentObj ){

    // ENSURE UUID LINKAGE
    if( ! ('uuid' in intentObj) ) intentObj.uuid = intentObj.module+'.'+intentObj.brand ;//util.uuidv4() // OR HASH UUID FROM ATTRIBS


    // MESSAGE EXISTING OR SPAWN 
    var target_worker;
    if( procs[ intentObj.uuid ] ){                       // EXISTING PROCESS OR SPAWN: 
        target_worker = procs[ intentObj.uuid ].worker;  // SHOULD INIT START DEPENDENCIES of REQUESTED NON LIVING )
        target_worker.postMessage( intentObj );
    }else{
        
        // CHECK IF WORKER.CLASSIC or WORKER.MODULE 
        const driver_conf = { type:'module' } // driver.includes('esm') ?  { type:'module'} : { type:'classic' }
        const container_path = '/fabric/container.mjs'; // workers dont use relative to page 
        var target_worker = new Worker( container_path , driver_conf );  // MUST USE ABSO PATH // pass { type:'module' } for es6 still buggy and bundled dependencies with node polyfils issues
        target_worker.addEventListener('message', messageFromWorker );        
        target_worker.addEventListener('onerror', messageFromWorker );      
         
                                                         // TODO: CHECK IF CREDENTIALS IN px3 
        // STRUCTURED CLONE COMPATIBILITY STRIP REFS  //console.log(' merge Intent ', new Date().getTime() )    
        var px1 = { ...intentObj }                       //  "Spread"
        var px2 = Object.assign({}, intentObj )          //  "Object.assign"
        var px3 = JSON.parse(JSON.stringify( intentObj ))  //  "JSON"            
        // IN ABSENCE OF KEYSTORE and USE MANUALLY ADDED 
        // UNREGISTERED WORKER MUST FIRE INIT BEFORE FINAL ( init last to overwrite )
        // Here is UUID from Credential Provider supposed to overwrite the UUID set ? 
        // Suppose it can't because it already has precedent in the map or UI 
        // let intentObjFused = { method:'init' , ...creds.keySelect(  'dom' , intentObj.brand )[0]   , ...px3 } 
        // remove internal credential provider for simplicity for now // creds are embedded outside 
        
        let intentObjFused = {  ...px3 , method:'init'} 
        procs[ intentObjFused.uuid ] = { worker:target_worker };  // INSERT PROCESS

        // 1ST MESSAGE   SENDS INIT 
        target_worker.postMessage( intentObjFused )
        
        // 2ND MESSAGE   SENDS ORIGINAL FIRST INTENT OBJECT 
        if( px3.method ){
            await util.sleep(1000); // THIS DELAY SHOULD BE CONDITIONAL 
            // EXPERIMENT WITH CUE FOR INIT AND SEQUENTIAL ORDERS 
            target_worker.postMessage( px3 )    
        }
        // creds could be expanded to creds.keySelect( ['dom','domain','brand'] )
    }
}

// DEALLOCATES ALL WORKERS
function dropProcs(){
    for( var p in procs ){
        var pr = procs[p];
        pr.worker.terminate();
        console.log( 'terminated: ',p)
    }
    // SPEED UP GARBCOL
    procs = {};
}



// SHOULD ENABLE WORKER TARGETTING BY ATTRIOBUTE
function keySelect( k , v){
    // by domain for general domain level request 
    // by UUID for single individual 
    // by symbol for broad multi-update 
    // returned array iterate postMessage to all !! 
    console.log(' key selecting by ', k );
}

// TIMESERIES PER GRID COORDINATE 
function accessFrameByVector( x , y , z, s, t){
    // ACCESS CACHE AND RETURN SERIES 
    console.log(' frame fector ')
}



async function querySegment( targObj ){
    // query Graph , match graph with grid of avail 
    // query procs{[]} check if procs contain 
    // return df / grid 
};
function objectsOnline(){

    // return running object process  p[ ]
    console.log( procs );
    return procs;
}
function getProcs(){
    return procs;
}

export default {
    init,
    objectsOnline,
    dropProcs,
    getProcs,
    mergeIntent ,
    addEventListener:eventer.addEventListener.bind(this),
    removeEventListener:eventer.removeEventListener.bind(this),
    dispatchEvent:eventer.dispatchEvent.bind(this)
}





// FUTURE ENABLE ERROR TRACK 
// Worker.onerror        // ErrorEvent of type error event occurs.
// Worker.onmessage      // MessageEvent of type message occurs — i.e. when a message is sent to the parent document from the worker via DedicatedWorkerGlobalScope.postMessage. The message is stored in the event's data property.
// Worker.onmessageerror // 
// console.log( 'publishing Intent Into the fabric by address and target fn or xclass ');
// console.log( intentObj )

        // OOPS ERROR CAUSE JS SET BY REFERENCE 
        // var launch_obj = px3;
        // launch_obj.method = 'init';


// class Fabric extends EventTarget {
//     constructor(){
//         super()
//     }
// }
// fabric = new Fabric()
// export { fabric }