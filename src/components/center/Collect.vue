<template>
    <div class="card">
        <DataView :value="data">
            <template #list="slotProps">
                <div class="flex flex-col">
                    <div class="cursor-pointer" @click="to(item._id)" v-for="(item, index) in slotProps.items" :key="index">
                        <div class="flex flex-col sm:flex-row py-6 px-2 gap-4"
                            :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                            <div class="md:w-40 relative">
                                <img class="block xl:block mx-auto rounded w-full" :src="getServerSource(item.source)"
                                    :alt="item.name" />
                            </div>
                            <div class="flex flex-col md:flex-row justify-between  flex-1 gap-6">
                                <div class="p-1 flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <div class="flex items-center gap-2" v-if="item.category.length">
                                            <Tag v-for="j in item.category" severity="contrast" :value="j"
                                                class="text-[12px]"></Tag>
                                        </div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                            }}</span>
                                        <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <div class="flex items-center gap-1.5 text-surface-600 dark:text-surface-400">
                                            <i class="pi pi-eye text-sm"></i>
                                            <span class="text-sm font-medium">{{ item.view }}</span>
                                        </div>

                                        <div class="flex items-center gap-1.5 text-surface-600 dark:text-surface-400">
                                            <i class="pi pi-download text-sm"></i>
                                            <span class="text-sm font-medium">{{ item.download }}</span>
                                        </div>

                                        <div class="flex items-center gap-1.5 text-surface-600 dark:text-surface-400">
                                            <i class="pi pi-heart text-sm"></i>
                                            <span class="text-sm font-medium">{{ item.collect }}</span>
                                        </div>

                                    </div>
                                </div>
                                <!-- avatar  -->
                                <div class="flex flex-col md:items-end gap-8">
                                    <span class="text-xl font-semibold">${{ item.price }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button icon="pi pi-heart" variant="outlined"></Button>
                                        <Button icon="pi pi-shopping-cart" label="Buy Now"
                                            :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                                            class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>

<script setup lang="ts">
import { DataView,  Tag } from "primevue";
import { getServerSource } from "../../utils";
import { router } from "../../router";
import { AppDialog } from "../../utils/dialog";


defineProps<{ data: [] }>();

const to = (id:string) => {
    console.log(id);
    
    router.push({ name: 'WallpaperDetail', params: { id } })
    AppDialog.close()
}

</script>
