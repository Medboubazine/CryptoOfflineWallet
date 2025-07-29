import type BSCChainTokenInterface from "@/core/Interfaces/Tokens/BSCChainTokenInterface";
import ChainTokenAbstract from "@/core/Abstracts/ChainTokenAbstract";

export default class BSCMainnetTokenUSDT extends ChainTokenAbstract implements BSCChainTokenInterface{
    constructor (){
        super(
            "USD Tether",
            "USDT",
            "0x55d398326f99059fF775485246999027B3197955"
        )
    }
}