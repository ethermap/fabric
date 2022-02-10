//Avalanche Mainnet Settings:
var main = {
    carrier: 'avalanche',
    network_name:'Avalanche Mainnet C-Chain',
    rpc_url:'https://api.avax.network/ext/bc/C/rpc',
    ChainID: 43114,
    Symbol: AVAX,
    Explorer:'https://snowtrace.io/'}

//FUJI Testnet Settings:
var fuj={
    carrier: 'avalanche',
    network_name: 'Avalanche FUJI C-Chain',
    rpc_url:'https://api.avax-test.network/ext/bc/C/rpc',
    ChainID: 43113,
    Symbol: 'AVAX',
    Explorer: 'https://testnet.snowtrace.io/' }

//Local Testnet (AVASH) Settings: (Avash Tutorial)
var loc = {
    carrier: 'avalanche',
    network_name: 'Avalanche Local',
    rpc_url:'http://localhost:9650/ext/bc/C/rpc',
    ChainID: 43112,
    Symbol: 'AVAX',
    Explorer: 'N/A'}
