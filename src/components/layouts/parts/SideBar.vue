<template>
    <aside class="w-full bg-white text-black p-4 border border-black rounded-md">
        <nav class="space-y-2">
            <div @click="$router.push({ name: 'wallet.index' })" :class="{ 'bg-gray-600 text-white': $route.name === 'wallet.index' }" class="cursor-pointer block px-3 py-2 rounded hover:bg-gray-700 hover:text-white">Manage</div>
            <div @click="$router.push({ name: 'wallet.create' })" :class="{ 'bg-gray-600 text-white': $route.name === 'wallet.create' }" class="cursor-pointer block px-3 py-2 rounded hover:bg-gray-700 hover:text-white">Create</div>
        </nav>
    </aside>
</template>