<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import IconTitle from '../IconTitle.vue';
import RelationCollectCard from '../RelationCollectCard.vue';
defineProps<{ data: [] }>();
const { t, locale } = useI18n({ useScope: 'global' })

</script>

<template>
    <div>
         <IconTitle  icon="pi-bullseye" :title="t('common.relationCollect')" />
         <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10" v-if="data.length">
            <RelationCollectCard :data="item" v-for="item in data" :key="item"/>
         </div>
         <template v-else>
            no data...
         </template>
    </div>
</template>