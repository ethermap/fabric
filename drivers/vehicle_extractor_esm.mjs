

// YOU ARE HERE 
// 1. find archive of demo maps 
// 2. collect all as individual json or objects 
// 3. bubble it up as message so it can be loaded into vault 




async function rawMaps(){
    console.log(' raw maps called in worke ')
    return new Promise( ( resolve , reject )=>{
        // search dirs
        fetch("/data/miccco/mega.json")
          .then(response => response.json())
          .then(json => {
      
                var rwmap ={
                    nodes:json,
                    links:{},
                    meta:{}
                }
                resolve( rwmap )
          });

    })
}








export { rawMaps }