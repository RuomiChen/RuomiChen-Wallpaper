SimpleDialog<!-- components/SimpleDialog.vue -->
<template>
  <div class="p-4">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
</script>
