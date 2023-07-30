

// YOU ARE HERE 
// 1. find archive of demo maps 
// 2. collect all as individual json or objects 
// 3. bubble it up as message so it can be loaded into vault 


function fetchWrapped( url_in ){
    return new Promise( ( resolve , reject )=>{

        fetch( url_in )
        .then(response => response.json())
        .then(json => {
            resolve( json )
        });    
        
    } )
}




async function rawMaps(){
    console.log(' raw maps called in worke ')
    return new Promise( ( resolve , reject )=>{

        var promise1 = fetchWrapped( "/data/demo/mega.json" )
        var promise2 = fetchWrapped( "/data/demo/shiba.json" )
        var promise3 = fetchWrapped( "/data/demo/shibb.json" )
        Promise.all([ promise1 , promise2 , promise3 ]).then( (values) => {

            resolve( values )
        });
    })
}

async function downloadBlob( obj ){
    console.log(' DLB ')
    return new Promise( ( resolve , reject )=>{

        var blobpath ="/data/"+obj.url+".json" ;
        var promise1 = fetchWrapped( blobpath )
        Promise.all([ promise1  ]).then( (values) => {

            resolve( values )
        });
    })
}








export { rawMaps , downloadBlob }