<script setup lang="ts">
import Advantages from '../components/Advantages.vue';
import Carousel from '../components/Carousel.vue';
import People from '../components/People.vue';
import type { PeopleList } from '../types/people';
import { useMyFetch } from '../utils/request';
const { isFetching, error, data } = useMyFetch<{
    people:PeopleList,
    carousel:any
}>('/api/home/all').json()

</script>

<template>
    <div v-if="isFetching">loading...</div>
    <div v-else-if="error">{{error}}</div>
    <div class="flex flex-col gap-20 w-full" v-else>
        <Carousel :data="data?.carousel!" />
        <People :data="data?.people!"/>
        <Advantages />
       
    </div>

</template>
