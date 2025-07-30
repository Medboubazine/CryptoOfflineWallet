<template>
    <aside class="w-full bg-white text-black p-4 border border-black rounded-md">
        <nav class="space-y-2">
            <div @click="$router.push({ name: 'wallet.index' })" :class="{ 'bg-gray-600 text-white': $route.name === 'wallet.index' }" class="cursor-pointer block px-3 py-2 rounded hover:bg-gray-700 hover:text-white">Home</div>
            <div @click="$router.push({ name: 'wallet.balance', params })" :class="{ 'bg-gray-600 text-white': $route.name === 'wallet.balance' }" class="cursor-pointer block px-3 py-2 rounded hover:bg-gray-700 hover:text-white">Balance</div>
            <div @click="$router.push({ name: 'wallet.transfers', params })" :class="{ 'bg-gray-600 text-white': $route.name === 'wallet.transfers' }" class="cursor-pointer block px-3 py-2 rounded hover:bg-gray-700 hover:text-white">Transfers List</div>
            <div @click="$router.push({ name: 'wallet.transfer', params })" :class="{ 'bg-gray-600 text-white': $route.name === 'wallet.transfer' }" class="cursor-pointer block px-3 py-2 rounded hover:bg-gray-700 hover:text-white">Transfer</div>
            <div @click="$router.push({ name: 'wallet.transfer-build', params })" :class="{ 'bg-gray-600 text-white': $route.name === 'wallet.transfer-build' }" class="cursor-pointer block px-3 py-2 rounded hover:bg-gray-700 hover:text-white">Transfer build</div>
            <div @click="$router.push({ name: 'wallet.transfer-sign', params })" :class="{ 'bg-gray-600 text-white': $route.name === 'wallet.transfer-sign' }" class="cursor-pointer block px-3 py-2 rounded hover:bg-gray-700 hover:text-white">Sign Transfer</div>
            <div @click="$router.push({ name: 'wallet.transfer-send', params })" :class="{ 'bg-gray-600 text-white': $route.name === 'wallet.transfer-send' }" class="cursor-pointer block px-3 py-2 rounded hover:bg-gray-700 hover:text-white">Send transfer</div>
        </nav>
    </aside>
</template>
<script lang="ts">
export default {
    name: "WalletSidebar",
    data: (vm) => {
        const DATA: { [key: string]: any } = {
            params: {}
        }
        return DATA;
    },
    mounted() {
        this.params = this.$route.params
    },
}
</script>