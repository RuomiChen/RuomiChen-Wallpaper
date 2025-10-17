<script setup lang="ts">
import { Column, DataTable } from 'primevue';
import { useI18n } from 'vue-i18n';

defineProps<{ data: any }>();

const { t } = useI18n({ useScope: 'global' })

</script>

<template>
    <DataTable :value="data" tableStyle="min-width: 50rem">
        <Column field="goods.name" :header="t('center.storeContent.table.goodsName')"></Column>
        <Column field="goods.desc" :header="t('center.storeContent.table.goodsDesc')"></Column>
        <Column field="num" :header="t('center.storeContent.table.quantity')"></Column>
        <Column field="total_points" :header="t('center.storeContent.table.totalPoints')"></Column>
    </DataTable>
</template>