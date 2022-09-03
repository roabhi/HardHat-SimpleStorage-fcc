const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    //Needed code for all test
    // 1.- Define vars
    // 2.- beforeEach get contract factory and wait for contract deployemt
    let simpleStorageFactory, simpleStorage
    const People = []
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    // Test if we start with a fave number of 0

    it("Should start with a fave num of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })

    //Test if we can update fave number

    it("Should update when we call store", async function () {
        const expectedValue = 7
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    //Test if we can add a new person
    it("Should add a new person with a name and a favorite number", async function () {
        const expectedPersonName = "John"
        const expectedPersonNumber = 7
        const txnResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedPersonNumber
        )
        await txnResponse.wait(1)
        const { favoriteNumber, name } = await simpleStorage.people(0)
        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedPersonNumber)
    })
})
