var u = 98;
function vf(){
    console.log( u , ' vf ');
}



const inspectMethods = (obj = {}) => {
    const members = Object.getOwnPropertyNames(obj);
    const methods = members.filter(el => {
        return typeof obj[el] === 'function';
    })
    return methods;
};



async function fetchAbi( addr_in ){
    var prom = new Promise( async ( resolve, reject ) => {
        var esk = '6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2';
        var url = "https://api.etherscan.io/api?module=contract&action=getabi&address="+addr_in+"&apikey=6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2";
        var options = {json: true};
        const response = await fetch( url );
        const ab = await response.json();
        resolve( ab.result )
    });
    return prom;
}




// CALLBACK REPEAT 
var intervalID = setInterval(myCallback, 3500, 'Parameter 1', 'Parameter 2');
async function myCallback(a, b)
{


}




    //var mems = Object.getOwnPropertyNames( v );
    //console.log( inspectMethods(v));