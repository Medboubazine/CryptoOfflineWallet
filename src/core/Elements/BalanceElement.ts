import type ElementInterface from "@/core/Interfaces/Elements/ElementInterface";

export default class BalanceElement implements ElementInterface{
    /**
     * Amount
     * @var string
     */
    amount: string;
    /**
     * Token symbol
     * @var string
     */
    symbol: string;
    /**
     * Constructor
     */
    constructor(amount: string,symbol: string) {
        this.amount = amount
        this.symbol = symbol
    }
}