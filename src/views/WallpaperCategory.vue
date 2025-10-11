<script setup lang="ts">
import { Galleria } from 'primevue';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getServerSource } from '../utils';
import { useMyFetch } from '../utils/request';

const route = useRoute()
const category = computed(() => route.params.category)
// 监听 route.params.category 变化
const url = computed(() => `/api/category/${category.value}`)
const { isFetching, error, data, execute } = useMyFetch(url).json()
// 监听 category 变化
watch(
  () => route.params.category,
  () => {
    execute()
  }
)

import { ref } from "vue";
import { router } from '../router';



const images = ref([{
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},{
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},{
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},{
    itemImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},]);
const activeIndex = ref(0);
const responsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);
const displayCustom = ref(false);

const imageClick = (index:any) => {
    activeIndex.value = index;
    displayCustom.value = true;
};
</script>

<template>
  <div v-if="isFetching">loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <div class="card flex justify-center">
      <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="data"
        :responsiveOptions="responsiveOptions" :numVisible="7"  :circular="true"
        :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
        <template #item="slotProps">
          <img :src="getServerSource(slotProps.item.source)" :alt="slotProps.item.name" style="width: 100%; display: block" />
        </template>
        <template #thumbnail="slotProps">
          <img :src="getServerSource(slotProps.item.source)" :alt="slotProps.item.name" style="display: block" />
        </template>
      </Galleria>

      <div v-if="images" class="grid grid-cols-12 gap-4 w-full" >
        <div v-for="(item, index) of data" :key="index" class="col-span-3">
          <img :src="getServerSource(item.source)" :alt="item.name" class="cursor-pointer w-full h-full bg-contain shadow-xl rounded-md"  @click="()=>router.push({name:'WallpaperDetail',params:{id:item._id}})" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>