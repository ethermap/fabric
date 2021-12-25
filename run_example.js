import fabric from './fabric.js';


window.addEventListener( 'load' , function(){

    fabric.mergeIntent(  { domain:'coinbase',  fn:'init' , symbol:'BTC/USD' } );
    fabric.mergeIntent(  { domain:'ethereum',  fn:'init' , symbol:'ETH/USD' } );
    fabric.mergeIntent(  { domain:'binanceus', fn:'init' , symbol:'BTC/USD' } );
    //fabric.publishIntent(  { domain:['ccxt','coinbase','BTC/USD','init'] } );
    //fabric.publishIntent(  { domain:'ccxt.coinbase.btc.close' } );
    
    fabric.addEventListener( 'channelEvent' , function( e ){
        console.log('')
        var data=e.detail;
        var domain=data.domain;
        var symbol=data.symbol;
        var xclass=data.xclass; 
        var i=0;
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
 
