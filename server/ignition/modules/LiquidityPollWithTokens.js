// import { buildModule } from "@nomicfoundation/ignition-core";
const {buildModule}=require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LiquidityPoolDeployment", (m) => {
  const tokenA = m.contract("TokenA", ["TokenA", "TKA"]); // Token name and symbol
  const tokenB = m.contract("TokenB", ["TokenB", "TKB"]); // Token name and symbol
  const liquidityPool = m.contract("LiquidityPool", [tokenA, tokenB]); // Pass deployed TokenA and TokenB addresses

  return { tokenA, tokenB, liquidityPool }; // Define all deployable contracts
});