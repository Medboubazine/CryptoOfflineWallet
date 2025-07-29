import type BSCChainTokenInterface from "@/core/Interfaces/Tokens/BSCChainTokenInterface";
import ChainTokenAbstract from "@/core/Abstracts/ChainTokenAbstract";

export default class BSCMainnetTokenXRP extends ChainTokenAbstract implements BSCChainTokenInterface{
    constructor (){
        super(
            "XRP",
            "XRP",
            "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE"
        )
    }
}