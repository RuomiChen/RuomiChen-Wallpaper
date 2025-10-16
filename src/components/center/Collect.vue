<template>
    <div class="card">
        <SearchList class="space-y-2" :data="data" :rows="4"/>
    </div>
</template>

<script setup lang="ts">
import router from "../../router";
import { AppDialog } from "../../utils/dialog";
import SearchList from "../SearchList.vue";


defineProps<{ data: [] }>();

const to = (id:string) => {
    console.log(id);
    
    router.push({ name: 'WallpaperDetail', params: { id } })
    AppDialog.close()
}

</script>
