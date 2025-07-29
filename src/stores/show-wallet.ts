import type ChainInterface from '@/core/Interfaces/Chains/ChainInterface'
import EVMWallet from '@/core/Wallets/EVMWallet';
import { defineStore } from 'pinia'
import { EVM_CHAINS } from '@/configs/chains';
import type ChainTokenInterface from '@/core/Interfaces/Tokens/ChainTokenInterface';

export const useShowWalletStore = defineStore('show-wallet', {
    state: (): { [key: string]: any } => {
        return {
            balance:{
                loading: false,
                wallet: null,
                message: null,
            },
            token_balance:{
                loading: false,
                wallet: null,
                message: null,
            }
        }
    },
    getters: {
        getBalanceLoading: (state) => state.balance.loading,
        getBalanceWallet: (state) => state.balance.wallet,
        getBalanceMessage: (state) => state.balance.message,
        getTokenBalanceLoading: (state) => state.token_balance.loading,
        getTokenBalanceWallet: (state) => state.token_balance.wallet,
        getTokenBalanceMessage: (state) => state.token_balance.message,
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async fetchWalletBalance(chain: ChainInterface,address: string): Promise<boolean> {
            //loading
            this.$state.balance.loading = true
            try {
                if (EVM_CHAINS.some(item => item.constructor.name === chain.constructor.name)) {
                    ///
                    /// EVM ETH|BSC|... WALLET
                    ///
                    const wallet = new EVMWallet(chain);
                    //base ballance
                    const balance = await wallet.balance(address);
                    //
                    this.$state.balance.loading = false
                    this.$state.balance.wallet = balance
                    this.$state.balance.message = null

                    return true;
                }else{
                    throw new Error("Chain not suppoted yet");
                }
            } catch (error) {
                console.error(error);
            }
            //end loading
            this.$state.balance.loading = false

            return false;
        },
        async fetchWalletTokenBalance(chain: ChainInterface,token_contract: ChainTokenInterface ,address: string): Promise<boolean> {
            //loading
            this.$state.token_balance.loading = true
            try {
                if (EVM_CHAINS.some(item => item.constructor.name === chain.constructor.name)) {
                    ///
                    /// EVM ETH|BSC|... WALLET
                    ///
                    const wallet = new EVMWallet(chain);
                    //tokens
                    const token_balance = await wallet.balance_token(token_contract,address);
                    //
                    this.$state.token_balance.loading = false
                    this.$state.token_balance.wallet = token_balance
                    this.$state.token_balance.message = null

                    return true;
                }else{
                    throw new Error("Chain not suppoted yet");
                }
            } catch (error) {
                console.error(error);
            }
            //end loading
            this.$state.token_balance.loading = false

            return false;
        },
    },
})
