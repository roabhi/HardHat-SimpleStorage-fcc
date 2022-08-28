const { task } = require("hardhat/config")

task("block-number", "Prints de current block number").setAction(
    // const blockTask = async function() => {}
    // async function blockTask() {}
    async (taskArgs, hre) => {
        //hre = hardhat runtime environment
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number is : ${blockNumber}`)
    }
)

module.exports = {}
