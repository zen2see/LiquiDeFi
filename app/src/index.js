import { ethers } from 'ethers';
import deploy from './deploy';
import displayContract from './displayContract';
import "./index.scss";

let contracts = 0;
async function newContract() {
  const escrowReceiver = document.getElementById("receiver").value;
  const escrowManager = document.getElementById("manager").value;
  const value = ethers.utils.parseEther(document.getElementById("wei").value);
  const contract = await deploy(escrowManager, escrowReceiver, value);
  if(contract) {
    displayContract(++contracts, contract, escrowManager, escrowReceiver, value);
  }
}

async function loadNetworkId() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const network = await provider.getNetwork();
  document.getElementById("network-id").innerHTML = `connected to ${network.name}`;
}

window.ethereum.on('chainChanged', loadNetworkId);
loadNetworkId();

document.getElementById("deploy").addEventListener("click", newContract);