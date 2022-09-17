// File should be reviewed when going to production
import { ethers, BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import TestERC721 from '../artifacts/contracts/test/TestERC721.sol/TestERC721.json'
import TestERC20 from '../artifacts/contracts/test/TestERC20.sol/TestERC20.json'
import { randomBN } from '../utils/encoding'

const contractAddresses = require('../utils/contractAddresses.json')

export const mintERC721 = async(signer: ethers.Signer, address: string, nftID?: BigNumber | string | undefined) => {
    if(typeof window !== 'undefined' && typeof contractAddresses.TestERC721 !== 'undefined') {
        const contract = new ethers.Contract(contractAddresses.TestERC721, TestERC721.abi, signer)
        console.log('inside minterc721')
        if(typeof nftID === 'undefined') {
            nftID = randomBN()
        }
        const mintTransaction = await contract.mint(address, nftID)
        await mintTransaction.wait()
        console.log('after mintTransaction')
        return nftID.toString()
    }
}

export const mintERC20 = async(signer: ethers.Signer, address: string, mintAmount: string) => {
    if(typeof window !== 'undefined' && typeof contractAddresses.TestERC20 !== 'undefined') {
        const contract = new ethers.Contract(contractAddresses.TestERC20, TestERC20.abi, signer)
        const mintTransaction = await contract.mint(
            address, 
            parseEther(mintAmount).toString()
        )
        await mintTransaction.wait()
    }
}

export const ownerOfERC721 = async(signer: ethers.Signer, nftID?: BigNumber | string) => {
    if(typeof window !== 'undefined' && typeof contractAddresses.TestERC721 !== 'undefined') {
       const contract = new ethers.Contract(contractAddresses.TestERC721, TestERC721.abi, signer)

       let nftid
        if(typeof nftID === 'string') {
            nftid = ethers.BigNumber.from(nftID)
        } else {
            nftid = nftID
        }
        console.log('nftid before ownerOf', nftid)
        try {
            const owner = await contract.ownerOf(nftid)
            return owner
        } catch {
            return undefined
        }
    }
}