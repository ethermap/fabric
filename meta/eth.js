const { ethers } = require("hardhat")
const { fetchAbi } = require('./../scripts/ChainHelpers.js');
const fs = require('fs');




    const usdt_address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    const usdc_address = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';    
    const wbtc_address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
    const dai_address = '0x6b175474e89094c44da98b954eedeac495271d0f';
    const uni_address = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';
    const weth_address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    
    const usdt_whale_address = '0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503';
    const usdc_whale_address = '0x0a59649758aa4d66e25f08dd01271e891fe52199';
    const wbtc_whale_address = '0xccf4429db6322d5c611ee964527d42e5d685dd6a';
    const dai_whale_address = '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643';
    const uni_whale_address = '0x1a9c8182c09f50c8318d769245bea52c32be35bc';
    const weth_whale_address = '0x030ba81f1c18d280636f32af80b9aad02cf0854e';
        

        // USDT
        var tether_abi = await fetchAbi( usdt_address );
        usdt = new ethers.Contract( usdt_address , tether_abi  );
        
        // USDC 
        let rawdata = fs.readFileSync("./artifacts/contracts/ExternalContracts/ERC20.sol/ERC20.json");
        let erc20abi = JSON.parse( rawdata ).abi;        
        var circle_abi = await fetchAbi( usdc_address );
        usdc = new ethers.Contract( usdc_address, erc20abi  );  
    
        // DAI
        var dai_abi = await fetchAbi( dai_address );
        dai = new ethers.Contract( dai_address , dai_abi  );

        // WBTC
        var wbtc_abi = await fetchAbi( wbtc_address );
        wbtc = new ethers.Contract( wbtc_address , wbtc_abi  );

        // UNI 
        var uni_abi = await fetchAbi( uni_address );
        uni = new ethers.Contract( uni_address , uni_abi  );        

        // WETH
        var weth_abi = await fetchAbi( weth_address );
        weth = new ethers.Contract( weth_address , weth_abi  );     