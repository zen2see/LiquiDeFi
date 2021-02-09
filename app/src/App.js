import React from "react";
import LiquiDeFi from './artifacts/contracts/LiquiDeFi.sol/LiquiDeFi';
import IERC20 from './artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import "./App.css";
import { ethers } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';
import { NoWallet } from "./components/NoWallet";
import { ConnectWallet } from "./components/ConnectWallet";
import { Loading } from "./components/Loading";
// import { NetworkErrorMsg } from "./components/NetworkErrorMsg"
import { Header } from "./components/Header";
import { INFURA_ID, MN_INFURA_ID, DAI_ADDRESS, DAI_ABI, NETWORK, NETWORKS } from "./components/constants";

const poolAddress = "0x9FE532197ad76c5a68961439604C037EB79681F0";
const aDaiAddress = "0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8";
const daiAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
const HARDHAT_NETWORK_ID = '42';

class App extends React.Component {
  async componentDidMount() { 
    document.body.style.backgroundColor = "#282c34"
    document.body.style.color = "grey"
    await this.loadBlockChainData()
  }

  async loadBlockchainData(escrowManager, escrowReceiver, value) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    if(network.chainId === 42) {
      try {
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();
        const liquidefiAddress = ethers.utils.getContractAddress({
          from: signerAddress,
          nonce: (await provider.getTransactionCount(signerAddress)) + 1,
        });
        // getBalance
        const accounts = await ethers.getSigners();
        const balanceBN = await provider.getBalance(liquidefiAddress);
        const balance = ethers.utils.formatEther(balanceBN);
        if(typeof accounts[0] !=='undefined'){
          this.setState({account: accounts[0], balance: balance, provider: provider})
        } else {
          window.alert('Please login with MetaMask')
        }
        const dai = new ethers.Contract(daiAddress, IERC20.abi, signer);
        const tx = await dai.approve(liquidefiAddress, value);
        await tx.wait();
        const factory = new ethers.ContractFactory(LiquiDeFi.abi, LiquiDeFi.bytecode, signer);
        return factory.deploy(poolAddress, aDaiAddress, daiAddress, escrowManager, escrowReceiver, value);
      }
      catch(ex) {
        alert(ex.message);
      }
    }
    else {
      alert("Invalid network, please choose Kovan!");
    }
    // const providef = await detectEthereumProvider();
    // if (provider) { // From now on, provider === window.ethereum should always be true
    //   startApp(provider); // initialize your app
    // } else {
    //    console.log('Please install MetaMask!');
    // }
  }

  constructor(props) {
    super(props);
  
    // Store Dapp's state.
    this.initialState = {
      provider: 'undefined',
      liquidefiAddress: undefined,
      poolAddress: undefined,
      daiAddress: undefined,
      escrowManagerAddress: undefined,
      escrowReceiverAddress: undefined,
      account: '',
      balance: 0,
      value: 0,
    };

    this.state = this.initialState;
  }

  render() {
    // If the defiba data or the user's balance hasn't loaded yet, we show
    // a loading component.
    // if (!this.state.defibaData || !this.state.balance) {
    //   return <Loading />;
    // }
    // If everything is loaded, we render the application.
    return (
      <div className="container p-4">
        {/* Main content */}
        {/* Nav bar */}
        <nav className="navbar navbar-dark fixed-top bg-dark flex-sm-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-4 mr-0" 
             href="https://zen2see.com/" target="_self">LiquiDeFi
          </a>
          <span className="navbar-text navbar-right px-2">Your account: {
           this.state.liquidefiAddress.slice(0,6) + "...." + this.state.liquidefiAddress.slice(-4)}
          </span> 
        </nav>
        <div className="row mt-5">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
            <div className="row mt-4">
              <div className="col-lg-12 d-flex justify-content-center">
                <h2 className="blink blink-fade">Manage your DeFiBA</h2>
              </div>
            </div>
          </main>           
        </div>
        <div className="row">
          <div className="col-12">
            <h1>
              {this.state.defibaData.name} ({this.state.defibaData.symbol})
            </h1>
            <p>
              Welcome <b>{this.state.selectedAddress}</b>, you have{" "}
              <b>
                {this.state.balance.toString()} 
              </b>
              .
            </p>
          </div>
        </div>

        <hr />
      </div>
    );
  }
  // componentWillUnmount() {
  //   // We poll the user's balance, so we have to stop doing that when Dapp
  //   // gets unmounted
  //   this._stopPollingData();
  // }

  // async _connectWallet() {
  //   // This method is run when the user clicks the Connect. It connects the
  //   // dapp to the user's wallet, and initializes it.

  //   // To connect to the user's wallet, we have to run this method.
  //   // It returns a promise that will resolve to the user's address.
  //   const [selectedAddress] = await window.ethereum.enable();

  //   // Once we have the address, we can initialize the application.

  //   // First we check the network
  //   if (!this._checkNetwork()) {
  //     return;
  //   }

  //   this._initialize(selectedAddress);

  //   // We reinitialize it whenever the user changes their account.
  //   window.ethereum.on("accountsChanged", ([newAddress]) => {
  //     this._stopPollingData();
  //     // `accountsChanged` event can be triggered with an undefined newAddress.
  //     // This happens when the user removes the Dapp from the "Connected
  //     // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
  //     // To avoid errors, we reset the dapp state 
  //     if (newAddress === undefined) {
  //       return this._resetState();
  //     }
      
  //     this._initialize(newAddress);
  //   });
    
  //   // We reset the dapp state if the network is changed
  //   window.ethereum.on("networkChanged", ([networkId]) => {
  //     this._stopPollingData();
  //     this._resetState();
  //   });
  // }

  // _initialize(userAddress) {
  //   // This method initializes the dapp

  //   // We first store the user's address in the component's state
  //   this.setState({
  //     selectedAddress: userAddress,
  //   });

  //   // Then, we initialize ethers, fetch the defiba's data, and start polling
  //   // for the user's balance.

  //   // Fetching the defiba data and the user's balance
  //   this._intializeEthers();
  //   this._getDeFiBAData();
  //   this._startPollingData();
  // }

  // async _intializeEthers() {
  //   // We first initialize ethers by creating a provider using window.ethereum
  //   this._provider = new ethers.providers.Web3Provider(window.ethereum);

  //   // When, we initialize the contract using that provider and the token's
  //   // artifact. You can do this same thing with your contracts.
  //   this._defiba = new ethers.Contract(
  //     contractAddress.DeFiBA,
  //     DeFiBAArtifact.abi,
  //     this._provider.getSigner(0)
  //   );
  // }

  // // The next to methods are needed to start and stop polling data. While
  // // Note that if you don't need it to update in near real time, you probably
  // // don't need to poll it. If that's the case, you can just fetch it when you
  // // initialize the app.
  // _startPollingData() {
  //   this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);

  //   // We run it once immediately so we don't have to wait for it
  //   this._updateBalance();
  // }

  // _stopPollingData() {
  //   clearInterval(this._pollDataInterval);
  //   this._pollDataInterval = undefined;
  // }

  // // The next two methods just read from the contract and store the results
  // // in the component state.
  // async _getDeFiBAData() {
  //   const name = await this._defiba.name();
  //   const symbol = await this._defiba.symbol();

  //   this.setState({ defibaData: { name } });
  // }

  // async _updateBalance() {
  //   const balance = await this._defiba.balanceOf(this.state.selectedAddress);
  //   this.setState({ balance });
  // }

}

export default App;

