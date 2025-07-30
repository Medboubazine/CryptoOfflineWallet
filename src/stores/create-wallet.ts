import type WalletCredentialsInterface from '@/core/Interfaces/Credentials/WalletCredentialsInterface';
import type ChainInterface from '@/core/Interfaces/Chains/ChainInterface'
import EVMWallet from '@/core/Wallets/EVMWallet';
import { defineStore } from 'pinia'
import { EVM_CHAINS } from '@/configs/chains';

export const useCreateWalletStore = defineStore('create-wallet', {
    state: (): { [key: string]: any } => {
        return {
            loading: false,
            wallet: null,
            message: null,
            errors: null,
        }
    },
    getters: {
        getLoading: (state) => state.loading,
        getWallet: (state) => state.wallet,
        getMessage: (state) => state.message,
        getErrors: (state) => state.errors,
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async generateWalletCredentials(chain: ChainInterface): Promise<WalletCredentialsInterface|null> {
            //loading
            this.$state.loading = true
            try {
                if (EVM_CHAINS.some(item => item.constructor.name === chain.constructor.name)) {
                    ///
                    /// EVM ETH|BSC|... WALLET
                    ///
                    const wallet = new EVMWallet(chain);
                    const create = await wallet.create();
                    //
                    this.$state.loading = false
                    this.$state.wallet = create
                    this.$state.message = null
                    this.$state.errors = null

                    return create;
                }else{
                }
            } catch (error) {
                console.error(error);
            }
            //end loading
            this.$state.loading = false

            return null;
        },
    },
})
