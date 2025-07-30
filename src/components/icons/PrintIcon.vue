<template>
    <svg :width="computedSize" :height="computedSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 9V4h12v5" />
        <path d="M6 14H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2" />
        <path d="M6 14v5h6v-5" />
        <path d="M12 14h6v5h-6" />
    </svg>
</template>

<script lang="ts">
export default {
    name: 'PrintIcon',
    props: {
        size: {
            type: [String, Number],
            default: 24
        }
    },
    computed: {
        computedSize() {
            return typeof this.size === 'number' ? `${this.size}px` : this.size
        }
    }
}
</script>