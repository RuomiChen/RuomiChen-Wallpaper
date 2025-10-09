import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '../layouts/Main.vue'
import Account from '../views/Account.vue'
import Contact from '../views/Contact.vue'
import Home from '../views/Home.vue'
import WallpaperCategory from '../views/WallpaperCategory.vue'

const routes = [
  {
    name: 'Main', path: '/', component: Main, children: [
      { name: 'Home', path: '/', component: Home },
      { name: 'WallpaperCategory', path: '/wallpaper_cate/:category', component: WallpaperCategory },
      { name: 'Contact', path: '/contact', component: Contact },
    ]
  }, {
    name: 'Account', path: '/account', component: Account
  }

]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})