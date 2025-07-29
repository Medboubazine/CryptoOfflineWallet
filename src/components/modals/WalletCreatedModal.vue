<template>
    <!-- Overlay -->
    <div v-if="show && wallet" class="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <!-- Modal container -->
        <div class="bg-white rounded-lg shadow-lg w-3/4 max-h-[90vh] overflow-y-auto p-6">
            <h2 class="text-xl font-bold mb-4">{{ chain.name }} wallet created</h2>
            <div class="space-y-4">
                <div @click="PrintWindow()" class="flex justify-end font-bold cursor-pointer hover:text-blue-500">
                    <PrintIcon :size="30" title="Print credentials" />
                </div>
                <Alert type="error" message="Please store your credentials in a secure location. Losing them may result in permanent loss of your funds" />
                <table class="w-full table-auto border border-gray-300">
                    <tbody v-if="evm_chains.includes(chain)">
                        <tr>
                            <td class="border px-4 py-2">Address</td>
                            <td class="border px-4 py-2">
                                <code>{{ wallet.address }}</code>
                            </td>
                            <td class="border px-4 py-2">
                                <CopyIcon @click="CopyText(wallet.address)" :size="20" class="cursor-pointer hover:text-blue-500" />
                            </td>
                        </tr>
                        <tr class="bg-gray-50">
                            <td class="border px-4 py-2">Private key</td>
                            <td class="border px-4 py-2">
                                <code>{{ wallet.private_key }}</code>
                            </td>
                            <td class="border px-4 py-2">
                                <CopyIcon @click="CopyText(wallet.private_key)" :size="20" class="cursor-pointer hover:text-blue-500" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-6 text-right">
                <button @click="modal_status(false)" class="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import EVMWalletCredentials from "@/core/Elements/EVMWalletCredentials";
import Alert from "@/components/alerts/Alert.vue";
import CopyIcon from "../icons/CopyIcon.vue";
import PrintIcon from "../icons/PrintIcon.vue";
import BSCMainnet from "@/core/Chains/BSCMainnet/BSCMainnet";
import EthereumMainnet from "@/core/Chains/EthereumMainnet/EthereumMainnet";
import { EVM_CHAINS } from "@/configs/chains";
import * as QRCode from 'qrcode'

export default {
    name: 'Modal',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        wallet: {
            type: [null, EVMWalletCredentials],
            required: true
        },
        chain: {
            type: [BSCMainnet, EthereumMainnet],
            required: true
        },
        modal_status: {
            type: Function,
            required: true
        },
    },
    data: (vm) => {
        return {
            evm_chains: EVM_CHAINS,
        }
    },
    methods: {
        async CopyText(text: string) {
            return await navigator.clipboard.writeText(text);
        },
        async generateQrSvgElement(content: string, size: number = 200): Promise<SVGElement> {
            const svgMarkup = await QRCode.toString(content, {
                type: 'svg',
                width: size,
                margin: 1,
            })

            return svgMarkup;
        },
        async PrintWindow() {
            const print_window = window.open('', '_blank', 'width=794,height=1123')

            if (!print_window) {
                alert('Popup blocked! Please allow popups for this site.')
                return
            }
            if (this.wallet) {
                const doc = print_window.document
                // Build the HTML content safely
                const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${this.chain.name}</title>
                    <style>
                    body { font-family: sans-serif,'Roboto Mono'; padding: 2rem; }
                    .w-full { width: 100%; }
                    .color { color: #2563eb; }
                    .text-center { text-align: center; }
                    p{font-size: 16px;}
                    </style>
                </head>
                <body>
                    <div class="w-full text-center">
                        <h1 class="color">${this.chain.name} Wallet</h1>
                        <p>Address: <code>${this.wallet?.address}</code> </p>
                        <p>Private: <code>${this.wallet?.private_key}</code> </p>
                        <div>
                            ${await this.generateQrSvgElement(this.wallet.address, 200)}
                            ${await this.generateQrSvgElement(this.wallet?.private_key, 200)}
                        </div>
                        <div>
                            ${await this.generateQrSvgElement(this.wallet.address, 200)}
                            ${await this.generateQrSvgElement(this.wallet?.private_key, 200)}
                        </div>
                        <div>
                            ${await this.generateQrSvgElement(this.wallet.address, 200)}
                            ${await this.generateQrSvgElement(this.wallet?.private_key, 200)}
                        </div>
                    </div>
                </body>
                </html>
            `
                // Write HTML using DOM
                doc.open()
                doc.write(html)
                doc.close()
            }
            return true;
        }
    },
    components: {
        Alert,
        CopyIcon,
        PrintIcon,
    },
    emits: ['close']
}
</script>