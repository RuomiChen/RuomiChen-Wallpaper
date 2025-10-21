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
                    <Collect v-if="activeTab === 'collect'" :data="collectRecords" @reload="reload" />
                    <Store v-if="activeTab === 'store'" :data="storeData" />
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import CheckIn from '../components/center/CheckIn.vue'
import Collect from '../components/center/Collect.vue'
import Invite from '../components/center/Invite.vue'
import Store from '../components/center/Store.vue'
import UserInfo from '../components/center/UserInfo.vue'
import { useMyFetch } from '../utils/request'
import { AppToast } from '../utils/toast'

const { t } = useI18n({ useScope: 'global' })

const route = useRoute()

// -------------------------------
// 邀请绑定逻辑
// -------------------------------
watch(
  () => route.query.inviteCode,
  async (val) => {
    if (typeof val === 'string' && val) {
      const { data, error } = await useMyFetch(`/api/user/invite/${val}`).json()
      if (!error.value) AppToast.success('Invitation successful')
    }
  },
  { immediate: true }
)

// -------------------------------
// 标签页
// -------------------------------
const tabs = [
  { id: 'profile', label: computed(() => t('center.userInfo')), icon: 'pi pi-user' },
  { id: 'checkin', label: computed(() => t('center.checkInRecord')), icon: 'pi pi-calendar-plus' },
  { id: 'invite', label: computed(() => t('center.invitationRecord')), icon: 'pi pi-users' },
  { id: 'collect', label: computed(() => t('center.collectRecord')), icon: 'pi pi-heart' },
  { id: 'store', label: computed(() => t('center.pointStore')), icon: 'pi pi-shop' }
]

const activeTab = ref('profile')

// -------------------------------
// 数据请求
// -------------------------------
const { data: checkInRecords, execute: checkInExe } = useMyFetch('/api/user/checkIn').json()
const { data: inviteRecords } = useMyFetch('/api/user/invite').json()
const { data: storeData } = useMyFetch('/api/store').json()

// ✅ 收藏数据（支持根据 type 参数刷新）
const collectRecords = ref<any[]>([])
const collectType = ref('computer')

async function fetchCollect(type = 'computer') {
  collectType.value = type
  const { data, error } = await useMyFetch(`/api/collect?type=${type}`).json()
  if (!error.value) {
    collectRecords.value = data.value || []
  }
}

// ✅ 子组件 reload 回调
function reload(type: string) {
  fetchCollect(type)
}

// 默认加载一次
fetchCollect()
</script>

<style scoped>
</style>