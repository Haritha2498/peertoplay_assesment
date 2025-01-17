import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserProvider, Contract } from "ethers";

import { TokenAAbi } from "../scdata/LiquidityPoolDeploymentA.json";
import { TokenBAbi } from "../scdata/LiquidityPoolDeploymentB.json";
import { LiquidityPoolAbi } from "../scdata/LiquidityPoolDeployment.json";

import TokenAModule from "../scdata/deployed_address.json";
import TokenBModule from "../scdata/deployed_address.json";
import LiquidityPoolModule from "../scdata/deployed_address.json";


const TOKEN_A_ADDRESS = "0xc4845f996B8838F068e0B69981B23Cf0B684411C";
const TOKEN_B_ADDRESS = "0x41D0c5F125258DAA12f8C74305a9792e1c079f3F";
const LIQUIDITY_POOL_ADDRESS = "0x490A9f353C908aCBD4601Fa653e62DC2f7eAC72d";

function LiquidityPoolPage() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [tokenA, setTokenA] = useState(null);
  const [tokenB, setTokenB] = useState(null);
  const [liquidityPool, setLiquidityPool] = useState(null);
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  useEffect(() => {
    const init = async () => {
      console.log('daa')
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
  const provider = new BrowserProvider(window.ethereum);
// async function connentToMetamask() {
  const signer = await provider.getSigner();
  console.log("signer", signer.address);
  alert(`MetaMask is connected. Address: ${signer.address}`);
// }

      // const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);
       console.log(TokenAModule);
        console.log(TokenBModule);
         console.log(LiquidityPoolModule);
      const tokenA = new Contract(TOKEN_A_ADDRESS, TokenAAbi, signer);
      const tokenB = new Contract(TOKEN_B_ADDRESS, TokenBAbi, signer);
      const liquidityPool = new Contract(
        LIQUIDITY_POOL_ADDRESS,
        LiquidityPoolAbi,
        signer
      );
 console.log(TOKEN_A_ADDRESS);
 console.log(TOKEN_B_ADDRESS);
 console.log(LIQUIDITY_POOL_ADDRESS);
      setTokenA(tokenA);
      setTokenB(tokenB);
      setLiquidityPool(liquidityPool);
    };

    init();
  }, []);



  function toWei(value, decimals) {
    return BigInt(value * 10 ** decimals).toString();
  }

//   const addLiquidity = async () => {

//     console.log("ethers.utils:", ethers.utils);

// console.log("ethers:", ethers);
//     console.log(amountA)
//     await tokenA.approve(
//       LIQUIDITY_POOL_ADDRESS,
//       ethers.utils.parseUnits(amountA)
//     );
//     await tokenB.approve(
//       LIQUIDITY_POOL_ADDRESS,
//       ethers.utils.parseUnits(amountB)
//     );
//     await liquidityPool.addLiquidity(
//       ethers.utils.parseUnits(amountA),
//       ethers.utils.parseUnits(amountB)
//     );
//     console.log("signer", signer.address);
//     alert(`MetaMask is connected. Address: ${signer.address}`);
  
//   };


const addLiquidity = async () => {
  try {
    const amountAInWei = toWei(amountA, 18); // Assuming 18 decimals
    const amountBInWei = toWei(amountB, 18); // Assuming 18 decimals

    console.log("Amount A (Wei):", amountAInWei);
    console.log("Amount B (Wei):", amountBInWei);

    // Approve tokens for the liquidity pool contract
    await tokenA.approve(LIQUIDITY_POOL_ADDRESS, amountAInWei);
    await tokenB.approve(LIQUIDITY_POOL_ADDRESS, amountBInWei);

    // Add liquidity to the pool
    await liquidityPool.addLiquidity(amountAInWei, amountBInWei);

    console.log("Liquidity added successfully!");
    alert("Liquidity added successfully!");
  } catch (error) {
    console.error("Error in addLiquidity:", error);
    alert("Failed to add liquidity. Check the console for details.");
  }
};



  const swapTokenAForTokenB = async () => {
    await tokenA.approve(
      LIQUIDITY_POOL_ADDRESS,
      ethers.utils.parseUnits(amountA)
    );
    await liquidityPool.swapTokenAForTokenB(ethers.utils.parseUnits(amountA));
    console.log("signer", signer.address);
    alert(`MetaMask is connected. Address: ${signer.address}`);
  
  };

  return (
    <div>
      <h1>Liquidity Pool dApp</h1>
      <input
        type="text"
        placeholder="Amount Token A"
        value={amountA}
        onChange={(e) => setAmountA(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount Token B"
        value={amountB}
        onChange={(e) => setAmountB(e.target.value)}
      />
      <button onClick={addLiquidity}>Add Liquidity</button>
      <button onClick={swapTokenAForTokenB}>Swap Token A for Token B</button>
    </div>
  );
}

export default LiquidityPoolPage;
