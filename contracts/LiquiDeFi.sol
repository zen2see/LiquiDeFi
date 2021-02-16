// SPDX-License-Identifier: MIT

pragma solidity >=0.6.12;

/// @title LiquiDeFi
/// @author zen2see
/// @notice Implements DeFi AAVE protocols

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./interfaces/ILendingPoolAddressesProvider.sol";
import "./interfaces/ILendingPool.sol";
import 'hardhat/console.sol';

contract LiquiDeFi {
    // Addressess for ESCROW
    address escrowManager;
    address escrowDepositor;
    address escrowReceiver;
    address _collateralMembers = address(0xEA965F81Dc5aF1D8b9b018a6aEBb125fa9a2dA67);
    address[] collateralMembers;
    address[] tokens = new address[](3); // (7) for all assets
    uint256[] debts = new uint256[](3); // (7) for all debts
    uint256[] modes = new uint256[](3); // 0 = no debt, 1 = stable, 2 = variable

    // AMOUNTS for ESCROW
    uint initialDeposit;  // initial deposit of 10 dai = 10e18
    uint aDaiBalance;
    
    // The kovan AAVE lending pool 
    ILendingPool lendpool; //= ILendingPool(0x9FE532197ad76c5a68961439604C037EB79681F0);
    // Kovan address provider = 0x88757f2f99175387aB4C6a4b3067c77A695b0349
    // ILendingPoolAddressesProvider _addressProvider = 
    //    ILendingPoolAddressesProvider(0x88757f2f99175387aB4C6a4b3067c77A695b0349);
    // Kovan aDai
    IERC20 aDai; // = IERC20(0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8);
    // Kovan Dai
    IERC20 dai; // = IERC20(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD);
    // contract address 0x6D0ae19c5835Dc541A4DfB9BBf6c63da3a672b46
    
    // SetsProvides the LendingPoolAddressProvider
    // constructor(ILendingPoolAddressesProvider _addressProvider) FlashLoanReceiverBase(_addressProvider) 
    //     Ownable() {}

    constructor(
        ILendingPool _pool, 
        IERC20 _aDai, 
        IERC20 _dai, 
        address _escrowManager, 
        address _escrowReceiver,
        uint _amount
    )
    {
        lendpool = _pool;
        aDai = _aDai;
        dai = _dai;
        escrowManager = _escrowManager;
        escrowReceiver = _escrowReceiver;
        escrowDepositor = msg.sender;
        initialDeposit = _amount;
        dai.transferFrom(msg.sender, address(this), _amount);
        dai.approve(address(lendpool), _amount);
        lendpool.deposit(address(dai), _amount, address(this), 0);
    }

    event Approved();

    function approve() external {
        require(msg.sender == escrowManager, "Approve must be called by the arbiter!");
        uint balance = aDai.balanceOf(address(this));
        aDai.approve(address(lendpool), balance);
        lendpool.withdraw(address(dai), initialDeposit, escrowReceiver);
        lendpool.withdraw(address(dai), type(uint).max, escrowDepositor);
        emit Approved();
    }
}

    // // After transferring their DAI to the contract members can borrow against
    // function borrow(address asset, uint amount) external {
    //     require(isCollateralMember(msg.sender), "Must be a Member");
    //     // Calling borrow on the AAVE LendingPool onbehalf of this contract
    //     // Debt is incurred to the smart contract holding the collateral
    //     LENDING_POOL.borrow(asset, amount, 1, 0, address(this));
    //      // Healthfactor is checked to be > 2 or function will revert (ret 6 values)
    //     (,,,,,uint healthFactor) = LENDING_POOL.getUserAccountData(address(this));
    //     require(healthFactor > 2e18, "HealthFactor needs to be > 2");
    //     // Using the IERC20 contract to make the transfer
    //     IERC20(asset).transfer(msg.sender, amount);
    // }

    // // Member can repay their loan by calling this function 1st approve this contract
    // function repay(address asset, uint amount) external {
    //     IERC20(asset).transferFrom(msg.sender, address(this), amount);
    //     dai.approve(address(LENDING_POOL), amount);
    //     LENDING_POOL.repay(asset, amount, 1, address(this));
    // }

    // // Can withdraw if no outstanding loans
    // // This contract is holding AAVE interest bearing DAI (aDai)
    // // Here we withdraw the entire balance of aDai from the pool to distribute evenly
    // function withdraw() external {
    //     require(isCollateralMember(msg.sender), "Must be a Member");
    //     uint totalBalance = aDai.balanceOf(address(this));
    //     uint shareOfBalance = totalBalance / collateralMembers.length;
    //     // Approve aDai to be sent by the pool
    //     aDai.approve(address(LENDING_POOL), totalBalance);
    //     for (uint i = 0; i < collateralMembers.length; i++) {
    //         LENDING_POOL.withdraw(address(dai), shareOfBalance, collateralMembers[i]);
    //     }
    // }



  	// function approve() external {
    //     require(msg.sender == escrowManager, "Approve must be called by the Manager!");
    //     uint balance = aDai.balanceOf(address(this));
    //     aDai.approve(address(LENDING_POOL), balance);
    //     LENDING_POOL.withdraw(address(dai), initialDeposit, escrowReceiver);
    //     LENDING_POOL.withdraw(address(dai), type(uint).max, escrowDepositor);
	// 	emit Approved();
    // }

    // // Sets ESCROW receiver address
    // function setESCROWreceiver(address _escrowReceiver) public {
    //     escrowReceiver = _escrowReceiver;
    // }

    // // Sets ESCROW depositor address
    // function setESCROWdepositor(address _escrowDepositor) public {
    //     escrowDepositor = _escrowDepositor;
    // }

    // // Sets ESCROW manager address
    // function setESCROWmanager(address _escrowManager) public {
    //     escrowManager = _escrowManager;
    // }