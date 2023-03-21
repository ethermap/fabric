
import * as neo from './neo4j-web.js'



var objIn = { ke:'x' , se:'x'}
var testdb;
var testun;
var testpw;
var driver;
var session;
var resset=[];



async function init(obj){ 
    testdb = obj.url;
    //testdb = 'bolt://localhost:7687';
    testun = obj.ke;
    testpw = obj.se;
    driver = neo4j.driver(testdb, neo4j.auth.basic( testun, testpw ) , { disableLosslessIntegers: true } );    
    session = driver.session();
    var l = 1
};

 
async function query( dat ){

    return new Promise(   ( resolve , reject )=>{

        var qry; 
        if( 'pattern' in dat ){
            qry = "MATCH g = "+dat.pattern + " RETURN {nodes: apoc.coll.toSet(apoc.coll.flatten(collect(nodes(g)))), links: apoc.coll.toSet(apoc.coll.flatten(collect(relationships(g))))} as output limit 1000"; 
        }else{
            qry = "match x return x ";//+ 
            //var qry = "MATCH g = ()-[]-()  RETURN {nodes: collect(nodes(g)), edges: collect(relationships(g))} as output"
            qry = "MATCH g = (:Star)-[:SHINES]-(:Star) RETURN {nodes: apoc.coll.toSet(apoc.coll.flatten(collect(nodes(g)))), links: apoc.coll.toSet(apoc.coll.flatten(collect(relationships(g))))} as output";
        }

        var recs = []
        session.run( qry , {nameParam: 'Nones'}).then( result => {
            result.records.forEach(record => {
                console.log(record)
                var obj = record.toObject()
                recs= obj['output'];
                recs['meta']={ 
                    query:qry , 
                    channel:'neo' , 
                    origin:'neo' , 
                    foreign_id:'elementId', 
                    foreign_a:'startNodeElementId',
                    foreign_b:'endNodeElementId',
                    response:'success'}

                // Map(function (element, index, array) { /* … */ }, thisArg)
                // REMAP NODE UUIDs 
                recs.nodes = recs.nodes.map( function( element ){
                    element.uuid = element.elementId; 
                    element.origin = 'neo';
                    return element
                });
                // REMAP EDGE UUIDs
                recs.links = recs.links.map( function( element ){
                    element.uuid = element.elementId; 
                    element.a = element.startNodeElementId;
                    element.b = element.endNodeElementId;
                    element.origin = 'neo';
                    return element
                });
                resolve( recs );
            })
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => { 
            console.log( recs )
            //session.close()
            return recs;
        })        
    })
}

var working_entry_query=` MATCH (p)
WHERE ID(p) = 216
CALL apoc.path.spanningTree(p, {
    relationshipFilter: "KNOWS",
    relationshipFilter: "FOLLOWS>|KNOWS",    
	labelFilter: "+Engineering",
    labelFilter: "/Engineering",    
    minLevel: 1,
    maxLevel: 3
})
YIELD path as g
RETURN {nodes: apoc.coll.toSet(apoc.coll.flatten(collect(nodes(g)))), links: apoc.coll.toSet(apoc.coll.flatten(collect(relationships(g))))} as output;`



async function entry( dat ){

    return new Promise(   ( resolve , reject )=>{

        var node_id = dat.uuid ;
        var id_seg_1 = 'MATCH (p) WHERE ID(p) = 2111116';
        var tree_seg_2 = 'CALL apoc.path.spanningTree(p, { minLevel: 1, maxLevel: 3 }) YIELD path as g'; 
        var convert_seg_3 = 'RETURN {nodes: apoc.coll.toSet(apoc.coll.flatten(collect(nodes(g)))), links: apoc.coll.toSet(apoc.coll.flatten(collect(relationships(g))))} as output;'

        var qry = id_seg_1 + tree_seg_2 + convert_seg_3;

        var qry; 
        if( 'pattern' in dat ){
            qry = "MATCH g = "+dat.pattern + " RETURN {nodes: apoc.coll.toSet(apoc.coll.flatten(collect(nodes(g)))), links: apoc.coll.toSet(apoc.coll.flatten(collect(relationships(g))))} as output limit 1000"; 
        }else{
            qry = "match x return x ";//+ 
            //var qry = "MATCH g = ()-[]-()  RETURN {nodes: collect(nodes(g)), edges: collect(relationships(g))} as output"
            qry = "MATCH g = (:Star)-[:SHINES]-(:Star) RETURN {nodes: apoc.coll.toSet(apoc.coll.flatten(collect(nodes(g)))), links: apoc.coll.toSet(apoc.coll.flatten(collect(relationships(g))))} as output";
        }

        var recs = []
        session.run( qry , {nameParam: 'Nones'}).then( result => {
            result.records.forEach(record => {
                console.log(record)
                var obj = record.toObject()
                recs= obj['output'];
                recs['meta']={ 
                    query:qry , 
                    channel:'neo' , 
                    origin:'neo' , 
                    foreign_id:'elementId', 
                    foreign_a:'startNodeElementId',
                    foreign_b:'endNodeElementId',
                    response:'success'}

                // Map(function (element, index, array) { /* … */ }, thisArg)
                // REMAP NODE UUIDs 
                recs.nodes = recs.nodes.map( function( element ){
                    element.uuid = element.elementId; 
                    element.origin = 'neo';
                    return element
                });
                // REMAP EDGE UUIDs
                recs.links = recs.links.map( function( element ){
                    element.uuid = element.elementId; 
                    element.a = element.startNodeElementId;
                    element.b = element.endNodeElementId;
                    element.origin = 'neo';
                    return element
                });
                resolve( recs );
            })
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => { 
            console.log( recs )
            //session.close()
            return recs;
        })        
    })
}


async function merge( dat ){

    return new Promise(   ( resolve , reject )=>{

        var element_id = dat.payload.uuid ;
        var neo_id = element_id.split(':')[2];
        
        var query_base = 'MATCH (x) WHERE split(elementId(x), ":")[2] = "'+neo_id+'" ';
        var query_middle = ''
        delete dat.payload.uuid;
        console.log('build update query ')
        for (const [key, value] of Object.entries(dat.payload)) {
            query_middle +='SET x.'+key+'="'+value+'" ';
            console.log();
        }

        var qry = query_base+query_middle+"RETURN x"
        
        var qrggy = 'MATCH (x) \
        WHERE split(elementId(x), ":")[2] = "955" \
        SET x.birthdate = date("1980-01-01") \
        RETURN x';

        var recs = []
        session.run( qry , {nameParam: 'Nones'}).then( result => {
            result.records.forEach(record => {
                var obj = record.toObject()['x']
                
                recs['meta']={ 'query':qry , channel:'neo' , name:'neo', response:'success '}
                recs['nodes']=[obj];
                recs['links']=[];
                // map(function (element, index, array) { /* … */ }, thisArg)

                // REMAP NODE UUIDs 
                recs.nodes = recs.nodes.map( function( element ){
                    element.uuid = element.elementId; 
                    return element
                })
                // REMAP EDGE UUIDs
                recs.links = recs.links.map( function( element ){
                    element.uuid = element.elementId; 
                    element.a = element.startNodeElementId;
                    element.b = element.endNodeElementId;
                    return element
                })                
                resolve( recs );
            })
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => { 
            console.log( recs )
            session.close()
            return recs;
        })        
    }) ; // promise 
}



async function process( objIn ){

    return new Promise(   ( resolve , reject )=>{

        var payload = objIn.payload;
        var proc;
        var qry; 
        
        if( payload.identifier ){

            var id_seg_1 = 'MATCH (p) WHERE ELEMENTID(p) = "'+payload.identifier+'" ';
            var tree_seg_2 = 'CALL apoc.path.spanningTree(p, { minLevel: 1, maxLevel: 1 }) YIELD path as g '; 
            var convert_seg_3 = 'RETURN {nodes: apoc.coll.toSet(apoc.coll.flatten(collect(nodes(g)))), links: apoc.coll.toSet(apoc.coll.flatten(collect(relationships(g))))} as output '
            qry = id_seg_1 + tree_seg_2 + convert_seg_3;
            
        }else if( payload.pattern ){
            
            var pat_seq_1 = "MATCH g = "+payload.pattern+' ';
            var convert_seq = " RETURN {nodes: apoc.coll.toSet(apoc.coll.flatten(collect(nodes(g)))), links: apoc.coll.toSet(apoc.coll.flatten(collect(relationships(g))))} as output "; 
            qry = pat_seq_1 + convert_seq; 
            
        }else{
            
            qry = "match x return x ";//+ 
            //var qry = "MATCH g = ()-[]-()  RETURN {nodes: collect(nodes(g)), edges: collect(relationships(g))} as output"
            qry = "MATCH g = (:Star)-[:SHINES]-(:Star) RETURN {nodes: apoc.coll.toSet(apoc.coll.flatten(collect(nodes(g)))), links: apoc.coll.toSet(apoc.coll.flatten(collect(relationships(g))))} as output";
        }

        var recs = []
        session.run( qry , {nameParam: 'Nones'}).then( result => {
            result.records.forEach(record => {
                console.log(record)
                var obj = record.toObject()
                recs= obj['output'];
                recs['meta']={ 
                    query:qry , 
                    channel:'neo' , 
                    origin:'neo' , 
                    foreign_id:'elementId', 
                    foreign_a:'startNodeElementId',
                    foreign_b:'endNodeElementId',
                    response:'success'}

                // Map(function (element, index, array) { /* … */ }, thisArg)
                // REMAP NODE UUIDs 
                recs.nodes = recs.nodes.map( function( element ){
                    element.uuid = element.elementId; 
                    element.origin = 'neo';
                    element.label = element.labels[0];
                    return element
                });
                // REMAP EDGE UUIDs
                recs.links = recs.links.map( function( element ){
                    element.uuid = element.elementId; 
                    element.a = element.startNodeElementId;
                    element.b = element.endNodeElementId;
                    element.origin = 'neo';
                    return element
                });
                resolve( recs );
            })
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => { 
            console.log( recs )
            //session.close()
            return recs;
        })        
    })
}



// would this be easier than just method names based on calls: ? 
async function sendOperation( dat ){ 

    var meth = 'jxt'+dat.method; 
    var res = await call( meth , dat )
    return res; 
    
}

function buildTestDetabases(  ){
    var queries = [
        'MERGE ( x :Satellite { name:"Apollo" } )-[ :ORBITS ]->( y :Planet { name:"Jupiter" })  RETURN x',
        'MERGE ( x :Satellite { name:"Voyage" } )-[ :ORBITS ]->( y :Planet { name:"Jupiter" })  RETURN x',
        'RETURN'
    ]
    console.log(' DB CREATE ');
}

    //// LOCAL STORAGE 
function getLocal(){
    var item =  localStorage.getItem('sm');
    if( item ){
        var obj= JSON.parse( item )
        return obj;
    }else{
        return {};
    }
}

function pushLocal( dom , obj ){
    var item = this.getLocal()
    var newlocal = { ...item , ...obj }   
    localStorage.setItem( dom , JSON.stringify(obj) );
    return newlocal;
}

export { init, query , merge , process ,  sendOperation }