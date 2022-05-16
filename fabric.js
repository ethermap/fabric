

import * as ccx  from '/v_modules/ccxt.browser.js'
import * as utils from './drivers/utils.js'

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
    // USE SELF REPORT EVENTS TO ADD WORKER METADATA 
    if( messageObject.method == 'report'){
        procs[ messageObject.uuid ]['wid']=messageObject['wid'];
    }
    // PROPAGATE MESSAGES AS EVENTS 
    dispatchEvent( new CustomEvent('fabricEvent', {detail:e.data} )  );
    //console.log('Fabric: ', e.data.method  , e.data );
}

// MESSAGE ERROR FROM WORKER 
async function errorFromWorker( e ){
    // ROUTE TO MAIN CONE IF REF EXISTS
    console.log(' Fabric ERROR: ', e );
    // TODO: Add ref from options 
}

// GENERAL PROC STARTER 
async function mergeIntent( intentObj ){
    console.log(' merge Intent ', new Date().getTime() )    

    // STRUCTURED CLONE COMPATIBILITY STRIP REFS  
    var px1 = { ...intentObj }                       //  "Spread"
    var px2 = Object.assign({}, intentObj )          //  "Object.assign"
    var px3 = JSON.parse(JSON.stringify(intentObj))  //  "JSON"    

    // AQUIRE TARGET PER UUID OR SPAWN: 
    // ( SHOULD INIT START DEPENDENCIES of REQUESTED NON LIVING )
    var target_worker;
    if( procs[ intentObj.uuid ] ){ 
        target_worker = procs[ intentObj.uuid ].worker;
        target_worker.postMessage( intentObj );
    }else{
        const basePath = (''+location+'').replace(/\/[^/]+$/, '/'); //PRE_SHAKEN IMPORT DEPS 
        // IF DRIVER EXISTS IN CCXT instead // 
        // const driver = ('driver' in intentObj)?intentObj.driver:'ethers';
        const driver = ( intentObj.brand in ccxt ) ? 'ccxt'+'.js' : 'ethers_esm'+'.mjs';
        const driver_path = '/x_modules/fabric/drivers/'+'vehicle_'+driver;
        
        // CHECK IF WORKER.CLASSIC or WORKER.MODULE
        const driver_conf = driver.includes('esm') ?  { type:'module'} : { type:'classic' }
        target_worker = new Worker( driver_path , driver_conf );  // MUST USE ABSO PATH // pass { type:'module' } for es6 still buggy and bundled dependencies with node polyfils issues
        target_worker.addEventListener('message', messageFromWorker );        
        target_worker.addEventListener('onerror', messageFromWorker );      

        // INSERT PROCESS 
        procs[ intentObj.uuid ] = { worker:target_worker }; 

        // TODO: CHECK IF CREDENTIALS IN px3 
        // IN ABSENCE OF KEYSTORE and USE MANUALLY ADDED 
        // UNREGISTERED WORKER MUST FIRE INIT BEFORE FINAL ( init last to overwrite )
        target_worker.postMessage( { ...px3 , method:'init' , ...creds.keySelect(  'dom' , intentObj.brand )[0]  } )
        // SECOND MESSAGE SENDS ORIGINAL FIRST INTENT OBJECT 
        if( px3.method ){
            await utils.sleep(100);
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