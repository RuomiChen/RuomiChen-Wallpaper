<template>
    <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div class="">
            <Card>
                <template #title>
                    <div class="flex items-center gap-3">
                        <i class="pi pi-cloud-upload text-primary text-2xl"></i>
                        <span>Upload Image</span>
                    </div>
                </template>
                <template #content>
                    <CreateProjectForm :category="categoryOptions" :type="typeOptions" @success="handleSuccess" />
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import { computed, ref } from 'vue'
import CreateProjectForm from '../../components/form/CreateProjectForm.vue'
import { router } from '../../router'
import { useMyFetch } from '../../utils/request'
import { AppToast } from '../../utils/toast'

import { useRoute } from 'vue-router'
const route = useRoute()
const projectId = route.params.id as string | undefined
if (projectId) {
  // 如果有 id，说明是编辑，调用接口获取数据
  console.log(projectId);
  
}

const src = ref(null)
const submitted = ref(false)

const formData = ref({
    name: '',
    categories: [],
    type: null,
    file: null
})

const { data: categoryOptions } = useMyFetch('/api/category/all').json()
const { data: typeOptions } = useMyFetch('/api/type/all').json()


const isFormValid = computed(() => {
    return (
        formData.value.name.trim() !== '' &&
        formData.value.categories.length > 0 &&
        formData.value.type !== null &&
        src.value !== null
    )
})

const onFileSelect = (event) => {
    const file = event.files[0]
    if (file) {
        formData.value.file = file
        const reader = new FileReader()
        reader.onload = (e) => {
            src.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const handleSuccess = () => {
    AppToast.success('create project success')
    router.push({name:'Dashboard'})
}

const handleReset = () => {
    formData.value = {
        name: '',
        categories: [],
        type: null,
        file: null
    }
    src.value = null
    submitted.value = false
}
</script>