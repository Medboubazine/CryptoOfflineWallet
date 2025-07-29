import type ChainInterface from "@/core/Interfaces/Chains/ChainInterface";
import EthereumMainnet from "@/core/Chains/EthereumMainnet/EthereumMainnet";
import BSCMainnet from "@/core/Chains/BSCMainnet/BSCMainnet";
/**
 * The global chains
 */
export const SUPPORTED_CHAINS:{[key: string]: ChainInterface} = {
    ERC20: new EthereumMainnet,
    BEP20: new BSCMainnet,
}
/**
 * EVM: Ethereum Virtual Machine is the core component of Ethereum's blockchain platform.
 */
export const EVM_CHAINS: ChainInterface[] = [
    SUPPORTED_CHAINS.ERC20,
    SUPPORTED_CHAINS.BEP20,
]
/**
 * Testing chains for developers
 */
export const SUPPORTED_CHAINS_FOR_TESTING:{[key: string]: ChainInterface} = {
    //BSCT: BSCTestnet
}



////
//// Heplers
////
export function FindChain(key:string,value: any): ChainInterface|null {
    for (const index in SUPPORTED_CHAINS) {
        if (Object.prototype.hasOwnProperty.call(SUPPORTED_CHAINS, index)) {
            const chain = SUPPORTED_CHAINS[index];
            if (key in chain) {
                const result_value = chain[key as keyof typeof chain];
                if (result_value === value) {
                    return chain;
                }
            }            
        }
    }
    return null;
}