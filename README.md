## Transactional Fabric
Simple automatic process manager for isolated [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) instances. Features [Structured Clone](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) compatible, automatic worker spawning for nonexistent service identifiers, standard [Event Target](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) interface, scope isolation with [LavaMoat](https://github.com/LavaMoat/LavaMoat) and [Global Scope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope) for seperation of sensitive credentials, and configurable credential provider. 


Install
```shell
# USER INSTALL
npm install https://github.com/psytron/fabric
# SUBMODULE INSTALL
git submodule add git@github.com:psytron/fabric path/to/project
```

Basic Usage: 

```javascript
// IMPORT 
import fabric from './fabric' 

// SUBSCRIBE EVENT LISTENERS
fabric.addEventListener( 'fabricEvent' , yourApp.action );
fabric.addEventListener( 'fabricEvent' , function( e ){
    let message = e.detail;
    message.uuid    // UUID OF ENTITY 
    message.method  // METHOD BEING CALLED 
    message.payload // COMPLETED SERVICE RESPONSE
});

// MERGE INTENTS ROUTED TO SERVICES
fabric.mergeIntent(  { method:'fetchOrders' , domain:'ethereum' , symbol:'ETH/USD' } );
fabric.mergeIntent(  { method:'fetchTicker' , domain:'binanceus', symbol:'BTC/USD' } );
fabric.mergeSequence( [ { method:'withdraw' , domain:'vilqs' , symbol:'BTC/USD' }, 
                        { method:'withdraw' , domain:'vilqs' , symbol:'BTC/USD' } ] );
```

### Appendix
Basic input appendix


## Fabric 
![TFx](https://raw.githubusercontent.com/psytron/fabric/main/meta/tfx.jpg)
