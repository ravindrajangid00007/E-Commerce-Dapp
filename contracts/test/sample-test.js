const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ecommerce", function () {
  it("Add new seller and get back its data", async function () {
    const Ecommerce = await ethers.getContractFactory("Ecommerce");
    const ecommerce = await Ecommerce.deploy();
    await ecommerce.deployed();

    const [seller, buyer] = (await ethers.getSigners()).map(
      (acc) => acc.address
    );

    console.log("buyer-", buyer);

    await ecommerce.addSeller("seller1");

    await ecommerce.addProduct("prod1", 1, 10, "imghash");

    await ecommerce.addBuyer("buyer1");

    const prod = await ecommerce.getProduct(1);

    // const prods = await ecommerce.getSellerProducts();
    // expect(name).to.equal("null");

    // const setGreetingTx = await ecommerce.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await ecommerce.greet()).to.equal("Hola, mundo!");
  });
});
