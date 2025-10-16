<script setup lang="ts">
import IconTitle from '../IconTitle.vue';
defineProps<{ data: [] }>();

</script>

<template>
    <div>
        <IconTitle icon="pi-bullseye" title="Relation Tag" />
        <div class="mt-10 flex items-center gap-4" v-if="data.length">
            <div v-for="tag in data" :key="tag"
                class="flex items-center  gap-2 dark:bg-[rgba(84,84,84,.48)] rounded-[20px] px-3 py-[5px] text-shadow-[0_0_10px_#fff1f1]">
                <i class="pi pi-bullseye" />
                {{ tag }}
            </div>
        </div>
        <template v-else>
            no data...
        </template>
    </div>
</template>