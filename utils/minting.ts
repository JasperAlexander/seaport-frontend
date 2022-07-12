import { ethers, BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import TestERC721 from '../artifacts/contracts/test/TestERC721.sol/TestERC721.json'
import TestERC20 from '../artifacts/contracts/test/TestERC20.sol/TestERC20.json'
import { randomBN } from '../utils/encoding'

const contractAddresses = require('../utils/contractAddresses.json')

export const mintERC721 = async(nftID?: BigNumber | string | undefined) => {
    if(typeof window !== 'undefined' && typeof contractAddresses.TestERC721 !== 'undefined') {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const web3provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = web3provider.getSigner()
        const signerAddress = await signer.getAddress()
        const contract = new ethers.Contract(contractAddresses.TestERC721, TestERC721.abi, signer)
        if(typeof nftID === 'undefined') {
            nftID = randomBN()
        }
        const mintTransaction = await contract.mint(signerAddress, nftID)
        await mintTransaction.wait()
        return nftID.toString()
    }
}

export const mintERC20 = async(mintAmount: string) => {
    if(typeof window !== 'undefined' && typeof contractAddresses.TestERC20 !== 'undefined') {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const web3provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = web3provider.getSigner()
        const signerAddress = await signer.getAddress()
        const contract = new ethers.Contract(contractAddresses.TestERC20, TestERC20.abi, signer)
        const mintTransaction = await contract.mint(
            signerAddress, 
            parseEther(mintAmount).toString()
        )
        await mintTransaction.wait()
    }
}