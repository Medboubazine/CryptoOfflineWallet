import type ChainTokenInterface from "@/core/Interfaces/Tokens/ChainTokenInterface";

export default abstract class ChainTokenAbstract implements ChainTokenInterface{
    /**
     * The name of the token
     * @var string
     */
    name: string;
    /**
     * The name of the token
     * @var string
     */
    symbol: string;
    /**
     * Token contract address
     * @var string
     */
    contract_address: string;
    /**
     * Constructor
     */
    constructor(name: string,symbol: string,contract_address: string) {
        this.name = name
        this.symbol = symbol
        this.contract_address = contract_address
    }
}