
import * as ccx  from '/v_modules/ccxt.browser.js'
                                                                                        /*
  _____      ___.         .__                 _____                                     
_/ ____\____ \_ |_________|__| ____     _____/ ____\   _________________    ____  ____  
\   __\\__  \ | __ \_  __ \  |/ ___\   /  _ \   __\   /  ___/\____ \__  \ _/ ___\/ __ \ 
 |  |   / __ \| \_\ \  | \/  \  \___  (  <_> )  |     \___ \ |  |_> > __ \\  \__\  ___/ 
 |__|  (____  /___  /__|  |__|\___  >  \____/|__|    /____  >|   __(____  /\___  >___  >
            \/    \/              \/                      \/ |__|       \/     \/    \/ */

// LOCALS IN MOD SCOPE
var procs = {};                          // ALL PROCESSES
var eventer = new EventTarget();         // FABRIC EVENTER 
var creds = false;                       // future cache ref 
var input_to_request={                   // MAP-INTERACTION : FABRIC-REQUEST
       init: 'init',                     // START PROCESS 
focusObject: 'loadCluster' ,             // LOADS  Metadata about object + time series segment 
objectAdded: 'loadSupportingObjectProc', // fabric.publishIntent( vector:object )
  mapLoaded: 'spawnAllSupportingObjects',//  fabric.
}


// HIGH LEVEL SERVICEGRID
function init( initObj ){
    creds = initObj.creds; 
}



// GENERAL PROC START 
async function mergeIntent( intentObj ){
    console.log(' merge Intent ', new Date().getTime() )    

    // STRUCTURED CLONE COMPATIBILITY STRIP REFS  
    var px1 = { ...intentObj }                      // "Spread"
    var px2 = Object.assign({}, intentObj )         // "Object.assign"
    var px3 = JSON.parse(JSON.stringify(intentObj)) // "JSON"    

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
        const driver = ( intentObj.brand  in ccxt ) ? 'ccxt' : 'ethers';
        const driver_path = '/x_modules/fabric/drivers/'+'vehicle_'+driver+'.js';
        target_worker = new Worker( driver_path   );  // MUST USE ABSO PATH // pass { type:'module' } for es6 still buggy
        procs[ intentObj.uuid ] = { worker:target_worker }; 
        target_worker.addEventListener("message", messageFromWorker );        
        target_worker.addEventListener("onerror", messageFromWorker );      


        // UNREGISTERED WORKER MUST FIRE INIT BEFORE FINAL ( init last to overwrite )
        target_worker.postMessage( { ...px3 , method:'init' , ...creds.keySelect(  'dom' , intentObj.brand )[0]  } )
        // SECOND MESSAGE SENDS ORIGINAL FIRST INTENT OBJECT 
        target_worker.postMessage( px3 )
        // creds could be expanded to creds.keySelect( ['dom','domain','brand'] )
    }
}


// EVENTS BUBBLING UP FROM WORKERS 
function messageFromWorker( e ){
    console.log('Fabric: ', e.data.method  , e.data );
    var messageObject = e.data;
    if( messageObject.method == 'report'){
        procs[ messageObject.uuid ]['wid']=messageObject['wid'];
    }
    if( messageObject.method == 'fetchTicker'){
    }
    dispatchEvent( new CustomEvent('fabricEvent', {detail:e.data} )  );
}


// SHOULD ENABLE WORKER TARGETTING BY ATTRIOBUTE
function keySelect( k , v){
    // by domain for general domain level request 
    // by UUID for single individual 
    // by symbol for broad multi-update 
    // returned array iterate postMessage to all !! 
    console.log(' key selecting by ', k );
}

function errorFromWorker( e ){
    console.log(' Fabric ERROR: ', e );
}

function messageToWorker( e ){
    //  FIND Worker by ID in existing workers list: 
    //  If worker does not exist , spawn worker: 
    //  after worker spawned or retrieved postMessage () 
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
function dropProcs(){
    for( var p in procs ){

        var pr = procs[p];
        pr.terminate();
        console.log( 'terminated: ',p)
    }
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