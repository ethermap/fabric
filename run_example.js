import fabric from './fabric.js';


window.addEventListener( 'load' , function(){

    fabric.spawnProcess(  { fn:'init' , domain:'coinbase' , symbol:'BTC/USD' } );
    fabric.spawnProcess(  { fn:'init' , domain:'ethereum' , symbol:'ETH/USD' } );
    fabric.spawnProcess(  { fn:'init' , domain:'binanceus', symbol:'BTC/USD' } );
    
    fabric.addEventListener( 'fabricEvent' , function( e ){

        var r=e.detail;
        var i=3;
    })
    //fabric.echoFunction(  { seek:nodeIDparamDomain[ domain, symbol ]( x,y,z*,s,t ) . demand:priceVector   })
    //fabric.spawnRequest(  { domain:symbol:xclass } )

    //fabric.publishIntent( { domain:'x', symbol:'XYZ', xclass:'priceTelemetryObject'  } );
    //fabric.addEventListener( 'domain.event' , function( e ){ } )
    
    /*
    fabric.addEventListener( 'message' , function( e ){    
        var object_vector = e.data.domain + '.' +e.data.xclass;
        isoModel.pushUpdate( object_vector , e.data.tick  );
    });    */

});
 
