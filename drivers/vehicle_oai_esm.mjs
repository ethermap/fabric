

// YOU ARE HERE 
// 1. find archive of demo maps 
// 2. collect all as individual json or objects 
// 3. bubble it up as message so it can be loaded into vault 

import {io} from '/v_modules/socket.io.esm.min.js';


function startsocket(){

    const socket = io.connect("/pty");

    socket.on("pty-output", function (data) {
        console.log("new output received from server:", data.output);
        //term.write(data.output);
    });

    socket.on("connect", () => {
        console.log(' connected to pty ')
        //fitToscreen();
        //status.innerHTML ='<span style="background-color: lightgreen;">connected</span>';
    });

    socket.on("disconnect", () => {
        console.log(' disconnected pty ')
        //status.innerHTML ='<span style="background-color: #ff8383;">disconnected</span>';
    });    
    //const socket = new WebSocket('wss://localhost:9999/pty');
}


function query( obj_in ){
    return new Promise( ( resolve , reject )=>{
        var qrydef = "return just json list of objects containing top electric motor manufacturers in the world,  return only json array of objects with  no additional explanation or text, where each item contains corporation name , market cap as decimal dollars, headquarters location and annual evenue as decimal dollars. also add a type attribute to each item nd set it to rfid ";
        var obj = obj_in['params'];
        var qry = ('query' in obj) ? obj['query'] : qrydef; 
        var d = 'efo';
        const openaiEndpoint = '/oai';
        fetch( openaiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY_HERE'
            },
            body: JSON.stringify({ 
                prompt: qry + '  , return only json items as json , exclude any other explanation or text' ,
                x1x:"yoooo"
            })
        })
        .then(response => { 
            var f=55
            console.log('Received response:', response );
            // wow here i forgot to include return after adding {} to lambda function 
            return response.json()              
        })
        .then(json => {
            console.log('Received json:', json);
            resolve(json);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            reject(error);
        });
    })
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

function parseFeatures( features_in ){


    var f = features_in;

    var outlist = [];

    for( var f in features_in ){
        var obj_in = features_in[f];

        var obj={}
        obj.uuid=obj_in.properties.id;
        obj.name = obj_in.properties.name;
        
        obj.geometry = obj_in.geometry.coordinates;
        obj.brand = 'cablenet'
        obj.label='coord';
        if( obj_in.geometry.type == "MultiLineString" ){
            var i=7;
            obj.label='route';
            obj.geometry = obj_in.geometry.coordinates;
            obj.type=obj_in.geometry.type;
            obj.coordinates = [0,0,0];   
            obj.color = obj_in.properties.color;
            var ui = 1;
        }else{
            obj.coordinates = obj_in.geometry.coordinates;   
        }
        outlist.push( obj );
    }

    return outlist; 
    
}

async function features(){
    console.log(' raw maps called in worke ')
    return new Promise( ( resolve , reject )=>{

        var promise1 = fetchWrapped( "/data/undersea_landing_points.json" )
        var promise2 = fetchWrapped( "/data/undersea_cables.json" )
        Promise.all([ promise1 , promise2  ]).then( (values) => {

            var objects1 = parseFeatures( values[0]['features'] );
            var objects2 = parseFeatures( values[1]['features'] );
            var combinedObjects = [...objects1, ...objects2];
            resolve( { nodes:combinedObjects , links:[] , meta:{ origin:'extractor' } } )
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








export { query , startsocket }