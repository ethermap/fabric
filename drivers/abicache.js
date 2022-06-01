

// CACHE for RESOURCES 
// Translate ENS 
// import { set,get , update,del, clear,keys,values,entries ,createStore } from './../../../web_modules/idb-keyval.js';
import * as idbkv from './../../../web_modules/idb-keyval.js';
const customStore = idbkv.createStore('abicache-db', 'abicache-store');

//import { set, createStore } from 'idb-keyval';



//set('hello', 'world', customStore);



var abi_map = {
 
    SHIB: 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE
 
}


var networks_symbols = {

    ethereum:{
        SHIB:'0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
        USDT:'0xdac17f958d2ee523a2206206994597c13d831ec7',
        WBTC:'0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        uniswap_router:'0x0000000000009999999',
        curve_router:'0x00000000000000099999',
        oneinch_router:'0x000000000000000009999'
    },
    avalanche:{
        BTC:'0x0x0x0x0x0'
    }
    
}


// DO EVERYTHING POSSIBLE TO GET ABI ( LOCAL + REMOTE )
// CACHE ABI BLOBS BASED ON COMPOSITE KEY network + address 
async function get( keyword_or_address='USDT' , network='ethereum' ){

    // CONVERT NAME TO ADDRESS //
    // CHECK IF KEY IS IN DB AND RETURN 
    // ELSE LOAD STORE and RETurn 
    // keyword_or_address in abi_map
    // check if its keyword and convert to address 
    var addr;
    
    if( keyword_or_address.includes('0x') ){                 // STRAIGHT ADDRESS 
        addr = keyword_or_address;  
                                                            // LOCAL DIRECTORY  ( soon name.eth )
    }else if( keyword_or_address in networks_symbols[ network ] ){
        addr = networks_symbols[ network ][ keyword_or_address ]
    }else{
        addr = keyword_or_address
    }
    var composit_cache_key = addr +'.'+network     

    // burnsKVS 
    // function deleteAll( d ){
    //     var vls = await idbkv.keys()
    //     for( var v in vls ){
    //         var k = vls[v]
    //         console.log( k )
    //         if( k != 'x' || k != 'v' ){
    //             await idbkv.del( k )
    //         }
    //     }
    // }       
    // deleteAll()

    return new Promise( async (resolve, reject) => {
        var loc_abi = await idbkv.get( composit_cache_key , customStore )        
        if( loc_abi ){
                                // SEND BACK LOCAL DB 
            resolve( loc_abi )
        }else{
                                // GET ABI FROM ETHERSCAN SAVE LOCAL 
            let theabi = await fetchAbi( addr )
            let savcod = await idbkv.set( composit_cache_key , theabi , customStore )        
            var objOut = theabi; 
            resolve(  objOut )
        }
    });
}

 

// CONVENIENCE TO CONVERT SYMBOL TO ADDRESS ( for contracts )
async function addr( symbol='WBTC' , network='ethereum' ){
    
    // ASYNC FOR ENS : 
    // provider.resolveName
    return new Promise( async (resolve, reject) => {
        var addr_out ;
        if( symbol in networks_symbols[ network ] ){
            addr_out = networks_symbols[ network ][ symbol ]            
        }else{
            addr_out = 'UNKNOWN'
        }
        resolve( addr_out )
    });
}



// LOAD ABI FROM REMOTE ETHERSCAN   TODO: Remove Shared-API-Key 
async function fetchAbi(addr_in) {
    // MAKE THIS MORE ROBUST WITH FALLBACKS TO LOCAL // 
    // OTHER SOURCES FOR OTHER NETWORKS - INTERNAL MAP 
    var address_of_contract = addr_in;
    var prom = new Promise(async (resolve, reject) => {
        var esk = '6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2';
        var url = 'https://api.etherscan.io/api?module=contract&action=getabi&apikey=6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2&address='+address_of_contract;
        var options = { json: true };
        const response = await fetch(url);
        const ab = await response.json();
        resolve(ab.result)
    });
    return prom;
}


export { get , addr , networks_symbols }







async function get_or_write_and_return( ){

    var local_abi = await idbkv.get( composit_cache_key )
    
    return new Promise( async (resolve, reject) => {
        // save abi  
        // x / f / q
        // x / r / q
        await idbkv.set( 'xoxox' ,  {  blob:83838  }  )
        await idbkv.set( 'SHIB.ethereum.abi' ,  zabi  )
        await idbkv.set( 'woomp' ,  zabi  )
        await idbkv.set( 'woomp2' ,  { abi:zabi}  )
        var obj = await idbkv.get( 'xoxox' )
        var ab2 = await idbkv.get( 'SHIB.ethereum.abi' )
        var lst = await idbkv.values();
        var lsts = await idbkv.keys();
        var enr = await idbkv.entries();

    }) // Promise 
}






// provider.getHistory( address ) 

