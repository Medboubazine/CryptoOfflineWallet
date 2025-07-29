<template>
    <div class="flex items-center justify-center h-screen">
        <div class="grid grid-cols-1 gap-4">
            <div class="col-span-1">
                <h1 class="text-3xl text-blue-800">Welcome !</h1>
                <p>Manage your crypto currency wallet</p>
            </div>
            <div class="col-span-1">
                <div v-on:click="GetStartedRoute" class="cursor-pointer bg-blue-500 rounded-xl text-white px-2 py-4 text-center font-bold">
                    Get Started
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "HomeView",
    methods: {
        GetStartedRoute() {
            return this.$router.push({ name: "wallet.index" });
        }
    }
}
</script>