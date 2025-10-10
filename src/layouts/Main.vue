<script setup lang="ts">
import ScrollTop from 'primevue/scrolltop';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
</script>

<template>
    <div class="container mx-auto py-4 flex flex-col gap-4">
        <Header />
        <router-view/>
        <Footer />
        <ScrollTop />
    </div>
</template>
