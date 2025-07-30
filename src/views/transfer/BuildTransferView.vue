<template>
    <WalletLayout v-if="chain">
        <h1>Build Transfer</h1>
        <div class="w-full mx-auto bg-white p-6 rounded-lg shadow space-y-4">
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">From Address</label>
                <input type="text" v-model="form.from" class="block w-full cursor-not-allowed  px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500" placeholder="Your address" disabled />
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">To Address</label>
                <input type="text" v-model="form.to" class="block w-full cursor-not-allowed  px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500" placeholder="Enter the recipient address" />
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">Currency</label>
                <select v-model="form.currency" class="block w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500">
                    <option disabled value="">Select currency</option>
                    <option v-for="currency in currencies" :key="currency.symbol" :value="currency">{{ currency.symbol }} ({{ currency.name }})</option>
                </select>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">Amount</label>
                <input type="number" v-model="form.amount" min="0" class="block w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500" placeholder="Amount (up to 18 decimals)" />
            </div>
            <button @click="Build()" class="w-full cursor-pointer bg-blue-600 text-white py-2 rounded font-bold">Submit Transfer</button>
        </div>
    </WalletLayout>
</template>
<script lang="ts">
import type ChainTokenInterface from "@/core/Interfaces/Tokens/ChainTokenInterface";
import type ChainInterface from "@/core/Interfaces/Chains/ChainInterface";
import { useWalletTransfersStore } from "@/stores/wallet-transfers";
import WalletLayout from "@/components/layouts/WalletLayout.vue";
import { EVM_CHAINS, FindChain } from "@/configs/chains";
import EVMWalletCredentials from "@/core/Elements/EVMWalletCredentials";
import type TransferBuildElement from "@/core/Elements/TransferBuildElement";

const store = useWalletTransfersStore();

export default {
    name: 'BuildTransferView',
    data: (vm) => {
        const DATA: { [key: string]: any } = {
            chain: null,
            address: null,
            currencies: [],
            form: {
                from: '',
                to: '0x159a80e37aEc1949c801CC1916D0198Ab8272Fad',
                currency: '',
                amount: 1
            }
        }
        return DATA;
    },
    mounted() {
        const address = this.$route.params.address
        const chain_slug = this.$route.params.chain

        const chain: ChainInterface | null = FindChain('slug', chain_slug);

        if (chain) {
            this.address = address
            this.form.from = address

            this.chain = chain;

            const chain_currency: ChainTokenInterface = {
                name: chain.currency,
                symbol: chain.currency,
                contract_address: "",
            }

            this.currencies = [
                chain_currency,
                ...chain.addresses(),
            ]

        }

    },
    methods: {
        async Build() {
            const chain: ChainInterface = this.chain;

            if (chain) {
                if (EVM_CHAINS.some(item => item.constructor.name === chain.constructor.name)) {
                    //
                    // When EVM transfers
                    //
                    const wallet = new EVMWalletCredentials(this.address, '');//No need private key here. Pass empty string for security reasons.

                    var transfer: TransferBuildElement | null;
                    this.form.amount = this.form.amount.toString()
                    if (this.form.currency.symbol == chain.currency) {
                        ///
                        /// TRANSFER
                        ///
                        await store.buildTransfer(chain, wallet, this.form.to, this.form.amount);
                        transfer = store.getTransferBuildItem
                    } else {
                        ///
                        /// TOKEN TRANFER
                        ///
                        await store.buildTokenTransfer(chain, this.form.currency, wallet, this.form.to, this.form.amount);

                        transfer = store.getTokenTransferBuildItem
                    }
                    //
                    // get transfer
                    //
                    console.log(transfer);
                    //EXPORT TRANFER BUILD TO A FILE
                } else {
                    throw new Error("Chain wallet not supported yet for transfer build");
                }
            } else {
                throw new Error("Chain not found");
            }
        }
    },
    components: {
        WalletLayout,
    }
}
</script>