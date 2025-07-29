<template>
    <div class="flex items-center justify-center h-screen">
        <div class="grid grid-cols-10 gap-4 w-full md:w-3/4 mx-4">
            <div class="col-span-3">
                <SideBar />
            </div>
            <div class="col-span-7">
                <slot />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import SideBar from './parts/SideBar.vue';

export default {
    name: "MainLayout",
    components: {
        SideBar,
    }
}
</script>