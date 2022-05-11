







var abi_map = {

    uniswap_router:0x9999999,
    curve_router:0x99999,
    oneinch_router:0x9999

    
}








// DO EVERYTHING POSSIBLE TO GET ABI ( LOCAL + REMOTE )
async function getAbi( keyword_or_address ){

    return new Promise( async (resolve, reject) => {
        if( keyword_or_address in abi_map ){

            resolve( abi_map[keyword_or_address] )
        
        }else{
            var theabi = await fetchAbi( keyword_or_address )
            var objOut = theabi; 
            resolve(  objOut )
        }
    });

}













// LOAD ABI FROM REMOTE 
async function fetchAbi(addr_in) {
    // MAKE THIS MORE ROBUST WITH FALLBACKS TO LOCAL // 
    // OTHER SOURCES FOR OTHER NETWORKS - INTERNAL MAP 
    var address_of_contract = addr_in;
    var prom = new Promise(async (resolve, reject) => {
        var esk = '6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2';
        var url = 'https://api.etherscan.io/api?module=contract&action=getabi&address="+address_of_contract+"&apikey=6PGTMFT1C1WA8FP4Q9TQ5A2W17H5U4FIN2';
        var options = { json: true };
        const response = await fetch(url);
        const ab = await response.json();
        resolve(ab.result)
    });
    return prom;
}