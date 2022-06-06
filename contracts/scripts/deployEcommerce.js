// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Ecommerce = await hre.ethers.getContractFactory("Ecommerce");
  const ecommerce = await Ecommerce.deploy();

  await ecommerce.deployed();

  console.log("Ecommerce deployed to:", ecommerce.address);

  // const acc = await hre.ethers.getSigners();

  // const [seller, buyer] = acc.map((a) => a.address);

  // await ecommerce.addSeller("seller1");

  // await ecommerce.addProduct("prod1", 1, 10, "imghash");

  // // const pords = await ecommerce.getSellerProducts();

  // const buyerAdd = hre.ethers.utils.getAddress(buyer);

  // await ecommerce.addBuyer("buyer1");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
