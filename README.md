# fabric
### Simple future transactional message passing web worker process manager. 

Install
```shell
npm install https://github.com/psytron/fabric
```

Basic Usage: 

```javascript
import fabric from './fabric' 

fabric.publishIntent(  { fn:'init' , domain:'ethereum' , symbol:'ETH/USD' } );
fabric.publishIntent(  { fn:'init' , domain:'binanceus', symbol:'BTC/USD' } );
fabric.addEventListener( 'fabricEvent' , function( e ){

    var r=e.detail;
    var i=3;
})
```
