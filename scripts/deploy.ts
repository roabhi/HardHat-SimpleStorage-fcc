//imports

import { ethers, run, network } from "hardhat"

//async main

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    //whats the private key? -> network is hardhat
    // whats the rpc? -> network is hardhat

    console.log(`Deployed contract to ${simpleStorage.address}`)
    //what happens when we deploy to hardhat? we cannot verufy contract on hardhat netwoek. Only verify if deployed on other networks
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("Awaiting block confirmations")
        await simpleStorage.deployTransaction.wait(6) //wait 6 blocks prior to verify our contract
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)

    //update current value

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)

    //add Person
    const addPersonRes = await simpleStorage.addPerson("John", 7)
    await addPersonRes.wait(1)
    // const peopleRes = await simpleStorage.people[0]
    // await peopleRes.wait(1)
    // console.log(peopleRes)
}

async function verify(contractAddreess: string, args: any[]) {
    console.log("Verifying contract...")

    try {
        await run("verify:verify", {
            address: contractAddreess,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

//main

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
