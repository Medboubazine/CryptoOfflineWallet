
import type ChainInterface from "@/core/Interfaces/Chains/ChainInterface"
import type ChainTokenInterface from "@/core/Interfaces/Tokens/ChainTokenInterface"
import EthereumMainnetTokenUSDT from "./Tokens/EthereumMainnetTokenUSDT"

export default class EthereumMainnet implements ChainInterface {
    /**
     * Chain ID
     */
    id: number = 1
    /**
     * Chain slug
     */
    slug: string = 'ethereum'
    /**
     * Name
     */
    name: string = "Ethereum"
    /**
     * RPC
     */
    rpc: string = "https://rpc.ankr.com/eth/d1321219a568aa992868e134ee0a146fca3c7c99972b4049c1bf7e1c48b8eff8"
    /**
     * EXPLORER
     */
    explorer: string = "https://etherscan.io"
    /**
     * Currency
     */
    currency: string = "ETH"
    /**
     * Currency decimals
     */
    decimals: number = 18
    /**
     * GAS
     */
    gas: number = 100000
    /**
     * Chain contracts
     * @returns object
     */
    contracts(): {[key: string]: string}{
        return {
            BALANCE_OF:"function balanceOf(address owner) view returns (uint256)",
            DECIMALS:"function decimals() view returns (uint8)",
            SYMBOL:"function symbol() view returns (string)",
            TRANSFER:"function transfer(address to, uint amount) returns (bool)",
        }
    }
    /**
     * Chain tokens addresses
     * @returns object
     */
    addresses(): ChainTokenInterface[] {
        return [
            new EthereumMainnetTokenUSDT
        ]
    }
    /**
     * Wallet explorer link 
     * @returns object
     */
    exploreAddress(address: string): string {
        return `${this.explorer}/address/${address}`;
    }
}