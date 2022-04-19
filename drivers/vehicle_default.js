

var driver;
var drivers = {
    ethers:'/v_modules/ethers-5.1.umd.min.js',
    ccxt:'/v_modules/viaoi.js',
    eo:'/v_modules/aois.js',
    default:'/v_modules/ethers-5.1.umd.min.js'
};

var methods = {
    wut:init,
    init:init
};


onmessage = function ( ob ){
    var obj = ob.data;

    methods[ obj.method ]( obj );
    
    console.log( obj.domain, '   default.onmessage:  ', obj );
}


function init( obj ){
    importScripts( drivers[ obj.driver ] );
    //driver = 
    
}
