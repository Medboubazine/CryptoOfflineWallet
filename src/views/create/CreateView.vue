<template>
    <MainLayout>
        <div class="grid grid-cols-1 gap-4">
            <div class="coll-span-full">
                <label class="block mb-2 text-sm font-medium text-gray-700">Choose a network :</label>
                <select id="options" v-model="form.chain" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
                    <option v-for="(chain, index) in supported_chains" :key="index" :value="chain">
                        {{ chain.name }} ({{ index }})
                    </option>
                </select>
            </div>
            <div v-on:click="GenerateWalletCredentials" class="co-span-full cursor-pointer bg-blue-500 rounded-xl text-white px-2 py-4 text-center font-bold">
                Generate my wallet credentials
            </div>
        </div>
    </MainLayout>
    <WalletCreatedModal :show="store.getWallet !== null && modals.created" :wallet="store.getWallet" :chain="form.chain" :modal_status="UpdateCreatedModalStatus" />
</template>
<script lang="ts">
import type ChainInterface from "@/core/Interfaces/Chains/ChainInterface";
import WalletCreatedModal from "@/components/modals/WalletCreatedModal.vue";
import MainLayout from "@/components/layouts/Layout.vue";
import { useCreateWalletStore } from "@/stores/create-wallet";
import { SUPPORTED_CHAINS } from "@/configs/chains";

const store = useCreateWalletStore();

export default {
    name: "CreateView",
    data: (vm) => {
        return {
            store: store,
            supported_chains: SUPPORTED_CHAINS,
            form: {
                chain: Object.values(SUPPORTED_CHAINS)[0],//network
            },
            modals: {
                created: false,
            }
        }
    },
    mounted() {
        //
    },
    methods: {
        UpdateCreatedModalStatus(status: boolean) {
            return this.modals.created = status;
        },
        async GenerateWalletCredentials() {
            const chain: ChainInterface = this.form.chain;

            const wallet = await store.generateWalletCredentials(chain);

            this.UpdateCreatedModalStatus(true);

            return wallet;
        },
    },
    components: {
        MainLayout,
        WalletCreatedModal,
    }
}
</script>