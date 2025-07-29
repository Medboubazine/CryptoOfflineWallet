import type ElementInterface from "@/core/Interfaces/Elements/ElementInterface";

export default class TransferSentElement implements ElementInterface{
    /**
     * Transfer Hash
     * @var string
     */
    hash: string;
    /**
     * Source wallet
     * @var string
     */
    from: string;
    /**
     * Target wallet
     * @var string
     */
    to: string|null;
    /**
     * Value
     * @var bigint
     */
    value: bigint;
    /**
     * Constructor
     */
    constructor(
        hash: string,
        from: string,
        to: string|null,
        value: bigint,
    ) {
        this.hash = hash
        this.from = from
        this.to = to
        this.value = value
    }
}