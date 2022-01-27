const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

console.log(JSON.stringify(contract.abi));

console.log(CONTRACT_ADDRESS);

//Provider
const alchemyProvider = new ethers.providers.AlchemyProvider((network="kovan"), API_KEY);

//Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//console.log("get signer :", signer.provider.getCode())

//Contract
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await helloWorldContract.message();

    console.log("the message is : " + message);

    console.log("Updating the message :");

    const tx = await helloWorldContract.update("This is the new message");

    await tx.wait();

    const newMessage = await helloWorldContract.message();

    console.log("the new message is : " + newMessage);
}

main();