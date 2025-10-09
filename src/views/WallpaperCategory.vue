<script setup lang="ts">
import { Image } from 'primevue';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getServerSource } from '../utils';
import { useMyFetch } from '../utils/request';

const route = useRoute()
const category = computed(()=>route.params.category) 
// 监听 route.params.category 变化
const url = computed(() => `/api/category/${category.value}`)
const { isFetching, error, data ,execute} = useMyFetch(url).json()
// 监听 category 变化
watch(
  () => route.params.category,
  () => {
    execute()
  }
)
</script>

<template>
    <div v-if="isFetching">loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
        <div class="grid md:grid-cols-5 mt-10">
            <template v-for="item in data" :key="item">
                <Image :src="getServerSource(item.source)" alt="Image" width-="100%"  preview />
            </template>
        </div>
    </div>
</template>
<style scoped>

</style>