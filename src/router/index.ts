import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '../layouts/Main.vue'
import About from '../views/About.vue'
import Account from '../views/Account.vue'
import Center from '../views/Center.vue'
import Contact from '../views/Contact.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/user/Dashboard.vue'
import HandleProject from '../views/user/HandleProject.vue'
import Workbench from '../views/user/Workbench.vue'
import WallpaperCategory from '../views/WallpaperCategory.vue'
import WallpaperDetail from '../views/WallpaperDetail.vue'

const routes = [
  {
    name: 'Main', path: '/', component: Main, children: [
      { name: 'Home', path: '/', component: Home },
      { name: 'WallpaperCategory', path: '/wallpaper_cate/:category', component: WallpaperCategory },
      { name: 'Contact', path: '/contact', component: Contact },
      { name: 'About', path: '/about', component: About },
      { name: 'WallpaperDetail', path: '/wallpaper/:id', component: WallpaperDetail },
      { name: 'Center', path: '/center', component: Center },
    ]
  }, {
    name: 'Account', path: '/account', component: Account
  },
  {
    name: 'Workbench', path: '/workbench', component: Workbench, children: [
      {
        name: 'Dashboard', path: '', component: Dashboard
      },
      {
        name: 'HandleProject', path: 'handle_project/:id?', component: HandleProject
      }
    ]
  }

]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})