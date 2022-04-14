

## Fabric 
![TFx](https://raw.githubusercontent.com/psytron/fabric/main/meta/tfx.jpg)

#### Serice Worker Message Cue
Event based and process manager for [Mozilla Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
message passing web worker. 


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
fabric.addEventListener( 'channelEvent' , function( e ){} );
fabric.addEventListener( 'channelEvent' , yourApp.pubSubHook );

fabric.mergeSequence( [ { fn:'withdraw' , domain:'vilqs' , symbol:'BTC/USD' }, 
                        { fn:'withdraw' , domain:'vilqs' , symbol:'BTC/USD' } ] );
```

### Appendix
Basic input appendix
