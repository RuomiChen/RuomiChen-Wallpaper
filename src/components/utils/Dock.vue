<template>
    <div class="card dock-demo">
        <div class="dock-window" :style="{ backgroundImage: `url(${getServerSource(data)})` }">
            <Dock :model="items" position="bottom">
                <template #itemicon="{ item }">
                    <img v-tooltip.top="item.label" :alt="item.label as string" :src="item.icon" style="width: 100%" />
                </template>
            </Dock>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Dock } from "primevue";
import { ref } from "vue";
import { getServerSource } from "../../utils";
const props = defineProps<{
    data: string; // 图片 URL
}>();
const items = ref([
    {
        label: 'Finder',
        icon: 'https://primefaces.org/cdn/primevue/images/dock/finder.svg'
    },
    {
        label: 'App Store',
        icon: 'https://primefaces.org/cdn/primevue/images/dock/appstore.svg'
    },
    {
        label: 'Photos',
        icon: 'https://primefaces.org/cdn/primevue/images/dock/photos.svg'
    },
    {
        label: 'Trash',
        icon: 'https://primefaces.org/cdn/primevue/images/dock/trash.png'
    }
]);
function setBackgroundAdaptive(el, imageUrl) {
    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
        const { width, height } = img
        const isSmall = width < el.offsetWidth || height < el.offsetHeight
        el.style.backgroundImage = `url(${imageUrl})`
        el.style.backgroundRepeat = isSmall ? 'repeat' : 'no-repeat'
        el.style.backgroundSize = isSmall ? 'auto' : 'cover'
    }
}

</script>

<style scoped>
.dock-demo>.dock-window {
    width: 100%;
    height: 450px;
    position: relative;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;
}

.dock-demo>.p-dock {
    z-index: 1000;
}
</style>
