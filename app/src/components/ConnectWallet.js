import React from "react";

import { NetworkErrMsg } from "./NetworkErrMsg";

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className="container">
    {/* Main content */}
    {/* Nav bar */}
      <nav className="navbar navbar-dark fixed-top bg-dark flex-sm-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-4 mr-0" 
          href="https://ethglobal.co/" target="_self">DeFiBA
        </a>
      </nav>
      <div className="row mt-5">
        <main role="main" className="col-lg-12 d-flex justify-content-center">
          <div className="row mt-4">
            <div className="col-lg-12 d-flex justify-content-center">
              <h2>Your DeFi Bank Account</h2>
            </div>
          </div>
          {/*<div className="row">Current products: { this.state.productIdCount }</div>*/}
        </main>           
      </div>
 
      {/* Main actions */} 
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {/* Metamask network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrMsg 
              message={networkError} 
              dismiss={dismiss} 
            />
          )}
        </div>
        <div className="col-6 p-4 text-center">
          <p>Please connect to your wallet.</p>
          <button
            className="btn btn-warning"
            type="button"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}