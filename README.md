

## Service Fabric 
![TFx](https://raw.githubusercontent.com/psytron/fabric/main/tfx.jpg)

#### Serice Worker Message Cue
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API manager.  passing web worker process manager. 


Install
```shell
# USER INSTALL
npm install https://github.com/psytron/fabric
# SUBMODULE INSTALL
git submodule add git@github.com:psytron/fabric path/to/project
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

### Appendix
Basic input appendix
