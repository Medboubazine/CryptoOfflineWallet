<template>
    <MainLayout>
        <div class="grid grid-cols-1 gap-4">
            <div class="coll-span-full">
                create another route for transfers list
                creat route for transfer build,sign,send
                create separate build,sign,send transfer routes
            </div>
            <div class="col-span-full">
                <label class="block mb-2 text-sm font-medium text-gray-700">Wallet address :</label>
                <input v-model="form.address" type="text" placeholder="Enter your address" class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="coll-span-full">
                <label class="block mb-2 text-sm font-medium text-gray-700">Choose a network :</label>
                <select id="options" v-model="form.chain" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
                    <option v-for="(chain, index) in supported_chains" :key="index" :value="chain">
                        {{ chain.name }} ({{ index }})
                    </option>
                </select>
            </div>

            <div @click="GotToBalanceRoute" class="col-span-full cursor-pointer bg-blue-500 rounded-xl text-white px-2 py-4 text-center font-bold">
                Check my wallet balance
            </div>
        </div>
    </MainLayout>
</template>
<script lang="ts">
import MainLayout from "@/components/layouts/Layout.vue";
import { EVM_CHAINS, SUPPORTED_CHAINS } from "@/configs/chains";


export default {
    name: "WalletView",
    data: (vm) => {
        return {
            supported_chains: SUPPORTED_CHAINS,
            evm_chains: EVM_CHAINS,
            form: {
                chain: Object.values(SUPPORTED_CHAINS)[0],//network
                address: '',//address
            },
        }
    },
    mounted() {
        //
    },
    methods: {
        GotToBalanceRoute() {
            return this.$router.push({
                name: "wallet.balance",
                params: {
                    chain: this.form.chain.slug,
                    address: this.form.address,
                },
            });
        },
    },
    components: {
        MainLayout,
    }
}
</script>