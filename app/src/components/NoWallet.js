import React from "react";

export function NoWallet() {
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
        <div className="col-6 p-4 text-center">
          <p>
            No Ethereum wallet was detected. <br />
            Please install{" "}
            <a
              href="http://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              MetaMask
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}