<script setup lang="ts">
import { Column, DataTable } from 'primevue';

defineProps<{ data: any }>();

</script>

<template>
    <DataTable :value="data" tableStyle="min-width: 50rem">
        <Column field="goods.name" header="Goods Name"></Column>
        <Column field="goods.desc" header="Goods Description"></Column>
        <Column field="num" header="Quantity"></Column>
        <Column field="total_points" header="Total Points"></Column>
    </DataTable>
</template>