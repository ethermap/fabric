

var channel = new MessageChannel();

var cache = { testentry:777 } 



function getCachedMethod( method ){

    if( method in cache ){
        return cache[ method ]
    }else{
        return false 
    }
}


// INSTANT POST OF CACHED DATA FOR FAST UI DURING LOADING 
function cacheBusPost( obj ){

    
    if( obj.payload ){ // IF MESSAGE HAS PAYLOAD UPDATE CACHE AND SEND 
        
        cache[ obj.method ] = obj.payload;
        postMessage( obj );
        
    }else if( obj.method in cache ){ // IF NO PAYLOAD BUT CACHED SEND CACHE 
        
        obj.payload = cache[ obj.method ]
        postMessage( obj )
        
    }else{ // DO NOTHING 
        return false 
    }
}

