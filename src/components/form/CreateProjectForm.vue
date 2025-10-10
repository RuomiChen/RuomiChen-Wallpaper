<template>
    <div class="space-y-6">
        <div class="space-y-3">
            <label class="block text-sm font-medium text-gray-700">
            </label>
            <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                class="p-button-outlined" accept="image/*" :maxFileSize="5000000" />
            <p class="text-xs text-gray-500">
                Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
            </p>
        </div>

        <!-- Image Preview -->
        <div v-if="src" class="space-y-3">
            <label class="block text-sm font-medium text-gray-700">
                Preview
            </label>
            <img :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" style="filter: grayscale(100%)" />
        </div>

        <!-- Name Input -->
        <div class="space-y-3">
            <label for="name" class="block text-sm font-medium text-gray-700">
                Name <span class="text-red-500">*</span>
            </label>
            <InputText id="name" v-model="formData.name" placeholder="Enter image name" class="w-full" />
        </div>

        <!-- Category Multi-Select -->
        <div class="space-y-3">
            <label for="category" class="block text-sm font-medium text-gray-700">
                Category <span class="text-red-500">*</span>
            </label>
            <MultiSelect id="category" v-model="formData.category" :options="category" optionLabel="name"
                optionValue="id" placeholder="Select categories" class="w-full" display="chip" />
        </div>

        <!-- Type Dropdown -->
        <div class="space-y-3">
            <label for="type" class="block text-sm font-medium text-gray-700">
                Type <span class="text-red-500">*</span>
            </label>
            <Dropdown id="type" v-model="formData.type" :options="type" optionLabel="name" optionValue="id"
                placeholder="Select type" class="w-full" />
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
            <Button label="Submit" icon="pi pi-check" @click="handleSubmit" :disabled="!isFormValid"
                severity="primary" />
            <Button label="Reset" icon="pi pi-refresh" @click="handleReset" severity="secondary" outlined />
        </div>

        <!-- Form Data Display (for demo) -->
        <div v-if="submitted" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 class="text-sm font-semibold text-green-800 mb-2">
                Submitted Data:
            </h3>
            <pre class="text-xs text-green-700">{{ JSON.stringify(formData, null, 2) }}</pre>
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
import { useMyFetch } from '../../utils/request'

defineProps<{ category: [], type: [] }>();

const src = ref<string | null>(null)
const submitted = ref(false)

const formData = ref({
    name: '',
    category: [] as string[],
    type: null as string | null,
    file: null as File | null
})

const isFormValid = computed(() => {
    return (
        formData.value.name.trim() !== '' &&
        formData.value.category.length > 0 &&
        formData.value.type !== null &&
        formData.value.file !== null
    )
})

const onFileSelect = (event: any) => {
    const file = event.files[0]
    if (file) {
        formData.value.file = file  // 保留 File 对象
        const reader = new FileReader()
        reader.onload = (e) => {
            src.value = e.target?.result as string
        }
        reader.readAsDataURL(file)
    }
}

const handleSubmit = async () => {
    if (!isFormValid.value) return

    // 创建 FormData 对象
    const fd = new FormData()
    fd.append('name', formData.value.name)
    formData.value.category.forEach(cat => fd.append('category[]', cat))
    fd.append('type', formData.value.type!)
    if (formData.value.file) fd.append('file', formData.value.file)

    try {
        const { data, error } = await useMyFetch('/api/creator/create')
            .post(fd)  // 上传 FormData
            .json()
        if (error) return
        submitted.value = true
        console.log('提交成功', data)
    } catch (err) {
        console.error(err)
    }
}

const handleReset = () => {
    formData.value = {
        name: '',
        category: [],
        type: null,
        file: null
    }
    src.value = null
    submitted.value = false
}
</script>
