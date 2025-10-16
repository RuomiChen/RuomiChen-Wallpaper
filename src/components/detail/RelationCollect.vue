<script setup lang="ts">
import IconTitle from '../IconTitle.vue';
import RelationCollectCard from '../RelationCollectCard.vue';
defineProps<{ data: [] }>();

</script>

<template>
    <div>
         <IconTitle  icon="pi-bullseye" title="Relation Collect" />
         <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10" v-if="data.length">
            <RelationCollectCard :data="item" v-for="item in data" :key="item"/>
         </div>
         <template v-else>
            no data...
         </template>
    </div>
</template>