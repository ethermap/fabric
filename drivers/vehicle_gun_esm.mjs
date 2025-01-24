import Gun from 'gun/gun';

var gun;
var peers = [];

async function init(obj) {
    gun = Gun(obj.url);

    // Start a process to check for peers every 10 seconds
    setInterval(() => {
        peers = Object.keys(gun.back('opt.peers'));
        console.log('Connected peers:', peers);
    }, 10000);
}

async function query(dat) {
    return new Promise((resolve, reject) => {
        if ('pattern' in dat) { 
            gun.get(dat.pattern).once((data) => {
                if (data) {
                    resolve({ nodes: [data], links: [], meta: { response: 'success' } });
                } else {
                    reject('No data found');
                }
            });
        } else {
            gun.get('default').once((data) => {
                if (data) {
                    resolve({ nodes: [data], links: [], meta: { response: 'success' } });
                } else {
                    reject('No data found');
                }
            });
        }
    });
}

async function merge(dat) {
    return new Promise((resolve, reject) => {
        var node_obj = dat.object;
        gun.get(node_obj.elementId).put(node_obj.properties, (ack) => {
            if (ack.err) {
                reject(ack.err);
            } else {
                resolve({ nodes: [node_obj], links: [], meta: { response: 'success' } });
            }
        });
    });
}

async function process(objIn) {
    return new Promise((resolve, reject) => {
        var params = objIn.params;
        if (params.identifier) {
            gun.get(params.identifier).once((data) => {
                if (data) {
                    resolve({ nodes: [data], links: [], meta: { response: 'success' } });
                } else {
                    reject('No data found');
                }
            });
        } else if (params.pattern) {
            gun.get(params.pattern).once((data) => {
                if (data) {
                    resolve({ nodes: [data], links: [], meta: { response: 'success' } });
                } else {
                    reject('No data found');
                }
            });
        } else if (params.object) {
            var node_obj = params.object;
            gun.get(node_obj.elementId).put(node_obj.properties, (ack) => {
                if (ack.err) {
                    reject(ack.err);
                } else {
                    resolve({ nodes: [node_obj], links: [], meta: { response: 'success' } });
                }
            });
        } else {
            gun.get('default').once((data) => {
                if (data) {
                    resolve({ nodes: [data], links: [], meta: { response: 'success' } });
                } else {
                    reject('No data found');
                }
            });
        }
    });
}

async function sendOperation(dat) {
    var meth = 'jxt' + dat.method;
    var res = await call(meth, dat);
    return res;
}

function getLocal() {
    var item = localStorage.getItem('sm');
    if (item) {
        var obj = JSON.parse(item);
        return obj;
    } else {
        return {};
    }
}

function pushLocal(dom, obj) {
    var item = this.getLocal();
    var newlocal = { ...item, ...obj };
    localStorage.setItem(dom, JSON.stringify(obj));
    return newlocal;
}

export { init, query, merge, process, sendOperation };