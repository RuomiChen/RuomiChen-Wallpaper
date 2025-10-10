<template>
    <div class="h-screen flex flex-col bg-gray-50">
        <div class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <i class="pi pi-bars text-2xl text-primary cursor-pointer"
                    @click="sidebarVisible = !sidebarVisible"></i>
                <h1 class="text-xl font-semibold text-gray-800">
                    <Button label="Go Back" rounded  raised @click="()=>router.push({name:'Home'})" />
                </h1>
            </div>
            <div class="flex items-center gap-3">
                <Button icon="pi pi-bell" severity="secondary" text rounded />
                <Button icon="pi pi-cog" severity="secondary" text rounded />
                <Avatar label="U" class="bg-primary" shape="circle" />
            </div>
        </div>

        <div class="flex flex-1 overflow-hidden">
            <Transition name="slide">
                <div v-if="sidebarVisible" class="w-64 bg-white border-r border-gray-200 flex flex-col">
                    <div class="p-4">
                        <InputText v-model="searchQuery" placeholder="Search..." class="w-full" />
                    </div>

                    <nav class="flex-1 overflow-y-auto px-2">
                        <div v-for="item in menuItems" :key="item.label" class="mb-1">
                            <div @click="handleMenuClick(item)" :class="[
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors',
                                activeMenu === item.label
                                    ? 'bg-primary text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            ]">
                                <i :class="item.icon"></i>
                                <span class="font-medium">{{ item.label }}</span>
                            </div>
                        </div>
                    </nav>

                    <div class="p-4 border-t border-gray-200">
                        <Button label="New Project" icon="pi pi-plus" class="w-full"
                            @click="() => router.push({ name: 'HandleProject' })" />
                    </div>
                </div>
            </Transition>

            <div class="flex-1 flex flex-col overflow-hidden">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { router } from '../../router'

const sidebarVisible = ref(true)
const searchQuery = ref('')
const activeMenu = ref('Dashboard')

const menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: { name: 'Dashboard' } },
    { label: 'Projects', icon: 'pi pi-folder', route: { name: 'Projects' } },
    { label: 'Tasks', icon: 'pi pi-check-square', route: { name: 'Tasks' } },
    { label: 'Calendar', icon: 'pi pi-calendar', route: { name: 'Calendar' } },
    { label: 'Messages', icon: 'pi pi-envelope', route: { name: 'Messages' } },
    { label: 'Analytics', icon: 'pi pi-chart-line', route: { name: 'Analytics' } },
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