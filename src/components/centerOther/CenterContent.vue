<script setup lang="ts">
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue';
import { ref } from 'vue';
import CollectContent from './CollectContent.vue';
import PublishContent from './PublishContent.vue';

const tabs = ref([
    { title: '创作', content: 'Tab 1 Content',value:'0',component:PublishContent},
    { title: '收藏', content: 'Tab 2 Content',value:'1',component:CollectContent},
    // { title: '关注', content: 'Tab 3 Content', value: '2' }
    // { title: '粉丝', content: 'Tab 3 Content', value: '2' }
]);
</script>

<template>
    <Tabs value="0" >
        <TabList>
            <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
        </TabList>
        <TabPanels>
            <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
                <component :is="tab.component"/>
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>