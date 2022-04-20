## Transact Fabric
Parallel process manager for isolated [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). Features [Structured Clone](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) message bus, auto spawn, standard [Event Target](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) interface, scope isolation [LavaMoat](https://github.com/LavaMoat/LavaMoat) and [Global Scope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope), and configurable config provider. 


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

### Documentation
Fabric is designed to enable parallel network operations and aggregate the responses into a message bus. For credentialed operations Fabric will check vault or provider for available stored credentials and merge those at the time of worker spawning. This means you can spawn workers without credentials and as long as the underlying services support public access everything will flow smoothly. Fabric can aggregate events into specific channels or into a single event listener to route to your app. If you pass a specific listener function as an entry point into your application it will act as a message bus input. Once event flow is live on the message bus you can route them with any property on the response object, or the top level method property or uuid property which is standardized accross all messages. Most commonly you will want to pass your own UUID along with your intent object so that the returning events on the message bus can be routed to the appropriate component in your app. If you don't pass a UUID fabrid will generate a standard (Crypto.randomUUID())[https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID] which will then be returned with all subsequent events. 

### Roadmap 
- Further improve isolation of individual worker scopes. 
- Epand available drivers ( in drivers dir ) 

### Appendix
Basic input appendix


## Fabric 
![TFx](https://raw.githubusercontent.com/psytron/fabric/main/meta/tfx.jpg)
