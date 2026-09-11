import { createRouter, createWebHashHistory } from 'vue-router'
import AuctionView from '@/views/AuctionView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'auction', component: AuctionView, meta: { title: 'Asta Live' } },
    { path: '/dashboard', name: 'dashboard', component: () => import('@/views/DashboardView.vue'), meta: { title: 'Dashboard' } },
    { path: '/wishlist', name: 'wishlist', component: () => import('@/views/WishlistView.vue'), meta: { title: 'Wishlist' } },
    { path: '/bets', name: 'bets', component: () => import('@/views/BetsView.vue'), meta: { title: 'Scommesse' } },
    { path: '/injuries', name: 'injuries', component: () => import('@/views/InjuriesView.vue'), meta: { title: 'Infortuni' } },
    { path: '/updates', name: 'updates', component: () => import('@/views/UpdatesView.vue'), meta: { title: 'Aggiornamenti' } },
    { path: '/team', name: 'team', component: () => import('@/views/TeamView.vue'), meta: { title: 'Mia Rosa' } },
    { path: '/settings', name: 'settings', component: () => import('@/views/SettingsView.vue'), meta: { title: 'Impostazioni' } },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
