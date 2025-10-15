<script setup lang="ts">
import ProjectTable from '../../components/workbench/ProjectTable.vue';
import { useMyFetch } from '../../utils/request';

const {data,isFetching,execute} = useMyFetch('/api/creator/trash').json()
</script>

<template>
    <ProjectTable :data="data" :is-fetching="isFetching" @reload="execute"/>
</template>