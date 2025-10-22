import { createRouter, createWebHashHistory, type RouteLocationNormalizedLoadedGeneric } from 'vue-router'

import { useStorage } from '@vueuse/core'
import Main from '../layouts/Main.vue'
import { useMyFetch } from '../utils/request'
import { AppToast } from '../utils/toast'
import About from '../views/About.vue'
import Account from '../views/Account.vue'
import AvatarCreate from '../views/AvatarCreate.vue'
import Center from '../views/Center.vue'
import CenterOther from '../views/CenterOther.vue'
import Contact from '../views/Contact.vue'
import Home from '../views/Home.vue'
import Analytics from '../views/user/Analytics.vue'
import Dashboard from '../views/user/Dashboard.vue'
import HandleProject from '../views/user/HandleProject.vue'
import Project from '../views/user/Project.vue'
import Settings from '../views/user/Settings.vue'
import Tasks from '../views/user/Tasks.vue'
import Trash from '../views/user/Trash.vue'
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
      {
        name: 'Center', path: '/center', component: Center,
        meta: { requiresAuth: true },

      }, {
        name: 'Center', path: '/center', component: Center,
        meta: { requiresAuth: true },
      },{
        name: 'CenterOther', path: '/center/:id', component: CenterOther,
      },{
        name: 'AvatarCreate', path: '/avatar_create', component: AvatarCreate,
      },
      
    ]
  }, {
    name: 'Account', path: '/account', component: Account
  },
  {
    name: 'Workbench', path: '/workbench',
    meta: { requiresAuth: true },
    component: Workbench, children: [
      {
        name: 'Dashboard', path: '', component: Dashboard
      },
      {
        name: 'HandleProject', path: 'handle_project/:type?/:id?', component: HandleProject
      },
      {
        name: 'Projects', path: 'projects', component: Project
      }, {
        name: 'Tasks', path: 'tasks', component: Tasks
      },
      {
        name: 'Analytics', path: 'analytics', component: Analytics
      },
      {
        name: 'Trash', path: 'trash', component: Trash
      },
      {
        name: 'Settings', path: 'settings', component: Settings
      }
    ]
  }

]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 全局前置守卫
router.beforeEach((to, _from, next) => {
  const tokenStore = useStorage('token', null)

  if (to.meta.requiresAuth && !tokenStore.value) {
    // 未登录，跳到登录页
    AppToast.error('please login first')
    next({ name: 'Account', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  logPageView({
    from: from,
    to: to,
  })
})

/**
 * 埋点
 * @param payload 
 */
async function logPageView({ from, to }: { from: RouteLocationNormalizedLoadedGeneric, to: RouteLocationNormalizedLoadedGeneric }) {
  let id: string | undefined
  const tokenStore = useStorage('token', null)


  if (tokenStore.value && to.name === 'WallpaperDetail') {
    id = to.params.id as string // ✅ 通过 params 获取 id
    const {data} = 
    await useMyFetch('/api/record').post({
      from: from.fullPath,
      to: to.fullPath,
      action: 'wallpaper view',
      extra: id ? JSON.stringify({ id }) : undefined
    }).json()
    console.log(data);
    
  }
  // 可以本地存储 / 上报接口
  // fetch("/api/track", { method: "POST", body: JSON.stringify(payload) })
}


export default router