import type EthereumChainTokenInterface from "@/core/Interfaces/Tokens/EthereumChainTokenInterface";
import ChainTokenAbstract from "@/core/Abstracts/ChainTokenAbstract";

export default class EthereumMainnetTokenUSDT extends ChainTokenAbstract implements EthereumChainTokenInterface{
    constructor (){
        super(
            "USDT Tether",
            "USDT",
            "0xdAC17F958D2ee523a2206206994597C13D831ec7"
        )
    }
}