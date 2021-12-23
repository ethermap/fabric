

//////////////
                                                                                        /*
  _____      ___.         .__                 _____                                     
_/ ____\____ \_ |_________|__| ____     _____/ ____\   _________________    ____  ____  
\   __\\__  \ | __ \_  __ \  |/ ___\   /  _ \   __\   /  ___/\____ \__  \ _/ ___\/ __ \ 
 |  |   / __ \| \_\ \  | \/  \  \___  (  <_> )  |     \___ \ |  |_> > __ \\  \__\  ___/ 
 |__|  (____  /___  /__|  |__|\___  >  \____/|__|    /____  >|   __(____  /\___  >___  >
            \/    \/              \/                      \/ |__|       \/     \/    \/ */

var procs = []    // ALL PROCESSES
var eventer = new EventTarget();    // FABRIC EVENTER 
var input_to_request={              // MAP-INTERACTION : FABRIC-REQUEST
       init: 'init',                // START PROCESS 
focusObject: 'loadCluster' ,        // LOADS  Metadata about object + time series segment 
objectAdded: 'loadSupportingObjectProc',  // fabric.publishIntent( vector:object )
  mapLoaded: 'spawnAllSupportingObjects' , //  fabric.
}

// HIGH LEVEL SERVICEGRID ACCESS 
function init(){
    console.log(' start fabric ')
}
function spawnProcess( procObj ){
    var wrkr =  new Worker('./x_modules/fabric/vehicle.js');
    //var wrkr =  new Worker('./x_modules/fabric/vehicleb.js',{ type:'module' } );
    procs.push( wrkr )
    wrkr.postMessage( procObj )
    wrkr.addEventListener("message", handleMessageFromWorker );
}
async function publishIntent( intentObj ){
    // check if address space contains initObj.address ( ob_vec )
    // if no node exists , spawn process and register with procs 
    // df[  ]
    console.log( 'publishing Intent Into the fabric by address and target fn or xclass ')
    console.log( intentObj )
}
function handleMessageFromWorker( e ){
    console.log(' Fabric Hears: ', e.data.domain , e.data.symbol , e.data.last );
    dispatchEvent( new CustomEvent('fabricEvent', {detail:e.data} )  );
}


async function querySegment( targObj ){
    // query Graph , match graph with grid of avail 
    // query procs{[]} check if procs contain 
    // return df / grid 
};
function objectsOnline(){

    // return running object process  p[ ]
    console.log( procs );
}

export default {
    init,
    spawnProcess,
    objectsOnline,
    publishIntent ,
    addEventListener:eventer.addEventListener.bind(this),
    removeEventListener:eventer.removeEventListener.bind(this),
    dispatchEvent:eventer.dispatchEvent.bind(this)
}