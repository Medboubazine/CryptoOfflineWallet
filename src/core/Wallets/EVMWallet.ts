import type WalletInterface from "@/core/Interfaces/Wallets/WalletInterface";
import type ChainInterface from "@/core/Interfaces/Chains/ChainInterface";
import EVMWalletAbstract from "@/core//Abstracts/EVMWalletAbstract";

export default class EVMWallet extends EVMWalletAbstract implements WalletInterface{
    constructor(chain: ChainInterface) {
        super(chain)
    }
}