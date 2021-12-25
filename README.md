
## Time Fabric 
#### Transactional L2 Serice Worker worker manager.  passing web worker process manager. 

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
