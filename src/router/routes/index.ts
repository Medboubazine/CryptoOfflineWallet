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
]

export default routes
