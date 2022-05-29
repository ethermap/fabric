




var start_time = new Date()
var singleton = ' UniqID_'+Math.round( Math.random()*99 ) 
function elapsed(){

    let timepassed = (new Date()-start_time)  / 1000
    console.log( singleton , timepassed )
    return timepassed 
    
}



async function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}


function delay(milisec){
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}			







function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}



export { sleep , uuidv4 , elapsed } 