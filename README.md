### Liquidity Pool dApp

## Overview

This dApp is designed to enable users to:

Add liquidity to a pool using two ERC-20 tokens.

Swap one token for another within the pool.

The project integrates a frontend built with React and a backend using Ethereum smart contracts deployed on a blockchain network.

## Project Setup Instructions

# Prerequisites

Node.js and npm installed.

A supported browser with MetaMask installed.

Access to a blockchain network (e.g., Sepolia or a local testnet).

Smart contracts deployed to the blockchain network with their addresses and ABIs available.

# Backend Setup
1.clone the repository <br/>
2.Navigate to the project directory<br/>
3.Install dependencied<br/>
4.Start the application<br/>


## Smart Contract Architecture

# Overview

The dApp includes the following smart contracts:

1.Token A Contract

:black_small_square: An ERC-20 token representing one side of the liquidity pair.

2.Token B Contract

:black_small_square: An ERC-20 token representing the other side of the liquidity pair.

3.Liquidity Pool Contract

:black_small_square:Manages the liquidity pool, allowing users to:

:black0_small_square:Add liquidity.<br/>
:black_small_square:Remove liquidity.<br/>
 :black_small_square:Swap Token A for Token B or vice versa.<br/>



      

Key Functions

Token Contracts (ERC-20 Standard)

:black_small_square:approve(address spender, uint256 amount)

Allows the liquidity pool to spend tokens on behalf of the user.

Liquidity Pool Contract

   :black_small_square: addLiquidity(uint256 amountA, uint256 amountB)

Adds specified amounts of Token A and Token B to the pool.

:black_small_square:removeLiquidity(uint256 liquidity)

Removes liquidity from the pool and returns the corresponding tokens.

:black_small_square:swapTokenAForTokenB(uint256 amountA)

Swaps Token A for Token B at the current pool rate.


### Interacting with the Frontend

:black_small_square::black_small_square:In hardhat.config.js file,add your private key across the accounts section in this code;

## Connecting MetaMask

1.Open the application in your browser.<br/>

2.Click on the "Connect to MetaMask" button.<br/>

3.Approve the connection request in MetaMask.<br/>

## Adding Liquidity

1.Enter the amounts of Token A and Token B you wish to add.<br/>

2.Click the "Add Liquidity" button.<br/>

3.Approve the transactions in MetaMask.<br/>

## Swapping Tokens

1.Enter the amount of Token A to swap for Token B.<br/>
2.Click the "Swap Token A for Token B" button.<br/>
3.Approve the transaction in MetaMask.<br/>

