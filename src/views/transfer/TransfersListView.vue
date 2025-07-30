<template>
    <WalletLayout v-if="chain">
        <h1 class="text-xl font-bold mb-4">Transfers list</h1>
        <Alert :type="'info'">
            To check transactions list please click : <a :href="chain.exploreAddress(address)" class="font-bold" target="_blank">Explore transations list</a></Alert>
    </WalletLayout>
</template>
<script lang="ts">
import Alert from "@/components/alerts/Alert.vue";
import WalletLayout from "@/components/layouts/WalletLayout.vue";
import { FindChain } from "@/configs/chains";
import type ChainInterface from "@/core/Interfaces/Chains/ChainInterface";

export default {
    name: 'TransfersListView',
    data: (vm) => {
        const DATA: { [key: string]: any } = {
            chain: null,
            address: null,
        }
        return DATA;
    },
    mounted() {
        this.address = this.$route.params.address
        const chain_slug = this.$route.params.chain

        const chain: ChainInterface | null = FindChain('slug', chain_slug);

        this.chain = chain;


    },
    components: {
        WalletLayout,
        Alert,
    },
}
</script>