importScripts('/v_modules/ethers-5.1.umd.min.js'); // DEFI 



var tick ={ returned:'dat'}
var messageStruct = {
    fn:'fetchTicker',
    obj:tick , 
    domain:this.domain
}
var routes = {
    'init':init,
    'close':init
}
var wid = 'w'+ Math.round( Math.random()*9999 );
var access_count = 0;
var provider ; 
var wallet ; 
var initObj;



onmessage = function(e) {
    console.log('Worker Vehicle CRBAUT: '+ wid+' Receives Message Data:', e.data );

    importScripts('/x_modules/fabric/misc.js'); 
    
    initObj = e.data;
    var xclass = ( 'fn' in e.data ) ? e.data.fn : ( 'xclass' in e.data )? e.data.xclass : 'init';
    
    routes[ xclass ]( e.data );

}


async function init( obj ){
    console.log( ' init in Worker: ', wid , this , self );
    
    


    var url = "https://api.domaintools.com/v1/google.com/whois/";
    fetchData( url , {} ).then(data => {
        console.log( data )
    });


    initObj=obj;
    
    var d6d_pk = "0x";    
    var d6d_addr = "0x"
    var dcc_addr = "0x"
    // PROVIDERS 
    // provider = new ethers.providers.AlchemyProvider();
    // provider =  new ethers.providers.JsonRpcProvider('https://poly/gon/rpc'); 
    // provider =  new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');
    provider =  new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
    var walletPrivateKey = new ethers.Wallet( d6d_pk ); // D6D5
    wallet = walletPrivateKey.connect(provider)
    var tx = { 
        to: dcc_addr,
        value: ethers.utils.parseEther("1.0"),
        gasPrice:25 * 1000000000,
        gasLimit:800000,
        data:'0x00000000000000000000000000000000000000000000000091ea63d55b1b0000',
    }

    //var tx_signed = await wallet.signTransaction(tx);
    var signedTx = await wallet.sendTransaction( tx ); //signs it 
    //var l = 0;
    var receipt = await signedTx.wait();    
    var u = 0;

    //var signedTx = await wallet.sendTransaction(unsignedTx)
 
    // The connect method returns a new instance of the
    // Wallet connected to a provider
    

    // CALLBACK REPEAT 
    //var intervalID = setInterval( updateInterval , 9000, 'Parameter 1', 'Parameter 2');
    

    var account_addr='0x0cfED089B928796bd548104810499251334bF012' ;
    var teams = await getTeamsByAddr( account_addr ); 
    await monitorIteration( { WPkey:0x30 , WAddr:account_addr , Teams:teams });

    getTeamsByAddr('0x0cfED089B928796bd548104810499251334bF012');
    getGamesByAddr('0x0cfED089B928796bd548104810499251334bF012');
    provider.getBlockNumber().then( async (result) => {   console.log("Current Avalanche block number: " + result);     });
 
}

async function updateInterval(a, b)
{
    console.log(' crab: ', wid  , initObj );

    getTeamsByAddr('0x0cfED089B928796bd548104810499251334bF012');
    getGamesByAddr('0x0cfED089B928796bd548104810499251334bF012');
}




async function fetchData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        Origin: "https://qx.com",
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'//, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}





async function getTeamsByAddr(accAddr){
    return new Promise((resolve, reject) => {
        var url = "https://idle-api.crabada.com/public/idle/teams?user_address="+accAddr+"&limit=20";
        fetchData( url , {} ).then(data => {
            resolve( data['result']['data'] )
        });
    
    })

}

async function getGamesByAddr(addr){
    return new Promise((resolve, reject) => {
        var url = "https://idle-api.crabada.com/public/idle/mines?status=open&user_address="+addr+"&limit=20";
        console.log(' OPEN MINES: ')
        fetchData( url , {} ).then(data => {
            resolve( data['result']['data'] )
        });
    });
}




async function sendTx( addr, private, data, type ){
    var gp = 25; // # gas 费
    var raw_game_address = '0x82a85407bd612f52577909f4a58bfc6873f14da8';                                                                                             // def sendTx(addr, private, data, type):
    var reciev_add = ethers.utils.getAddress( addr );            // reciev_add = Web3.toChecksumAddress(addr)
    var game_add = ethers.utils.getAddress( raw_game_address );  // game_add = Web3.toChecksumAddress('0x82a85407bd612f52577909f4a58bfc6873f14da8')
    var nonce = await provider.getTransactionCount( reciev_add );  // nonce = w3.eth.getTransactionCount(reciev_add)
    // 1 000 000 000  Gwei =  1 ETH 
    // 1 000 000 000 000 000 000 Wei = 1 ETH 
    var gasprice = gp * 1000000000;                             /// gasprice = int(Web3.toWei(gp, 'Gwei'))
     
    var signed_txn = await wallet.signTransaction({             //var signed_txn = w3.eth.account.signTransaction( , private)
        nonce:nonce,
        gasPrice:gasprice,
        gas:400000,
        to:game_add,
        value: 0,  //Web3.toWei(0, 'ether'),
        data:data,
        chainId:43114
    })
    
    const txs = signer.sendTransaction( signed_txn );
    //signed = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    signed_txid = Web3.toHex(signed)
    timeout = 1800  //# 监听交易是否成功的秒数
    interval = 1 
    receipt = waitForReceipt(w3, signed_txid, timeout, interval)
    
    if( type == 'end' ){
        transferTus(addr, private);
    }
}
// CYBERFRAME //
var numstr = '0000000000000000000000000000000000000000000000000000000000000000';
async function startGame(addr, private, team){
    var teamid = numstr + (team).toString(16); // teamid = numstr + hex(team).replace('0x', '')
    var data = '0xe5ed1d59'+teamid.slice(-64); // data = '0xe5ed1d59' + teamid[-64:]
    // 'expected str : '
    // '0xe5ed1d590000000000000000000000000000000000000000000000000000000000002c05'
    // '0x2d6ef31000000000000000000000000000000000000000000000000000000000001580d9'
    // '0x00000000000000000000000000000000000000000000000041eb63d55b1b0000' // ethers 
    // '0x 2d6ef310 00000000 00000000 00000000 00000000 00000000 00000000 00000000 001580d9'
    console.log("_____________{} 队伍 team{} 开始挖矿 start mining: ",team);
    sendTx(addr, private, data, 'start');
};

