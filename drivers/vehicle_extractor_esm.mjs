

// YOU ARE HERE 
// 1. find archive of demo maps 
// 2. collect all as individual json or objects 
// 3. bubble it up as message so it can be loaded into vault 




async function rawMaps(){
    return new Promise( ( resolve , reject )=>{
        // search dirs
        fetch("/data/miccco/mega.json")
          .then(response => response.json())
          .then(json => {
              console.log(' archive: ')
              console.log(json)
          
          });
        var rwmap ={
            nodes:{a:19},
            links:{},
            meta:{}
        }
        resolve( rwmap )
    })
}








export { rawMaps }