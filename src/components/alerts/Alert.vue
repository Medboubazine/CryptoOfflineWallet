<template>
    <div v-if="visible" :class="['rounded-lg px-4 py-3 mb-4 flex items-center justify-between', typeClass]" role="alert">
        <div class="text-sm font-medium">
            {{ message }}
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Alert',
    props: {
        message: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            default: 'info' // info, success, error, warning
        }
    },
    data() {
        return {
            visible: true
        }
    },
    computed: {
        typeClass() {
            switch (this.type) {
                case 'success':
                    return 'bg-green-100 text-green-800'
                case 'error':
                    return 'bg-red-100 text-red-800'
                case 'warning':
                    return 'bg-yellow-100 text-yellow-800'
                default:
                    return 'bg-blue-100 text-blue-800'
            }
        }
    }
}
</script>