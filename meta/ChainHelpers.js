const util = require('util');
const request = require('request');
var urllib = require('urllib');
var esk = '6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2';

async function fetchAbi( addr_in ){

    var prom = new Promise( ( resolve, reject ) => {
  
        var url = "https://api.etherscan.io/api?module=contract&action=getabi&address="+addr_in+"&apikey=6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2";
        var options = {json: true};
        urllib.request( url , function (err, data, res) {
            if (err) { throw err; }  // error 
            //console.log(res.statusCode);
            //console.log(res.headers);
            //console.log(data.toString()); // data is Buffer instance
            //console.log('abi loaf status:', response && response.statusCode); // Print the response status code if a response was received
            //console.log('body:', body);
            var abi_obj = JSON.parse( data );
            resolve( JSON.parse( abi_obj.result ) ); //  
        })
    });
    return prom;
}


module.exports = { fetchAbi }