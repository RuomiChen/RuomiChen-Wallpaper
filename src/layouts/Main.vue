<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import ScrollTop from 'primevue/scrolltop';
import { watch } from 'vue';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import { useMyFetch } from '../utils/request';

const setting = useStorage('setting', null)
if (!setting.value) {
    const { data, isFinished, response } = useMyFetch('/api/setting').json()
    watch(() => data.value, () => {
        localStorage.setItem('setting', JSON.stringify(data.value))
    })
}
</script>

<template>
    <div class="container mx-auto py-4 flex flex-col gap-4">
        <Header />
        <router-view />
        <Footer />
        <ScrollTop />
    </div>
</template>
