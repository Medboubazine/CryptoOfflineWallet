import HomeView from '@/views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/wallets/create',
        name: 'wallet.create',
        component: () => import('@/views/create/CreateView.vue'),
    },
    {
        path: '/wallets',
        name: 'wallet.index',
        component: () => import('@/views/wallet/IndexView.vue'),
    },
    {
        path: '/wallets/:chain/:address',
        name: 'wallet.balance',
        component: () => import('@/views/wallet/BalanceView.vue'),
    },
    {
        path: '/wallets/:chain/:address/transfers',
        name: 'wallet.transfers',
        component: () => import('@/views/transfer/TransfersListView.vue'),
    },
    {
        path: '/wallets/:chain/:address/transfer',
        name: 'wallet.transfer',
        component: () => import('@/views/transfer/TransferView.vue'),
    },
    {
        path: '/wallets/:chain/:address/transfer-build',
        name: 'wallet.transfer-build',
        component: () => import('@/views/transfer/BuildTransferView.vue'),
    },
    {
        path: '/wallets/:chain/:address/transfer-sign',
        name: 'wallet.transfer-sign',
        component: () => import('@/views/transfer/SignTransferView.vue'),
    },
    {
        path: '/wallets/:chain/:address/transfer-send',
        name: 'wallet.transfer-send',
        component: () => import('@/views/transfer/SendTransferView.vue'),
    },
]

export default routes
