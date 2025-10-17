<template>
    <div class="space-y-6">

        <!-- File Upload -->
        <div class="space-y-3" v-if="!disabled">
            <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                class="p-button-outlined" accept="image/*" :maxFileSize="5000000" />
            <p class="text-xs text-gray-500">
                Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
            </p>
        </div>

        <!-- Image Preview -->
        <div v-if="src" class="space-y-3">
            <img :src="localForm.source ? getServerSource(src) : src" alt="Image"
                class="shadow-md rounded-xl w-full sm:w-64 md:w-54" />
        </div>

        <!-- Name Input -->
        <div class="space-y-3">
            <label for="name" class="block text-sm font-medium text-gray-700">
                Name <span class="text-red-500">*</span>
            </label>
            <InputText :disabled="disabled" id="name" v-model="localForm.name" placeholder="Enter project name"
                class="w-full" />
        </div>

        <div class="space-y-3">
            <label for="resolution" class="block text-sm font-medium text-gray-700">
                Resolution <span class="text-red-500">*</span>
            </label>
            <InputText :disabled="disabled" id="resolution" v-model="localForm.resolution"
                placeholder="Enter image resolution" class="w-full" />
        </div>


        <!-- Category Multi-Select -->
        <div class="space-y-3">
            <label for="category" class="block text-sm font-medium text-gray-700">
                Category <span class="text-red-500">*</span>
            </label>
            <MultiSelect :disabled="disabled" v-model="localForm.category" :options="category" optionLabel="name" filter
                placeholder="Select categories" :maxSelectedLabels="3" class="w-full md:w-80" />

        </div>

        <!-- Tag Multi-Select -->
        <div class="space-y-3">
            <label for="tag" class="block text-sm font-medium text-gray-700">
                Tag
            </label>
            <MultiSelect :disabled="disabled" v-model="localForm.tag" :options="tag" optionLabel="name" filter
                placeholder="Select tag" :maxSelectedLabels="3" class="w-full md:w-80" />

        </div>

        <!-- Type Dropdown -->
        <div class="space-y-3">
            <label for="type" class="block text-sm font-medium text-gray-700">
                Type <span class="text-red-500">*</span>
            </label>
            <Dropdown :disabled="disabled" id="type" v-model="localForm.type" :options="type" optionLabel="name"
                optionValue="id" placeholder="Select type" class="w-full" />
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
            <Button v-if="handleType != 'view'" :label="disabled ? 'Pass' : 'Submit'" :loading="loading"
                icon="pi pi-check" @click="btnAction" :disabled="!isFormValid" severity="primary" />
            <Button label="Reset" icon="pi pi-refresh" @click="handleReset" severity="secondary" outlined
                v-if="!disabled" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Dropdown, FileUpload, InputText, MultiSelect } from 'primevue'
import Button from 'primevue/button'
import { computed, ref } from 'vue'
import router from '../../router'
import { getServerSource } from '../../utils'
import { useMyFetch } from '../../utils/request'
import { AppToast } from '../../utils/toast'

interface FormDataType {
    name: string
    category: { id: string; name: string }[]   // 修正类型为对象数组
    tag: { id: string; name: string }[]        // 修正类型为对象数组
    type: string | null
    file: File | null
    source: string | undefined
    resolution: string | undefined
}

// Props 接收父组件传入的数据和选项
const props = defineProps<{
    handleType: string
    category: { id: string; name: string }[]
    tag: { id: string; name: string }[]
    type: { id: string; name: string }[]
    formData?: { data: FormDataType; _id: string }
    isEdit?: boolean
}>()
const disabled = computed(() => props?.handleType == 'check' || props?.handleType == 'view')

