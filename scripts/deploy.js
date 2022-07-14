async function main() {
    const ConduitController = await hre.ethers.getContractFactory("ConduitController")
    const conduitController = await ConduitController.deploy()

    const SeaportContract = await hre.ethers.getContractFactory("Seaport")
    const seaportContract = await SeaportContract.deploy(
        conduitController.address
    )
    await seaportContract.deployed()

    const TestERC721 = await hre.ethers.getContractFactory("TestERC721")
    const testErc721 = await TestERC721.deploy()
    await testErc721.deployed()

    const TestERC1155 = await hre.ethers.getContractFactory("TestERC1155")
    const testErc1155 = await TestERC1155.deploy()
    await testErc1155.deployed()

    const TestERC20 = await hre.ethers.getContractFactory("TestERC20")
    const testErc20 = await TestERC20.deploy()
    await testErc20.deployed()

    // Save contract addresses to JSON file
    const fs = require("fs")
    const path = require("path")
    const contractsDir = path.join(__dirname, "..", "utils")

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }
    fs.writeFileSync(
        path.join(contractsDir, "contractAddresses.json"),
        JSON.stringify({
            Seaport: seaportContract.address,
            TestERC721: testErc721.address,
            TestERC20: testErc20.address
        }, undefined, 2)
    )
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
})