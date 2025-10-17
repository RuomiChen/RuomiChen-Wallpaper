<template>
    <div class="min-h-screen ">
        <Button label="Back" rounded raised @click="router.back()" />
        <ScrollPanel style="height: 85%;">
            <Card>
                <template #title>
                    <div class="flex items-center gap-3">
                        <i class="pi pi-cloud-upload text-primary text-2xl"></i>
                        <span>{{ type ? `${capitalize(type)} Project` : (projectId ? 'Edit Project' : 'Upload Image')
                            }}</span>
                    </div>
                </template>
                <template #content>
                    <CreateProjectForm :handle-type="type" v-if="!projectId || formData._id" :tag="tagOptions"
                        :category="categoryOptions" :type="typeOptions" :form-data="formData" :is-edit="!!projectId"
                        @success="handleSuccess" />
                </template>
            </Card>
        </ScrollPanel>
    </div>
</template>

<script setup lang="ts">
import { Button, ScrollPanel } from 'primevue'
import Card from 'primevue/card'
import { capitalize, computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CreateProjectForm from '../../components/form/CreateProjectForm.vue'
import router from '../../router'
import { useMyFetch } from '../../utils/request'
import { AppToast } from '../../utils/toast'

const route = useRoute()
// ✅ 1. 使用 computed 保证路由变动能实时获取
const projectId = computed(() => route.params.id as string | undefined)
const type = computed(() => route.params.type as string | undefined)

const formData = ref({
    _id: '',
    data: {
        name: '',
        category: [] as string[],
        type: null as string | null,
        file: null as File | null
    }
})

// 获取分类和类型选项
const { data: categoryOptions } = useMyFetch('/api/category/all').json()
const { data: typeOptions } = useMyFetch('/api/type/all').json()
const { data: tagOptions } = useMyFetch('/api/tag/all').json()

// 编辑场景：拉取已有项目数据
const fetchProjectData = async () => {
    try {
        const { data } = await useMyFetch(`/api/creator/check/${projectId.value}`).json()

        formData.value = data.value
    } catch (error: any) {
        AppToast.error('Failed to load project data')
    }
}

// 成功回调
const handleSuccess = () => {
    AppToast.success(projectId ? 'Project updated successfully' : 'Project created successfully')
    router.push({ name: 'Dashboard' })
}


// 初始化
onMounted(() => {
    if (!projectId.value) return
        fetchProjectData()
})
</script>
