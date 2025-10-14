<template>
    <div class="min-h-screen  p-6">
        <div class="">

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div class="lg:col-span-1">
                    <div class=" rounded-lg shadow-sm p-4">
                        <nav class="space-y-2">
                            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                                'cursor-pointer w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                                activeTab === tab.id
                                    ? 'bg-primary text-white font-medium'
                                    : 'dark:text-white hover:'
                            ]">
                                <i :class="tab.icon"></i>
                                <span>{{ tab.label }}</span>
                            </button>
                        </nav>
                    </div>
                </div>

                <div class="lg:col-span-3">
                    <UserInfo v-if="activeTab === 'profile'" />
                    <Invite v-if="activeTab === 'invite'" :data="inviteRecords"/>
                    <CheckIn v-if="activeTab === 'checkin'" :data="checkInRecords" @reload="checkInExe"/>
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CheckIn from '../components/center/CheckIn.vue'
import Invite from '../components/center/Invite.vue'
import UserInfo from '../components/center/UserInfo.vue'
import { useMyFetch } from '../utils/request'
import { AppToast } from '../utils/toast'
const route = useRoute()


// ✅ 监听 query 变化（包括刷新页面时）
watch(
  () => route.query.inviteCode,
  (val) => {
    if (typeof val === 'string' && val) {
      handleInvite(val)
    }
  },
  { immediate: true } // ✅ 页面刷新时立即执行一次
)
  // ✅ 自定义逻辑函数
  const handleInvite = async (inviteCode: string) => {
    // 这里写绑定逻辑，例如请求后端接口
    // AppToast.info(`dected invitecode:${inviteCode}`)
    const {data,error} =  await useMyFetch(`/api/user/invite/${inviteCode}`).json()
    if(!error.value)
    AppToast.success('Invitation successful')
    
  }



// 标签页配置
const tabs = [
    { id: 'profile', label: 'User Info', icon: 'pi pi-user' },
    { id: 'checkin', label: 'CheckIn Record', icon: 'pi pi-calendar-plus' },
    { id: 'invite', label: 'Invitation Record', icon: 'pi pi-users' }
]

const activeTab = ref('profile')

const { data: checkInRecords,execute:checkInExe } = useMyFetch('/api/user/checkIn').json()
const { data: inviteRecords } = useMyFetch('/api/user/invite').json()


</script>

<style scoped>
</style>