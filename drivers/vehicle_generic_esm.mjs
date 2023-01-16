


 

async function init(obj){ 

    console.log(" running init on Generic  ", obj );

    var l = 1
};

//import { official_base , session_fragment } from './util.js'
/*
async function postProc( data = {}) {
    console.log(' POST PROC ')
    var zurl = official_base+"/jxt"+data.action;
    // Default options are marked with *
    const response = await fetch(zurl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then( zresponse => {
        return zresponse.json()
    })
    .then( zdata => {
        return zdata
    })
    .catch((error) => {
        return {err:true,message:'Connection Error'}
    });
    return response
}
*/


async function call( path , dat ){
    var window = globalThis;
    var official_base = 'http://localhost:8851'
    var urlx = official_base+'/'+path;
//    const enc = new TextEncoder();
//    var encoded= enc.encode( dat['pw'] );    
//    const iv = window.crypto.getRandomValues(new Uint8Array(12));
//    var r =  window.crypto.subtle.encrypt({ name:'AES-GCM',iv:iv },'keyzs',encoded);
 
    var res = await fetch(  urlx , {
        method:'POST',
        headers: {
            "Content-type":'application/json'
        },			
        body: JSON.stringify(dat)
    })
    .then( function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }).then(function(response) {
        return response
    }).catch(function(error) {
        console.log(error);
        return  { 
            status:"ERR ",
            error: error
        }
    });

    if( res.status == 200 ){
        return res.json()
    }else{
        return res;    
    }
}
    


async function auth( dat ){

    var res = await call( 'jxtlogin' , dat )
    return res;

}


