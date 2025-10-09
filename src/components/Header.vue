<template>
    <div class="card">
        <MegaMenu :model="items" class="px-8 " style="border-radius: 3rem">
            <template #start>
                <img src="/logo.svg" class="size-14 " />
            </template>
            <template #item="{ item }">
                <a v-if="item.root" :href="item.url"
                    class="flex items-center cursor-pointer px-4 py-2 overflow-hidden relative font-semibold text-lg uppercase"
                    style="border-radius: 2rem">
                    <span>{{ item.label }}</span>
                </a>
                <a v-else-if="!item.image" class="flex items-center p-4 cursor-pointer mb-2 gap-3">
                    <span class="inline-flex items-center justify-center rounded-full  w-12 h-12">
                        <i :class="[item.icon, 'text-lg']"></i>
                    </span>
                    <span class="inline-flex flex-col gap-1">
                        <span class="font-bold text-lg">{{ item.label }}</span>
                        <span class="whitespace-nowrap">{{ item.subtext }}</span>
                    </span>
                </a>
                <div v-else class="flex flex-col items-start gap-4 p-2">
                    <img alt="megamenu-demo" :src="item.image" class="w-full" />
                    <span>{{ item.subtext }}</span>
                    <Button :label="item.label" variant="outlined" />
                </div>
            </template>
            <template #end>
                <div class="flex gap-4">
                    <Button class=" self-center" :icon="`pi ${isDark ? 'pi-sun' : 'pi-moon'}`" aria-label="Save"
                        @click="toggleDark()" />
                        
                    <OverlayBadge v-if="hasLogin" value="4" severity="danger" class="inline-flex">
                        <!-- <Avatar class="p-overlay-badge"
                            :image="getServerSource(user.avatar)" size="xlarge" /> -->
                        <img :src="getServerSource(user.avatar)" class="size-14 rounded-full" />
                    </OverlayBadge>
                    <Button v-else icon="pi pi-user" aria-label="Account"
                        @click="() => router.push({ name: 'Account' })" />
                </div>
            </template>
        </MegaMenu>
    </div>
</template>

<script setup>
import { Button, MegaMenu, OverlayBadge } from "primevue";
import { computed, ref } from "vue";
import { router } from "../router";

import { useDark, useStorage, useToggle } from '@vueuse/core';
import { getServerSource } from "../utils";

const isDark = useDark()
const toggleDark = useToggle(isDark)



const hasLogin = useStorage('token', null)
const user = computed(() => {
    const data = useStorage('userInfo', null, localStorage)
    return JSON.parse(data.value)
})

const items = ref([
    {
        label: 'Home',
        command: () => {
            // Callback to run
            router.push('/')
        },
        root: true
    },

    {
        label: 'Resources',
        root: true,
        items: [
            [
                {
                    items: [
                        {
                            label: 'Mobile phone wallpaper', icon: 'pi pi-mobile', command: () => {
                                // Callback to run
                                router.push({ name: 'WallpaperCategory', params: { category: 'mobile' } })
                            },
                        },
                        {
                            label: 'Computer wallpaper', icon: 'pi pi-desktop', command: () => {
                                // Callback to run
                                router.push({ name: 'WallpaperCategory', params: { category: 'computer' } })
                            },
                        },
                        {
                            label: 'Avatar production', icon: 'pi pi-user', command: () => {
                                // Callback to run
                                router.push({ name: 'WallpaperCategory', params: { category: 'mobile' } })
                            },
                        },
                    ]
                }
            ],
        ]
    },
    {
        label: 'Contact',
        command: () => {
            // Callback to run
            router.push('/contact')
        },
        root: true
    }, {
        label: 'Other Product',
        root: true,
        items: [
            [
                {
                    items: [
                        { label: 'Features', icon: 'pi pi-list', subtext: 'Subtext of item' },
                        { label: 'Customers', icon: 'pi pi-users', subtext: 'Subtext of item' },
                        { label: 'Case Studies', icon: 'pi pi-file', subtext: 'Subtext of item' }
                    ]
                }
            ],
            [
                {
                    items: [
                        { label: 'Solutions', icon: 'pi pi-shield', subtext: 'Subtext of item' },
                        { label: 'Faq', icon: 'pi pi-question', subtext: 'Subtext of item' },
                        { label: 'Library', icon: 'pi pi-search', subtext: 'Subtext of item' }
                    ]
                }
            ],
            [
                {
                    items: [
                        { label: 'Community', icon: 'pi pi-comments', subtext: 'Subtext of item' },
                        { label: 'Rewards', icon: 'pi pi-star', subtext: 'Subtext of item' },
                        { label: 'Investors', icon: 'pi pi-globe', subtext: 'Subtext of item' }
                    ]
                }
            ],
            [
                {
                    items: [{ image: 'https://primefaces.org/cdn/primevue/images/uikit/uikit-system.png', label: 'GET STARTED', subtext: 'Build spectacular apps in no time.' }]
                }
            ]
        ]
    },
]);
</script>
