<template>
    <div class="flex flex-col gap-4">
        <InputText type="text" v-model="keyword" placeholder="Enter you want to search..." />
        <ScrollPanel style="width: 100%; height: 600px">
            <SearchList class="md:w-300" :data="filterData" :rows="4" />
        </ScrollPanel>
    </div>
</template>

<script setup lang="ts">
import { useDebounce } from '@vueuse/core';
import { InputText, ScrollPanel } from 'primevue';
import { computed, ref } from "vue";
import { useMyFetch } from '../../utils/request';
import SearchList from '../SearchList.vue';

defineProps<{ message: string }>();


const keyword = ref('');

const debouncedKeyword = useDebounce(keyword, 300)

const filterData = computed(() => {
  const kw = debouncedKeyword.value.trim().toLowerCase()
  if (!kw) return data.value
  return data.value.filter((item: { name: string; }) => item.name.toLowerCase().includes(kw))
})


const {data} = useMyFetch('/api/product/all').json()

</script>