async function register( dat ){

    var res = await call( 'jxtreg' , dat )
    return res; 

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



export { init , auth , register }

















// wow loaded with import but saving ?
// reg( data ){
//     var prom = new Promise( ( resolve, reject ) => {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (xhttp.readyState==4 ) {
//                 if( xhttp.status == 200){
//                     var resObj = JSON.parse(xhttp.responseText);
//                     var outmessage =resObj.message;
//                     var jtkn = resObj.tkn
//                     resolve( resObj )

//                 }else{
//                     resolve( { error:true  , message:'Connection Error: T1' } );
//                 } //window.location.replace('/');
//             }else{
//                 resolve( { error:true  , message:'Connection Error: T2' } );
//             }
//         };
//         // xhttp.open("POST", official_base+"/jxtavail", true);
//         //xhttp.withCredentials = true;
//         xhttp.open("POST", official_base+"/jxtreg", true);
//         xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
//         xhttp.send(JSON.stringify(data));
//     });
//     return prom;
// }

// // wow loaded with import but saving ?
// reset( data ){
//     var prom = new Promise( ( resolve, reject ) => {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (xhttp.readyState==4 ) {
//                 if( xhttp.status == 200){
//                     var resObj = JSON.parse(xhttp.responseText);
//                     var outmessage =resObj.message;
//                     var jtkn = resObj.tkn
//                     resolve( resObj )

//                 }else{
//                     resolve( { error:true  , message:'Connection Error: T1' } );
//                 } //window.location.replace('/');
//             }else{
//                 resolve( { error:true  , message:'Connection Error: T2' } );
//             }
//         };
//         // xhttp.open("POST", official_base+"/jxtavail", true);
//         //xhttp.withCredentials = true;
//         xhttp.open("POST", official_base+"/jxtreset", true);
//         xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
//         xhttp.send(JSON.stringify(data));
//     });
//     return prom;
// }

// // wow loaded with import but saving ?
// proc( data ){
//     var prom = new Promise( ( resolve, reject ) => {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (xhttp.readyState==4 ) {
//                 if( xhttp.status == 200){
//                     var resObj = JSON.parse(xhttp.responseText);
//                     var outmessage =resObj.message;
//                     var jtkn = resObj.tkn
//                     resolve( resObj )

//                 }
//                 else if( xhttp.status == 404 ){
//                     var cei = 0;
                    
//                 }    
//                 else{
//                     resolve( { error:true  , message:'Connection Error: T1' } );
//                 } //window.location.replace('/');
//             }else{
//                 resolve( { error:true  , message:'Connection Error: T2' } );
//             }
//         };

//         //xhttp.withCredentials = true;
//         xhttp.open("POST", official_base+"/jxt"+data.action, true);
//         xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
//         xhttp.send(JSON.stringify(data));
//     });
//     return prom;
// }


// savemap( data ){
//     var prom = new Promise( ( resolve, reject ) => {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (xhttp.readyState==4 ) {
//                 if( xhttp.status == 200){
//                     var resObj = JSON.parse(xhttp.responseText);
//                     var outmessage =resObj.message;
//                     var jtkn = resObj.tkn
//                     resolve( resObj )

//                 }else{
//                     reject( 'error in login ')
//                 } //window.location.replace('/');
//             }
//         };
//         // xhttp.open("POST", official_base+"/jxtavail", true);
//         //xhttp.withCredentials = true;
//         xhttp.open("POST", official_base+"/jxtsavemap", true);
//         xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
//         xhttp.send(JSON.stringify(data));
//     });
//     return prom;
// }







// checkstatus(){
//     var prom = new Promise( ( resolve, reject ) => {        
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function( resx) {
//             if (xhttp.readyState==4 && xhttp.status==200){
//                 var resObj = JSON.parse( xhttp.responseText )
//                 console.log(' status check res ')
//                 if( resObj.username =='UNKNOWN'){
//                     resolve( resObj )    
//                 }else{
//                     reject( false )
//                 }
//             };    

//         }.bind(this )
//         xhttp.open("POST", official_base+"/jxtstatus", true);
//         xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
//         xhttp.send();
//     });
//     return prom; 
// }         



// logout(){
//     var prom = new Promise( ( resolve, reject ) => {        
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (xhttp.readyState==4 && xhttp.status==200){
//                 var response = JSON.parse(xhttp.responseText);
//                 console.log( response.message );  
//                 resolve( response )
//             }
//             if(xhttp.readyState==4 && xhttp.status==403){
//                 console.log( httpx.responseText ); 
//                 resolve( httpx.responseText  )
//             }
//         }
//         //xhttp.withCredentials = true;
//         xhttp.open("POST", official_base+"/jxtlogout", true);
//         xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
//         xhttp.send();
//     })
//     return prom;
// }

// getAbiForAddress( addr_in ){
//     var Web3 = require('web3');
//     var web3 = new Web3(new Web3.providers.HttpProvider());
//     var version = web3.version.api;
            
//     $.getJSON('https://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359', function (data) {
//         var contractABI = "";
//         contractABI = JSON.parse(data.result);
//         if (contractABI != ''){
//             var MyContract = web3.eth.contract(contractABI);
//             var myContractInstance = MyContract.at("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359");
//             var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
//             console.log("result1 : " + result);            
//             var result = myContractInstance.members(1);
//             console.log("result2 : " + result);
//         } else {
//             console.log("Error" );
//         }            
//     });
// }

// pingyo(){
//     let promise = new Promise(function(resolve, reject) {
//         setTimeout( () =>{  resolve("done") }, 2000);
//     });
//     return promise;
// }
// updateNodeAsync( data ){

    
//     // WRITE NEO 4J 
//     var prom = new Promise( ( resolve, reject ) => {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (xhttp.readyState==4 ) {
//                 if( xhttp.status == 200){
//                     var resObj = JSON.parse(xhttp.responseText);
//                     var outmessage =resObj.message;
//                     var jtkn = resObj.tkn
//                     resolve( resObj )

//                 }else{
//                     reject( 'error in login ')
//                 } //window.location.replace('/');
//             }
//         };
//         // xhttp.open("POST", official_base+"/jxtavail", true);
//         //xhttp.withCredentials = true;
//         xhttp.open("POST", official_base+"/jxtsavenode", true);
//         xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
//         xhttp.send(JSON.stringify(data));
//     });
//     return prom;        
// }    

// getJsonFromUrl(url) {
//     if(!url) url = location.href;
//     var question = url.indexOf("?");
//     var hash = url.indexOf("#");
//     if(hash==-1 && question==-1) return {};
//     if(hash==-1) hash = url.length;
//     var query = question==-1 || hash==question+1 ? url.substring(hash) : 
//     url.substring(question+1,hash);
//     var result = {};
//     query.split("&").forEach(function(part) {
//         if(!part) return;
//         part = part.split("+").join(" "); // replace every + with space, regexp-free version
//         var eq = part.indexOf("=");
//         var key = eq>-1 ? part.substr(0,eq) : part;
//         var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
//         var from = key.indexOf("[");
        
//         if(from==-1) result[decodeURIComponent(key)] = val;
//         else {
//             var to = key.indexOf("]",from);
//             var index = decodeURIComponent(key.substring(from+1,to));
//             key = decodeURIComponent(key.substring(0,from));
//             if(!result[key]) result[key] = [];
//             if(!index) result[key].push(val);
//             else result[key][index] = val;
//         }
//     });
//     return result;
// }


// }





// wow loaded with import but saving ?
// async function auth_c1( data ){
    
//     var prom = new Promise( ( resolve, reject ) => {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (xhttp.readyState==4 ) {
//                 if( xhttp.status == 200){
//                     var resObj = JSON.parse(xhttp.responseText);
//                     var outmessage =resObj.message;
//                     var jtkn = resObj.tkn
//                     resolve( resObj )

//                 }else{
//                     resolve( { error:true , message:'Connection Error: T1' } );
//                 } //window.location.replace('/');
//             }else{
//                 console.log(' readyState not 4')
//                 //resolve( { error:true  , message:'Connection Error: T2' } );
//             }
//         };
        
//         // xhttp.open("POST", official_base+"/jxtavail", true);
//         // xhttp.withCredentials = true;

//         var official_base = 'http://localhost:8511'
//         xhttp.open("POST", official_base+"/jxtlogin", true);
//         xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
//         xhttp.send(JSON.stringify(data));
//     });
//     return prom;
// }
