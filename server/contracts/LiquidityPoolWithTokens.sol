// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title TokenA
contract TokenA is ERC20 {
    constructor(string memory name, string memory symbol) ERC20("TokenA", "TKA") {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Mint 1,000,000 tokens to the deployer
    }
}

/// @title TokenB
contract TokenB is ERC20 {
    constructor(string memory name, string memory symbol) ERC20("TokenB", "TKB") {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Mint 1,000,000 tokens to the deployer
    }
}

/// @title LiquidityPool
contract LiquidityPool is Ownable {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public totalLiquidity;

    mapping(address => uint256) public liquidity;

    /// @notice Constructor for LiquidityPool
    /// @param _tokenA Address of TokenA
    /// @param _tokenB Address of TokenB
    constructor(address _tokenA, address _tokenB) Ownable(msg.sender){
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    /// @notice Add liquidity to the pool
    /// @param amountA Amount of TokenA to deposit
    /// @param amountB Amount of TokenB to deposit
    function addLiquidity(uint256 amountA, uint256 amountB) public {
        require(amountA > 0 && amountB > 0, "Amounts must be greater than zero");

        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);

        uint256 liquidityAdded = amountA + amountB;
        liquidity[msg.sender] += liquidityAdded;
        totalLiquidity += liquidityAdded;
    }

    /// @notice Remove liquidity from the pool
    /// @param amount Amount of liquidity to withdraw
    function removeLiquidity(uint256 amount) public {
        require(liquidity[msg.sender] >= amount, "Insufficient liquidity");

        uint256 amountA = (amount * tokenA.balanceOf(address(this))) / totalLiquidity;
        uint256 amountB = (amount * tokenB.balanceOf(address(this))) / totalLiquidity;

        liquidity[msg.sender] -= amount;
        totalLiquidity -= amount;

        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);
    }

    /// @notice Swap TokenA for TokenB
    /// @param amountA Amount of TokenA to swap
    function swapTokenAForTokenB(uint256 amountA) public {
        require(amountA > 0, "Amount must be greater than zero");

        uint256 amountB = (amountA * tokenB.balanceOf(address(this))) / tokenA.balanceOf(address(this));
        require(amountB > 0, "Insufficient liquidity for the swap");

        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transfer(msg.sender, amountB);
    }

    /// @notice Swap TokenB for TokenA
    /// @param amountB Amount of TokenB to swap
    function swapTokenBForTokenA(uint256 amountB) public {
        require(amountB > 0, "Amount must be greater than zero");

        uint256 amountA = (amountB * tokenA.balanceOf(address(this))) / tokenB.balanceOf(address(this));
        require(amountA > 0, "Insufficient liquidity for the swap");

        tokenB.transferFrom(msg.sender, address(this), amountB);
        tokenA.transfer(msg.sender, amountA);
    }
}
