import type ChainInterface from '@/core/Interfaces/Chains/ChainInterface'
import type ChainTokenInterface from '@/core/Interfaces/Tokens/ChainTokenInterface';
import type EVMWalletCredentials from '@/core/Elements/EVMWalletCredentials';
import type TransferBuildElement from '@/core/Elements/TransferBuildElement';
import { defineStore } from 'pinia'
import { EVM_CHAINS } from '@/configs/chains';
import EVMWallet from '@/core/Wallets/EVMWallet';

export const useWalletTransfersStore = defineStore('wallet-transfers', {
    state: (): { [key: string]: any } => {
        return {
            build:{
                loading: false,
                transfer: null,
                message: null,
            },
            token_build:{
                loading: false,
                transfer: null,
                message: null,
            },
            sign:{
                loading: false,
                tx: null,
                message: null,
            },
            send:{
                loading: false,
                transfer: null,
                message: null,
            }
        }
    },
    getters: {
        getTransferBuildLoading: (state) => state.build.loading,
        getTransferBuildItem: (state) => state.build.transfer,
        getTransferBuildMessage: (state) => state.build.message,
        //
        getTokenTransferBuildLoading: (state) => state.token_build.loading,
        getTokenTransferBuildItem: (state) => state.token_build.transfer,
        getTokenTransferBuildMessage: (state) => state.token_build.message,
        //
        getTransferSignLoading: (state) => state.sign.loading,
        getTransferSignTX: (state) => state.sign.tx,
        getTransferSignMessage: (state) => state.sign.message,
        //
        getTransferSendLoading: (state) => state.send.loading,
        getTransferSendItem: (state) => state.send.transfer,
        getTransferSendMessage: (state) => state.send.message,
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async buildTransfer(chain: ChainInterface,wallet: EVMWalletCredentials,recipient: string,amount: string): Promise<TransferBuildElement|null> {
            this.$state.build.loading = false
            try {
                //loading
                if (EVM_CHAINS.some(item => item.constructor.name === chain.constructor.name)) {
                    ///
                    /// EVM ETH|BSC|... WALLET
                    ///                
                    const evm_wallet = new EVMWallet(chain);
                    const transfer = await evm_wallet.transfer_build(wallet,recipient,amount);
                    //
                    this.$state.build.loading = false
                    this.$state.build.transfer = transfer
                    this.$state.build.message = "Transfer builded"

                    return transfer;
                }else{
                    throw new Error("Chain not supported yet for transfers");
                }
            } catch (error) {
                console.log(error);
            }

            this.$state.build.loading = false
            this.$state.build.transfer = null
            this.$state.build.message = null

            return null;
        },
        async buildTokenTransfer(chain: ChainInterface,token: ChainTokenInterface,wallet: EVMWalletCredentials,recipient:string,amount: string): Promise<TransferBuildElement|null> {
            this.$state.token_build.loading = false
            try {
                //loading
                if (EVM_CHAINS.some(item => item.constructor.name === chain.constructor.name)) {
                    ///
                    /// EVM ETH|BSC|... WALLET
                    ///                
                    const evm_wallet = new EVMWallet(chain);
                    const transfer = await evm_wallet.transfer_token_build(token,wallet,recipient,amount);
                    //
                    this.$state.token_build.loading = false
                    this.$state.token_build.transfer = transfer
                    this.$state.token_build.message = "Token Transfer builded"

                    return transfer;
                }else{
                    throw new Error("Chain not supported yet for transfers");
                }
            } catch (error) {
                console.log(error);
            }

            this.$state.token_build.loading = false
            this.$state.token_build.transfer = null
            this.$state.token_build.message = null

            return null;
        },
        async signTransfer(chain: ChainInterface,wallet: EVMWalletCredentials,transfer_build: TransferBuildElement): Promise<string|null> {
            return null;
            //this.$state.sign.loading
            //this.$state.sign.tx
            //this.$state.sign.message
        },
        async sendTransfer(chain: ChainInterface,TX: string): Promise<boolean> {
            return false;
            //this.$state.send.loading
            //this.$state.send.transfer
            //this.$state.send.message
        },
    },
})
