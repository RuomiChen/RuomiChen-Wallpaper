<template>
    <div class="card">
        <MegaMenu :model="items" class="px-8 " style="border-radius: 3rem">
            <template #start>
                <img src="../../public/logo.svg" class="size-14 " />
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

            </template>
            <template #end>
                <div class="flex gap-4 items-center">
                    <Button v-if="!isMobile" icon="pi pi-search" aria-label="Save" @click="search" />
                    <Button :icon="`pi ${isDark ? 'pi-sun' : 'pi-moon'}`" aria-label="Save" @click="toggleDark()" />
                    <SplitButton :label="locale" dropdownIcon="pi pi-language" :model="languageItems" />
                    <OverlayBadge v-if="hasLogin" severity="danger" class="inline-flex">
                        <SplitButton :plain="false" raised text :model="userDropdown">
                            <img :src="getServerSource(user?.avatar)" class="size-14 rounded-full" />
                        </SplitButton>
                    </OverlayBadge>
                    <Button v-else icon="pi pi-user" aria-label="Account"
                        @click="() => router.push({ name: 'Account' })" />
                </div>
            </template>
        </MegaMenu>
    </div>
</template>

<script setup lang="ts">
import { useDark, useMediaQuery, useStorage, useToggle } from '@vueuse/core';
import { Button, MegaMenu, OverlayBadge, SplitButton } from "primevue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import router from "../router";
import { useGlobalState } from "../store/user";
import { getServerSource } from "../utils";
import { AppDialog } from "../utils/dialog";
import { AppToast } from "../utils/toast";
import SearchDIalog from "./dialog/SearchDIalog.vue";


const { t, locale } = useI18n({ useScope: 'global' })


const isDark = useDark()
const toggleDark = useToggle(isDark)
const userDropdown = [
    {
        label: 'Workbench',
        command: () => {
            router.push({ name: 'Dashboard' })
        }
    },
    {
        label: 'Center',
        command: () => {
            router.push({ name: 'Center' })
        }
    },
    {
        separator: true
    },
    {
        label: 'Logout',
        command: () => {
            userState.logout()
            hasLogin.value = null
            AppToast.success('logout success')
        }
    }
];

const hasLogin = useStorage('token', null)

const userState = useGlobalState()
const user = userState.userInfo

const search = () => {
    AppDialog.open(SearchDIalog, {
        header: 'Search',
        style: {
            width: '50vw',
        },
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
        props: {
            message: '注册成功！'
        },

    });
}

const languageItems = ref([
    {
        label: 'zh',
        command: () => {
            changeLanguage('zh')
        }
    },
    {
        label: 'en',
        command: () => {
            changeLanguage('en')
        }
    },
])
const isMobile = useMediaQuery('(max-width: 1023px)')

const items = computed(() => {
    const baseItems = [
        {
            label: computed(() => t('header.home')),
            command: () => router.push('/'),
            root: true
        },
        {
            label: computed(() => t('header.resources')),
            root: true,
            items: [
                [
                    {
                        items: [
                            {
                                label: computed(() => t('header.subMenu.mobile')),
                                icon: 'pi pi-mobile',
                                command: () => router.push({ name: 'WallpaperCategory', params: { category: 'mobile' } })
                            },
                            {
                                label: computed(() => t('header.subMenu.computer')),
                                icon: 'pi pi-desktop',
                                command: () => router.push({ name: 'WallpaperCategory', params: { category: 'computer' } })
                            },
                            {
                                label: computed(() => t('header.subMenu.avatarProduction')),
                                icon: 'pi pi-user',
                                command: () => router.push({ name: 'WallpaperCategory', params: { category: 'mobile' } })
                            }
                        ]
                    }
                ]
            ]
        },
        {
            label: computed(() => t('header.about')),
            command: () => router.push({ name: 'About' }),
            root: true
        },
        {
            label: computed(() => t('header.contact')),
            command: () => router.push({ name: 'Contact' }),
            root: true
        },
        {
            label: computed(() => t('header.otherProduct')),
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
                ]
            ]
        }
    ]

    // ✅ 手机端额外添加 Tools 菜单
    if (isMobile.value) {
        baseItems.push({
            label: computed(() => t('header.tools')),
            root: true,
            items: [
                [
                    {
                        items: [
                            {
                                label: t('header.subMenu.search'),
                                icon: isMobile.value ? '' : 'pi pi-search',
                                command: () => search()
                            },
                        ]
                    }
                ]
            ]
        })
    }

    return baseItems
})
const changeLanguage = (t: string) => {
    if (locale.value == t) return
    locale.value = t
}


</script>
<style scoped>
.p-splitbutton-raised {
    --p-splitbutton-raised-shadow: none;
}
</style>