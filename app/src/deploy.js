import LiquiDeFi from './artifacts/contracts/LiquiDeFi.sol/LiquiDeFi.json';
import IERC20 from './artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import { ethers } from 'ethers';
  
const poolAddress = "0x9FE532197ad76c5a68961439604C037EB79681F0";
// const poolAddress = "0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe";
const aDaiAddress = "0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8";
// const aDaiAddress = "0x6dDFD6364110E9580292D9eCC745F75deA7e72c8";
const daiAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
 
export default async function deploy(escrowManager, escrowReceiver, value) {
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
}
