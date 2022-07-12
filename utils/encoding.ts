import type { BigNumberish } from 'ethers'
import { BigNumber } from 'ethers'
import { randomBytes as nodeRandomBytes } from 'crypto'

export const randomBytes = (n: number) => nodeRandomBytes(n).toString("hex")
export const randomHex = (bytes = 32) => `0x${randomBytes(bytes)}`

export const hexRegex = /[A-Fa-fx]/g
export const toHex = (n: BigNumberish, numBytes: number = 0) => {
    const asHexString = BigNumber.isBigNumber(n)
      ? n.toHexString().slice(2)
      : typeof n === "string"
      ? hexRegex.test(n)
        ? n.replace(/0x/, "")
        : Number(n).toString(16)
      : Number(n).toString(16)
    return `0x${asHexString.padStart(numBytes * 2, "0")}`
}

export const toBN = (n: BigNumberish) => BigNumber.from(toHex(n))

export const randomBN = (bytes: number = 16) => toBN(randomHex(bytes))
