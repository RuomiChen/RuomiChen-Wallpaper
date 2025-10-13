<template>
    <div class="rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold ">User Info</h2>
            <Button v-if="!isEditing" @click="isEditing = true" label="Edit" icon="pi pi-pencil" class="p-button-sm" />
            <div v-else class="space-x-2">
                <Button @click="saveProfile" label="Save" icon="pi pi-check" class="p-button-sm p-button-success" />
                <Button @click="cancelEdit" label="Cancel" icon="pi pi-times" class="p-button-sm p-button-secondary" />
            </div>
        </div>

        <div class="space-y-6" v-if="originalProfile">
            Avatar
            <div class="flex items-center gap-6">
                <img @click="preview" :src="getServerSource(originalProfile.avatar)" alt="Avatar"
                    class="size-34 rounded-full object-cover border-4 border-gray-100" />
                <div v-if="isEditing">
                    <FileUpload mode="basic" chooseIcon="pi pi-upload" chooseLabel="Change Avatar"
                        @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined" />
                </div>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium  mb-2">Nickname</label>
                    <InputText v-model="originalProfile.nickname" :disabled="!isEditing" class="w-full" />
                </div>

                <div>
                    <label class="block text-sm font-medium  mb-2">Email</label>
                    <InputText v-model="originalProfile.email" :disabled="!isEditing" class="w-full" />
                </div>


                <div class="md:col-span-2">
                    <label class="block text-sm font-medium  mb-2">Signature</label>
                    <Textarea v-model="originalProfile.signature" :disabled="!isEditing" rows="4" class="w-full" />
                </div>
            </div>

            <div class="grid grid-cols-3 gap-4 pt-6 border-t">
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">{{ userInfo?.points }}</div>
                    <div class="text-sm text-gray-600 mt-1">Points</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-green-600">{{ userInfo?.checkInDays }}</div>
                    <div class="text-sm text-gray-600 mt-1">CheckInDays</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-purple-600">{{ userInfo?.inviteCount }}</div>
                    <div class="text-sm text-gray-600 mt-1">InviteCount</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Button, FileUpload, InputText, Textarea } from 'primevue'
import { ref } from 'vue'
import { useGlobalState } from '../../store/user'
import { getServerSource } from '../../utils'
import { AppDialog } from '../../utils/dialog'
import { useMyFetch } from '../../utils/request'
import { AppToast } from '../../utils/toast'
import Cropper from '../utils/Cropper.vue'

// 个人信息
const isEditing = ref(false)

const userState = useGlobalState()
const userInfo = userState.userInfo

console.log(userInfo.value);

const genderOptions = [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
    { label: '保密', value: 'other' }
]

// 暂存原始数据，编辑前的快照
const originalProfile = ref({ ...userInfo.value })

const saveProfile = async () => {
    // 保存成功后，更新快照
    isEditing.value = false
    const {nickname,email,signature,avatar} = originalProfile.value
    const {data} = await useMyFetch('/api/user/info').put({nickname,email,signature,avatar}).json()
    // 可以同步到后端
    userState.userInfo.value = data.value
    AppToast.success('update info success')
}

const cancelEdit = () => {
    // 恢复原始数据
    originalProfile.value = userInfo.value
    isEditing.value = false
}
const src = ref(null)
const preview = ()=>{
    if(isEditing.value)
    AppDialog.open(Cropper, {
            header: 'Clip',
            style: {
                width: '50vw',
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: userInfo.value.avatar, // ✅ 直接传 base64
            emits: {
                onSuccess: async (e) => {
                    originalProfile.value.avatar =e
                    // AppToast.success('update avatar success!')
                }
            }
        });
}
function onFileSelect(event) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        src.value = base64;

        // ✅ 在文件读取完成后再打开对话框
        AppDialog.open(Cropper, {
            header: 'Clip',
            style: {
                width: '50vw',
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: base64, // ✅ 直接传 base64
            emits: {
                onSuccess: async (e) => {
                    originalProfile.value.avatar =e
                    // AppToast.success('update avatar success!')
                }
            }
        });
    };

    reader.readAsDataURL(file);
}
</script>