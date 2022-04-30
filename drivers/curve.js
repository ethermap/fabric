


importScripts('/v_modules/ethers-5.1.umd.min.js');





async function markets(){

    return new Promise( ( resolve, reject ) => {
        fetch("https://api.curve.fi/api/getPools/ethereum/main")
        .then(res => res.json())
        .then(datObj => {

            var hashOfPools = {}
            for( var i in datObj.data.poolData ){
                var ob = datObj.data.poolData[i]
                console.log( 'POOL: ', ob.coins.length , ' : ', ob.address )
                for( var c in ob.coins ){
                    var cn = ob.coins[c]
                    var l =3;
                    console.log( '     ', cn.symbol , ethers.utils.formatUnits( cn.poolBalance , cn.decimals )  )
                    
                }
                //console.log( ob.id , ob.coins[0].symbol  , ob.coins[0].poolBalance , ob.coins[1].symbol , ob.coins[1].poolBalance  )
                var coin1 = ob.coins[0] 
                var coin2 = ob.coins[1]
                var bal1 = coin1.poolBalance / coin1.decimals
                var bal2 = coin2.poolBalance / coin2.decimals
                var k =3 
            }
            
            resolve( datObj ); 
        })
        .catch(err => { 
            // fetch("/data/geckmarv.json")
            // .then(res => res.json())
            // .then(out => {
            //     console.log('Checkout this JSON! ', out)	
            //     buildItems( out )
            // })
            // .catch(err => { 
            //     throw err 
            //     resolve( by_symbol ); 
            // });
            //throw err 
        });
    })    
    
}



var cv  = {
    markets
}