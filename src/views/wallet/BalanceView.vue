<template>
    <MainLayout>
        <div class="grid grid-cols-6 gap-4" v-if="chain" :key="chain.slug">
            <div class="col-span-3" v-if="store.getBalanceWallet">
                <div class="w-full bg-white rounded-2xl shadow p-6 border border-gray-200">
                    <h2 class="text-sm text-gray-500 font-medium mb-1">{{ store.getBalanceWallet.symbol }} Balance</h2>
                    <p class="text-2xl font-bold text-gray-800">&#8771; {{ NumberFormat(store.getBalanceWallet.amount, 8) }} {{ store.getBalanceWallet.symbol }}</p>

                    <div class="mt-4 text-xs text-gray-400">
                        {{ store.getBalanceWallet.amount }}
                    </div>
                </div>
            </div>
            <div class="col-span-3" v-if="store.getTokenBalanceWallet">
                <div class="w-full bg-white rounded-2xl shadow p-6 border border-gray-200">
                    <h2 class="text-sm text-gray-500 font-medium mb-1">{{ store.getTokenBalanceWallet.name }} Balance</h2>
                    <p class="text-2xl font-bold text-gray-800">&#8771; {{ NumberFormat(store.getTokenBalanceWallet.amount, 8) }} {{ store.getTokenBalanceWallet.symbol }}</p>

                    <div class="mt-4 text-xs text-gray-400">
                        {{ store.getTokenBalanceWallet.amount }}
                    </div>
                </div>
            </div>
            <div class="col-span-full border-t-2 border-black"></div>
            <div class="col-span-4 flex justify-center items-center">
                <label class="block mb-2 text-sm font-medium text-gray-700">Choose a token :</label>
                <select id="options" v-model="form.token_contract" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
                    <option v-for="(token_contract, index) in addresses" :key="index" :value="token_contract">
                        {{ token_contract.symbol }} ({{ token_contract.name }})
                    </option>
                </select>
            </div>
            <div class="col-span-2 flex justify-center items-center">
                <div @click="FetchTokenBalance" class="w-full cursor-pointer bg-blue-500 rounded-xl text-white px-2 py-4 text-center font-bold">
                    Check
                </div>
            </div>

        </div>
    </MainLayout>
</template>
<script lang="ts">
import MainLayout from "@/components/layouts/Layout.vue";
import { EVM_CHAINS, SUPPORTED_CHAINS, FindChain } from "@/configs/chains";
import type ChainInterface from "@/core/Interfaces/Chains/ChainInterface";
import { useShowWalletStore } from "@/stores/show-wallet";

const store = useShowWalletStore();

export default {
    name: "BalanceView",
    data: (vm) => {
        const DATA: { [key: string]: any } = {
            supported_chains: SUPPORTED_CHAINS,
            evm_chains: EVM_CHAINS,
            store: store,
            chain: null,
            wallet_address: null,
            addresses: null,
            form: {
                token_contract: "",
            }
        }
        return DATA;
    },
    async mounted() {
        //
        const wallet_address = this.$route.params.address;
        const chain_slug = this.$route.params.chain;

        const chain: ChainInterface | null = FindChain('slug', chain_slug);

        if (chain) {
            //
            // Set chain
            //
            this.chain = chain;
            //
            // Set wallet address
            //
            this.wallet_address = wallet_address;
            //
            // Set default token contract
            //
            const addresses = chain.addresses();
            //
            this.addresses = addresses
            //
            if (addresses.length > 0) {
                this.form.token_contract = addresses[0]
            }
            //
            // Fetch balance
            //
            await this.FetchBalance();
        }
    },
    methods: {
        async FetchBalance() {
            if (this.chain) {
                return await store.fetchWalletBalance(this.chain, this.wallet_address);
            }
        },
        async FetchTokenBalance() {
            if (this.chain) {
                const token_contract = this.form.token_contract;
                return await store.fetchWalletTokenBalance(this.chain, token_contract, this.wallet_address);
            }
        },
        NumberFormat(number: number, decimals: number = 2, decimalSeparator: string = '.', thousandsSeparator: string = ',') {
            // Handle non-numeric input
            if (isNaN(number) || number === null) {
                return '0'
            }

            // Round the number to specified decimals
            const rounded = Math.abs(number).toFixed(decimals)

            // Split into integer and decimal parts
            const parts = rounded.split('.')
            let integerPart = parts[0]
            const decimalPart = parts.length > 1 ? parts[1] : ''

            // Add thousands separators
            if (thousandsSeparator) {
                integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
            }

            // Handle negative numbers
            const sign = number < 0 ? '-' : ''

            // Combine all parts
            let result = sign + integerPart
            if (decimals > 0 && decimalPart) {
                result += decimalSeparator + decimalPart
            }

            return result
        }
    },
    components: {
        MainLayout,
    }
}
</script>