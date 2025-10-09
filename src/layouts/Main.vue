<script setup lang="ts">
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';

</script>

<template>
    <div class="container mx-auto py-4 flex flex-col gap-4">
        <Header />
        <router-view/>
        <Footer />
    </div>
</template>
