// INFURA_ID, FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = "ad3636d2badc44d5b49e9bd33339f031";

// MAINNET INFURA_ID, FROM https://infura.io/dashboard/ethereum
export const MN_INFURA_ID ="ad3636d2badc44d5b49e9bd33339f031";

// ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
// export const ETHERSCAN_KEY = "PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8";

// EXTERNAL CONTRACTS
export const DAI_ADDRESS = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD"
export const DAI_ABI = [{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "Approval",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "Transfer",
  "type": "event"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }
  ],
  "name": "allowance",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "approve",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "totalSupply",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "transfer",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "transferFrom",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
}]
//export const FLRB_ADDRESS = 
  
export const FLRB_ABI = [{
  "inputs": [],
  "name": "ADDRESSES_PROVIDER",
  "outputs": [
    {
      "internalType": "contract ILendingPoolAddressesProvider",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "LENDING_POOL",
  "outputs": [
    {
      "internalType": "contract ILendingPool",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address[]",
      "name": "assets",
      "type": "address[]"
    },
    {
      "internalType": "uint256[]",
      "name": "amounts",
      "type": "uint256[]"
    },
    {
      "internalType": "uint256[]",
      "name": "premiums",
      "type": "uint256[]"
    },
    {
      "internalType": "address",
      "name": "initiator",
      "type": "address"
    },
    {
      "internalType": "bytes",
      "name": "params",
      "type": "bytes"
    }
  ],
  "name": "executeOperation",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
}]

export const NETWORK = (chainId)=>{
  for(let n in NETWORKS){
    if(NETWORKS[n].chainId===chainId){
      return NETWORKS[n]
    }
  }
}

export const NETWORKS = {
    localhost: {
        name: "localhost",
        color: '#666666',
        chainId: 31337,
        blockExplorer: '',
        rpcUrl: "http://" + window.location.hostname + ":8545",
    },
    mainnet: {
        name: "mainnet",
        color: '#ff8b9e',
        chainId: 1,
        rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
        blockExplorer: "https://etherscan.io/",
    },
    kovan: {
        name: "kovan",
        color: '#7003DD',
        chainId: 42,
        rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
        blockExplorer: "https://kovan.etherscan.io/",
        faucet: "https://gitter.im/kovan-testnet/faucet",//https://faucet.kovan.network/
    },
    rinkeby: {
        name: "rinkeby",
        color: '#e0d068',
        chainId: 4,
        rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
        faucet: "https://faucet.rinkeby.io/",
        blockExplorer: "https://rinkeby.etherscan.io/",
    },
    ropsten: {
        name: "ropsten",
        color: '#F60D09',
        chainId: 3,
        faucet: "https://faucet.ropsten.be/",
        blockExplorer: "https://ropsten.etherscan.io/",
        rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
    },
    goerli: {
        name: "goerli",
        color: '#0975F6',
        chainId: 5,
        faucet: "https://goerli-faucet.slock.it/",
        blockExplorer: "https://goerli.etherscan.io/",
        rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
    },
    xdai: {
        name: "xdai",
        color: '#48a9a6',
        chainId: 100,
        price: 1,
        gasPrice:1000000000,
        rpcUrl: "https://dai.poa.network",
        faucet: "https://xdai-faucet.top/",
        blockExplorer: "https://blockscout.com/poa/xdai/",
    },
    matic: {
        name: "matic",
        color: '#2bbdf7',
        chainId: 137,
        price: 1,
        gasPrice:1000000000,
        rpcUrl: "https://rpc-mainnet.maticvigil.com",
        faucet: "https://faucet.matic.network/",
        blockExplorer: "https://explorer-mainnet.maticvigil.com//",
    }
}