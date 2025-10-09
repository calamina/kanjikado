import HiraView from '@/views/HiraView.vue'
import KanaView from '@/views/KanaView.vue'
import KanjiView from '@/views/KanjiView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/', component: HomeView },
    { path: '/hiragana', component: HiraView },
    { path: '/', component: KanaView },
    { path: '/kanji', component: KanjiView },
  ],
})

export default router
