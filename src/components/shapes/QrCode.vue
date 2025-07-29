<template>
    <div v-html="svg" />
</template>

<script>
import { toString } from 'qrcode'

export default {
    name: 'QrCode',
    props: {
        content: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            default: 200
        }
    },
    data() {
        return {
            svg: ''
        }
    },
    watch: {
        content: 'generateQR',
        width: 'generateQR'
    },
    mounted() {
        this.generateQR()
    },
    methods: {
        async generateQR() {
            try {
                this.svg = await toString(this.content, {
                    type: 'svg',
                    width: this.width,
                    margin: 1
                })
            } catch (err) {
                console.error('QR generation error:', err)
            }
        }
    }
}
</script>