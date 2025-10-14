<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: any  // PrimeIcons 图标类名，比如 "pi-bullseye"
}>()
</script>
<template>
    <div>{{data}}</div>
</template>