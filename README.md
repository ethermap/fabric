## Transactional Fabric
- [Structured Clone](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) compatible
- [Event Target](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) 
- process manager for [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) with [LavaMoat](https://github.com/LavaMoat/LavaMoat) and [Global Scope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope) scope isolation. 


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



## Fabric 
![TFx](https://raw.githubusercontent.com/psytron/fabric/main/meta/tfx.jpg)
