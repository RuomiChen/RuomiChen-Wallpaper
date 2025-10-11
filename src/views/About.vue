<template>
    <div class="card my-20">
        <Timeline :value="events" align="alternate" class="customized-timeline">
            <template #marker="slotProps">
                <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm"
                    :style="{ backgroundColor: slotProps.item.color }">
                    <i :class="slotProps.item.icon"></i>
                </span>
            </template>
            <template #content="slotProps">
                <Card class="mt-4">
                    <template #title>
                        {{ slotProps.item.status }}
                    </template>
                    <template #subtitle>
                        {{ slotProps.item.date }}
                    </template>
                    <template #content>
                        <p>
                            {{ slotProps.item.content }}
                        </p>
                    </template>
                </Card>
            </template>
        </Timeline>
    </div>
</template>

<script setup>
import { Card, Timeline } from "primevue";
import { ref } from "vue";

const events = ref([
    { status: 'Init', date: '10/8/2025', color: '#9C27B0'},
    { status: 'Processing', date: '11/10/2025', color: '#673AB7', content: 'The wallpaper website has been initially completed' },
]);

</script>

<style lang="scss" scoped></style>
