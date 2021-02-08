/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('hardhat-deploy');
require('hardhat-spdx-license-identifier');
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require('hardhat-abi-exporter');
const chalk = require('chalk');
// Configure network
const INFURA_PROJECT_ID = process.env.INFURA_PID;
const KOVAN_PRIVATE_KEY = process.env.KOVAN_KEY;

module.exports = {
  solidity: {
    compilers: [
        {
            version: "0.6.12" 
        },
        {
            version: "0.7.5"
        },
        {
            version: "0.8.0",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        },
    ]
  },
  networks: {
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${KOVAN_PRIVATE_KEY}`]
      //url: `https://kovan.infura.io/v3/` + process.env.INFURA_PROJECT_ID,
    }
  },
  watcher: {
      tasks: ["compile"],
      files: ["app"]
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './app/artifacts',
    deploy: "./deploy",
    deployments: './deployments',
    imports: './imports'
  },
  abiExporter: {
    path: './app/src/abis',
    clear: false,
    flat: true,
    only: []
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true
  }
}