<template>
    <div class="md:h-screen flex flex-col ">
        <div class="  px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <i class="pi pi-bars text-2xl text-primary cursor-pointer"
                    @click="sidebarVisible = !sidebarVisible"></i>
                <h1 class="text-xl font-semibold ">
                    <Button label="Website" rounded raised @click="router.push({ name: 'Home' })" />
                </h1>
            </div>
            <div class="flex items-center gap-3">
                <Button icon="pi pi-bell" severity="secondary" text rounded />
                <Button icon="pi pi-cog" severity="secondary" text rounded />
                <Avatar class="bg-primary" shape="circle" :image="getServerSource(userInfo.avatar)" />
            </div>
        </div>

        <div class="flex flex-1 overflow-hidden md:flex-row flex-col">
            <Transition name="slide">
                <div v-if="sidebarVisible" class="md:w-64 flex flex-col">
                   
                    <nav class="flex-1 overflow-y-auto p-2">
                        <div v-for="item in menuItems" :key="item.label" class="mb-1">
                            <div @click="handleMenuClick(item)" :class="[
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors',
                                activeMenu === item.label
                                    ? 'bg-primary text-white  dark:text-black'
                                    : 'text-primary hover:bg-primary hover:text-white dark:hover:text-black'
                            ]">
                                <i :class="item.icon"></i>
                                <span class="font-medium">{{ item.label }}</span>
                            </div>
                        </div>
                    </nav>

                    <div class="p-4 ">
                        <Button label="New Project" icon="pi pi-plus" class="w-full"
                            @click="() => router.push({ name: 'HandleProject' })" />
                    </div>
                </div>
            </Transition>

            <div class="flex-1 flex flex-col px-6">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '../../router'
import { useGlobalState } from '../../store/user'
import { getServerSource } from '../../utils'

const sidebarVisible = ref(true)
const searchQuery = ref('')
const route = useRoute()
// 🔁 根据当前路径同步菜单选中状态
function syncActiveMenu() {
    const found = menuItems.find((item) => item.route?.name === route.name)
    if (found) {
        activeMenu.value = found.label
    } else {
        activeMenu.value = ''
    }
}
const userState = useGlobalState()
const userInfo = userState.userInfo
// 页面加载时 & 路由变化时 都自动同步
onMounted(syncActiveMenu)
watch(() => route.name, syncActiveMenu)
const activeMenu = ref('Dashboard')

const menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: { name: 'Dashboard' } },
    { label: 'Projects', icon: 'pi pi-folder', route: { name: 'Projects' } },
    { label: 'Tasks', icon: 'pi pi-check-square', route: { name: 'Tasks' } },
    { label: 'Analytics', icon: 'pi pi-chart-line', route: { name: 'Analytics' } },
    { label: 'Trash', icon: 'pi pi-trash', route: { name: 'Trash' } },
    { label: 'Settings', icon: 'pi pi-cog', route: { name: 'Settings' } },
]

function handleMenuClick(item) {
    activeMenu.value = item.label
    if (item.route) {
        router.push(item.route)
    }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from {
    transform: translateX(-100%);
}

.slide-leave-to {
    transform: translateX(-100%);
}
</style>