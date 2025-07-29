import type ChainTokenInterface from "@/core/Interfaces/Tokens/ChainTokenInterface"

export default interface ChainInterface {
    /**
     * Chain ID
     */
    id: number
    /**
     * Chain slug
     */
    slug: string
    /**
     * Name
     */
    name: string
    /**
     * RPC
     */
    rpc: string
    /**
     * EXPLORER
     */
    explorer: string
    /**
     * Currency
     */
    currency: string
    /**
     * Currency decimals
     */
    decimals: number
    /**
     * GAS
     */
    gas: number
    /**
     * Chain contracts
     * @returns object
     */
    contracts(): { [key: string]: string };
    /**
     * Chain tokens addresses
     * @returns object
     */
    addresses(): ChainTokenInterface[];
}