const localForm = ref<FormDataType>({
    name: props.formData?.data?.name || '',
    resolution: props.formData?.data?.resolution || '',
    category: (() => {
        const cat = props.formData?.data?.category
        if (!props.isEdit || !cat) return []

        if (typeof cat === 'string') { // 字符串
            return (cat as string).includes(',')
                ? (cat as string).split(',').map(id => props.category.find(item => item.id === id)).filter((item): item is { id: string; name: string } => !!item)
                : [props.category.find(item => item.id === cat)].filter((item): item is { id: string; name: string } => !!item)
        }

        return cat // 已经是对象数组
    })(),

    tag: (() => {
        const tg = props.formData?.data.tag
        if (!props.isEdit || !tg) return []

        if (typeof tg === 'string') { // 字符串
            return (tg as string).includes(',')
                ? (tg as string).split(',').map(id => props.tag.find(item => item.id === id)).filter((item): item is { id: string; name: string } => !!item)
                : [props.tag.find(item => item.id === tg)].filter((item): item is { id: string; name: string } => !!item)
        }

        return tg // 已经是对象数组
    })(),

    type: props.formData?.data?.type || null,
    file: null,
    source: props.formData?.data?.source
})

// 绑定图片 src
const src = ref<string | null>(props.isEdit ? props.formData?.data?.source || null : null)

const submitted = ref(false)
const loading = ref(false)

// ------------------------
// 校验表单
// ------------------------
const isFormValid = computed(() => {
    const form = localForm.value
    return (
        form.name.trim() !== '' &&
        // form.categoryArr.length > 0 &&
        form.type !== null &&
        (src.value !== null || form.source !== null)
    )
})

// ------------------------
// 文件选择
// ------------------------
const onFileSelect = (event: any) => {
    const file = event.files[0]
    if (!file) return

    localForm.value.file = file

    const baseName = file.name.replace(/\.[^/.]+$/, '')
    if (!localForm.value.name) {
        localForm.value.name = baseName
    }

    const reader = new FileReader()
    reader.onload = (e) => {
        src.value = e.target?.result as string
        // ✅ 读取图片宽高
        const img = new Image()
        img.onload = () => {
            const width = img.width
            const height = img.height
            localForm.value.resolution = `${width}×${height}` // 自动填充
            console.log(`图片尺寸: ${width}x${height}`)
        }
        img.src = e.target?.result as string
        localForm.value.source = undefined // 用户上传新文件后，source 清空
    }
    reader.readAsDataURL(file)
}

// ------------------------
// 提交表单
// ------------------------
const btnAction = () => {

    if (disabled.value) {
        //pass
        passProject()
    } else {
        handleSubmit()
    }
}
const passProject = async () => {
    const { data } = useMyFetch(`/api/creator/pass_check/${props.formData?._id}`).json()
    console.log(data);

}
const handleSubmit = async () => {
    if (!isFormValid.value) return
    loading.value = true

    const fd = new FormData()
    fd.append('name', localForm.value.name)
    fd.append('category', localForm.value.category.map(item => item.id).join(','))
    fd.append('tag', localForm.value.tag.map(item => item.id).join(','))
    fd.append('type', localForm.value.type!)
    fd.append('resolution', localForm.value.resolution!)

    // 上传新文件优先，否则传 source
    if (localForm.value.file) {
        fd.append('file', localForm.value.file)
    } else if (localForm.value.source) {
        fd.append('source', localForm.value.source!)
    }

    try {
        let response
        if (props.isEdit) {
            response = await useMyFetch(`/api/creator/check/${props.formData!._id}`).put(fd).json()
        } else {
            response = await useMyFetch('/api/creator/create').post(fd).json()
        }
        console.log(response)

        AppToast.success('Submit success')
        router.push({ name: 'Dashboard' })
        submitted.value = true
    } catch (err) {
        console.error(err)
        AppToast.error('Submit failed')
    } finally {
        loading.value = false
    }
}

// ------------------------
// 重置表单
// ------------------------
const handleReset = () => {
    localForm.value = {
        name: '',
        category: [],
        tag: [],
        type: null,
        file: null,
        source: undefined,
        resolution: ''
    }
    src.value = null
    submitted.value = false
}
</script>
