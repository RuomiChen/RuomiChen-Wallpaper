<template>
    <div class="card">
        <div
            class=" text-[#b7b7b7] flex flex-col md:flex-row p-3 gap-4 rounded-[30px] shadow-[inset_3px_3px_10px_#191919,inset_-3px_-3px_10px_#514b51]">
            <FilterBlock :data="items" :current-key="currentKey" @update-key="(data) => currentKey = data" />
        </div>
        <SearchList class="space-y-2" :data="data" :rows="4"   :current-key="currentKey"/>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import router from "../../router";
import { AppDialog } from "../../utils/dialog";
import FilterBlock from "../FilterBlock.vue";
import SearchList from "../SearchList.vue";

const emit = defineEmits(['reload'])

defineProps<{ data: [] }>();

const to = (id: string) => {
    console.log(id);

    router.push({ name: 'WallpaperDetail', params: { id } })
    AppDialog.close()
}


const items = [
    {
        label: '电脑壁纸',
        key: 'computer'
    }, {
        label: '手机壁纸',
        key: 'mobile'
    }, 
]
const currentKey = ref('computer')

watch(()=>currentKey.value,(val)=>{
    emit('reload',val)
})
</script>