async function endGame(addr, private, game){
    var gameid = numstr + (game).toString(16);  // gameid = numstr + hex(game).replace('0x', '')
    var data = '0x2d6ef310'+gameid.slice(-64); // data = '0x2d6ef310' + gameid[-64:]
    console.log("_____________{} 结算 GameId：{}  ...",game);
    sendTx(addr, private, data, 'end');
}


async function lend(addr, private, miner){
    while( true ){
        r = requests.get()
        
        var url = 'https://idle-api.crabada.com/public/idle/crabadas/lending?orderBy=price&order=asc&page=1&limit=10000';
        var data = await fetchData( url , {} ).then(data => {
            return data['result']['data']
        });

        
        time.sleep(2)

    }

    //data = r.json()
    var cra={}
    for( var i in data['result']['data'] ){
        var item = data['result']['data'][i];
        if( item['battle_point'] + miner['defense_point'] > miner['attack_point'] ){
            var cra = item;
            break
        }
    }
    if( cra['price'] < 60000000000000000000 ){  // #60tus
        //craid=numstr + hex(cra['crabada_id']).replace('0x','')
        //gameid=numstr + hex(miner['game_id']).replace('0x','')
        //price=numstr + hex(cra['price']).replace('0x','')
        //data='0x3dc8d5ce' + gameid[-64:] + craid[-64:] + price[-64:]
        //sendTx(addr, private, data, 'lend')
    }
    else{
        
    };
}

async function monitorIteration( ai ){

    
    var key = ai.WPkey
    var address = ai.WAddr
    var teams = ai.Teams
    var games = await getGamesByAddr(address)
    var gameObj = {};
    
    for( g in games ){
        var game = games[g];
        gameObj[ game['game_id'] ] = game;
    }
    //# print(teams)

    console.log("Address  The team information is as follows:");
    for( t in teams ){
        var team = teams[t];
        console.log("   TeamID: " +team['team_id']+"   GameID:   "+team['game_id'] )
        if( team['game_id'] ){
            if( team['game_type'] != 'mining'){
                continue
            };
            var nowtime = Number( ( Date.now() / 1000 ).toFixed(0) );
            if( nowtime > team['mine_end_time'] ){
                endGame(address, key, team['game_id'])
            }
            else{
                //# startGame(address, key, team['team_id']) ## remove line 
                //# 0x0cfED089B928796bd548104810499251334bF012
                var nowgame = gameObj[ String(team['game_id']) ]
                var lenx = nowgame['process'].length
                if( nowgame['attack_point'] != false && nowgame['attack_point'] > nowgame['defense_point'] && lenx < 6){
                    if( nowgame['process'][lenx-1]['action'] == 'attack' || nowgame['process'][lenx-1]['action'] == 'reinforce-attack'){
                        if( nowtime - nowgame['process'][lenx-1]['transaction_time'] < 1800){
                            lend(address, key, nowgame)
                        }
                        else{
                            console.log("   游戏: {}  Unable to hire after the employment time has expired 已超过雇佣时间无法雇佣".format(nowgame['game_id']))
                        };
                    };
                };
           };
        }
        else{
            startGame(address, key, team['team_id'])
        };
    }

    await new Promise(r => setTimeout(r, 12000));
    //time.sleep(30)
}



async function regwhat(){


    


    // Create a wallet instance from a mnemonic...
    var mnemonic = "woop woop weiz"
    var mnem = "vogue zeon";
    walletMnemonic1 = ethers.Wallet.fromMnemonic(mnemonic , `m/44'/60'/0'/0/0`);
    walletMnemonic2 = ethers.Wallet.fromMnemonic(mnemonic , `m/44'/60'/0'/0/1`);

    var randWallet = ethers.Wallet.createRandom()
    randWallet.hasMnemonic;
    // ...or from a private key
    walletPrivateKey = new ethers.Wallet(walletMnemonic1.privateKey)

    walletMnemonic1.address === walletPrivateKey.address
    // true

    // The address as a Promise per the Signer API
    await walletMnemonic1.getAddress()
    // '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

    // A Wallet address is also available synchronously
    walletMnemonic1.address
    // '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'



}







function getRawTransaction(tx) {
  function addKey(accum, key) {
    if (tx[key]) { accum[key] = tx[key]; }
    return accum;
  }

  // Extract the relevant parts of the transaction and signature
  const txFields = "accessList chainId data gasPrice gasLimit maxFeePerGas maxPriorityFeePerGas nonce to type value".split(" ");
  const sigFields = "v r s".split(" ");

  // Seriailze the signed transaction
  const raw = utils.serializeTransaction(txFields.reduce(addKey, { }), sigFields.reduce(addKey, { }));

  // Double check things went well
  if (utils.keccak256(raw) !== tx.hash) { throw new Error("serializing failed!"); }

  return raw;
}