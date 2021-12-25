
## Time Fabric 
#### Transactional LL2 Serice Worker Manager
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API manager.  passing web worker process manager. 

Install
```shell
npm install https://github.com/psytron/fabric
```

Basic Usage: 

```javascript
import fabric from './fabric' 

fabric.mergeIntent(  { fn:'init' , domain:'ethereum' , symbol:'ETH/USD' } );
fabric.mergeIntent(  { fn:'init' , domain:'binanceus', symbol:'BTC/USD' } );
fabric.addEventListener( 'channelEvent' , function( e ){

    var r=e.detail;
    var i=3;
})
```
