<template>
    <div class="space-y-6">
        <!-- File Upload -->
        <div class="space-y-3">
            <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                class="p-button-outlined" accept="image/*" :maxFileSize="5000000" />
            <p class="text-xs text-gray-500">
                Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
            </p>
        </div>

        <!-- Image Preview -->
        <div v-if="src" class="space-y-3">
            <img :src="localForm.source ? getServerSource(src) : src" alt="Image"
                class="shadow-md rounded-xl w-full sm:w-64 md:w-54" style="filter: grayscale(100%)" />
        </div>

        <!-- Name Input -->
        <div class="space-y-3">
            <label for="name" class="block text-sm font-medium text-gray-700">
                Name <span class="text-red-500">*</span>
            </label>
            <InputText id="name" v-model="localForm.name" placeholder="Enter image name" class="w-full" />
        </div>

        <!-- Category Multi-Select -->
        <div class="space-y-3">
            <label for="category" class="block text-sm font-medium text-gray-700">
                Category <span class="text-red-500">*</span>
            </label>
            <MultiSelect v-model="localForm.categoryArr" :options="category" optionLabel="name" filter
                placeholder="Select categories" :maxSelectedLabels="3" class="w-full md:w-80" />

        </div>

        <!-- Type Dropdown -->
        <div class="space-y-3">
            <label for="type" class="block text-sm font-medium text-gray-700">
                Type <span class="text-red-500">*</span>
            </label>
            <Dropdown id="type" v-model="localForm.type" :options="type" optionLabel="name" optionValue="id"
                placeholder="Select type" class="w-full" />
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
            <Button label="Submit" :loading="loading" icon="pi pi-check" @click="handleSubmit" :disabled="!isFormValid"
                severity="primary" />
            <Button label="Reset" icon="pi pi-refresh" @click="handleReset" severity="secondary" outlined />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import { computed, ref } from 'vue'
import { getServerSource } from '../../utils'
import { useMyFetch } from '../../utils/request'
import { AppToast } from '../../utils/toast'

interface FormDataType {
    name: string
    category: string
    type: string | null
    file: string | null
    source: string | undefined
}

// Props 接收父组件传入的数据和选项
const props = defineProps<{
    category: { id: string; name: string }[]
    type: { id: string; name: string }[]
    formData?: { data: FormDataType, _id: string }
    isEdit?: boolean
}>()


const localForm = ref<FormDataType & { categoryArr: string[]; source: string | undefined }>({
    name: props.formData?.data?.name || '',
    category: props.formData?.data?.category || '',
    categoryArr: props.formData?.data?.category.length
        ? props.formData?.data?.category?.split(',').map((s) => s.trim())
        : [],
    type: props.formData?.data?.type || null,
    file: null,  // 用户新上传的文件
    source: props.formData?.data?.source, // 已有图片 URL
})

const src = ref<string | null>(props.isEdit ? props.formData?.data?.source || null : null)
const submitted = ref(false)
const loading = ref(false)
// 校验表单
const isFormValid = computed(() => {
    return (
        localForm.value.name.trim() !== '' &&
        localForm.value.category.length > 0 &&
        localForm.value.type !== null &&
        (src.value !== null || localForm.value.source !== null)
    )
})

// 文件选择
const onFileSelect = (event: any) => {
    const file = event.files[0]
    if (file) {
        localForm.value.file = file
        const reader = new FileReader()
        reader.onload = (e) => {
            src.value = e.target?.result as string
            localForm.value.source = '' // 用户上传新文件后，source 置空
        }
        reader.readAsDataURL(file)
    }
}
const handleSubmit = async () => {
    if (!isFormValid.value) return
    loading.value = true

    const fd = new FormData()
    fd.append('name', localForm.value.name)
    fd.append('category', localForm.value.categoryArr.join(','))
    fd.append('type', localForm.value.type!)

    // 上传新文件优先，否则传 source
    if (localForm.value.file) {
        fd.append('file', localForm.value.file)
    } else if (localForm.value.source) {
        fd.append('source', localForm.value.source) // 后端处理已有 URL
    }

    try {
        let response
        if (props.isEdit && props.formData?.data) {
            response = await useMyFetch(`/api/creator/check/${props.formData._id}`).put(fd).json()
        } else {
            response = await useMyFetch('/api/creator/create').post(fd).json()
        }
        console.log(response);

        AppToast.success('Submit success')
        submitted.value = true
    } catch (err) {
        console.error(err)
        AppToast.error('Submit failed')
    } finally {
        loading.value = false
    }
}

// 重置
const handleReset = () => {
    localForm.value = {
        name: '',
        category: '',
        categoryArr: [],
        type: null,
        file: null,
        source: ''
    }
    src.value = null
    submitted.value = false
}
</script>
