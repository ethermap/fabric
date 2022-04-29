
















async function markets(){

    return new Promise( ( resolve, reject ) => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
        .then(res => res.json())
        .then(datObj => {
            var by_symbol = {}
            for ( var i in datObj )
            {
                var curobj = datObj[i];
                by_symbol[ curobj['symbol'] ]=curobj;
            }
            //buildItems( out )
            //var wer = Object.entries( out ).map( ([key, value]) => { return value  })
            var r = 3
            by_symbol['avax']
            resolve( by_symbol ); 
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



var cg  = {
    markets
}