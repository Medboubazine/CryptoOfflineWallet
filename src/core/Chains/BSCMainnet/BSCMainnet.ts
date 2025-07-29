import type ChainInterface from "@/core/Interfaces/Chains/ChainInterface"
import type ChainTokenInterface from "@/core/Interfaces/Tokens/ChainTokenInterface"
import BSCMainnetTokenUSDT from "./Tokens/BSCMainnetTokenUSDT"
import BSCMainnetTokenXRP from "./Tokens/BSCMainnetTokenXRP"

export default class BSCMainnet implements ChainInterface {
    /**
     * Chain ID
     */
    id: number = 56
    /**
     * Chain slug
     */
    slug: string = 'bsc'
    /**
     * Name
     */
    name: string = "Binance Smart Chain"
    /**
     * RPC
     */
    rpc: string = "https://bsc-dataseed.binance.org"
    /**
     * EXPLORER
     */
    explorer: string = "https://bscscan.com"
    /**
     * Currency
     */
    currency: string = "BNB"
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
            new BSCMainnetTokenUSDT,
            new BSCMainnetTokenXRP,
        ]
    }
}