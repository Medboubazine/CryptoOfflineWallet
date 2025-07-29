import type ElementInterface from "@/core/Interfaces/Elements/ElementInterface";

export default class TransferBuildElement implements ElementInterface{
    /**
     * Nounce (like id)
     * @var string
     */
    nonce: number;
    /**
     * CONTRACT Address
     * @var string
     */
    to: string;
    /**
     * Value of Native coin
     * @var string
     */
    value: bigint|string;
    /**
     * Gas limit
     * @var string
     */
    gas_limit: number;
    /**
     * 1gas ?= USD
     * @var string
     */
    gas_price: string;
    /**
     * Transfer data
     * @var string
     */
    data: string|null;
    /**
     * Chain ID
     * @var string
     */
    chain_id: number;
    /**
     * Constructor
     */
    constructor(
        nonce: number,
        to: string,
        value: bigint|string,
        gas_limit: number,
        gas_price: string,
        data: string|null,
        chain_id: number,
    ) {
        this.nonce = nonce
        this.to = to
        this.value = value
        this.gas_limit = gas_limit
        this.gas_price = gas_price
        this.data = data
        this.chain_id = chain_id
    }
}