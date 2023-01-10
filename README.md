## Process Fabric
Isolated process manager for [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). Features [Structured Clone](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) message bus using [Message Channel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) , standard [Event Target](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) interface, experimental scope isolation [LavaMoat](https://github.com/LavaMoat/LavaMoat) and [Global Scope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope), and configurable config provider. 


Install
```shell
# USER INSTALL
npm install https://github.com/ethermap/fabric
# SUBMODULE INSTALL
git submodule add git@github.com:ethermap/fabric path/to/project
```

Basic Usage: 

```javascript
// IMPORT 
import fabric from './fabric' 

// MERGE INTENTS
fabric.mergeIntent(  { module:'generic' , method:'authorize' } );

// SUBSCRIBE GENERIC EVENT LISTENERS
fabric.addEventListener( 'fabricEvent' , function( e ){
    let message = e.detail;
    message.uuid    // UUID OF ENTITY 
    message.method  // METHOD BEING CALLED 
    message.payload // COMPLETED SERVICE RESPONSE
});                        
```

### Documentation
Fabric enables parallel operations and aggregates the responses into a message bus. For credentialed operations Fabric will check vault or provider for available stored credentials and merge those at the time of worker spawning. This means you can spawn workers without credentials and as long as the underlying services support public access everything will flow smoothly. Fabric can aggregate events into specific channels or into a single event listener to route to your app. If you pass a specific listener function as an entry point into your application it will act as a message bus input. Once event flow is live on the message bus you can route them with any property on the response object, or the top level method property or uuid property which is standardized accross all messages. Most commonly you will want to pass your own UUID along with your intent object so that the returning events on the message bus can be routed to the appropriate component in your app. If you don't pass a UUID fabrid will generate a standard [Crypto.randomUUID](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) which will then be returned with all subsequent events. 

### Roadmap 
- Further improve Scope Isolation
- Expand Drivers ( ./drivers ) 
- Hierarchical Services Cache 

### Appendix
OCAP: [Ports as the basis of an object-capability model on the web](https://html.spec.whatwg.org/multipage/web-messaging.html#ports-as-the-basis-of-an-object-capability-model-on-the-web)




```javascript
var cv = await fabric.find("cloudvault")
var acv = await cv.auth(pk,pk) 
var pl = await 
// sequence
await ( f.curve ).auth( await f.find("vault") )
// parallel 
[ f.cue , f.auth ]
// path
fab.gp( )
//-> { meta:{} , nodes:[] , edges:[] }
```

## Fabric 
![TFx](https://raw.githubusercontent.com/psytron/fabric/main/meta/tfx.jpg)
