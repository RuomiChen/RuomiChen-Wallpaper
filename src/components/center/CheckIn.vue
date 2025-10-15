<script setup lang="ts">
import dayjs from 'dayjs';
import { Button, Column, DataTable } from 'primevue';
import { computed, ref, watch } from 'vue';
import { useGlobalState } from '../../store/user';
import { useCheckInCalendar, type ServerCheckIn } from '../../utils';
import { useMyFetch } from '../../utils/request';
import { AppToast } from '../../utils/toast';
const props = defineProps<{ data: ServerCheckIn[] }>();
const emit = defineEmits(['reload'])
const userState = useGlobalState()
const userInfo = userState.userInfo
const checkIn = async () => {
    const { data, error } = await useMyFetch('/api/user/checkIn').post().json()
    if (!error.value) {
        emit('reload')
        userInfo.value.points = data.value
        userInfo.value.checkInDays++
        AppToast.success('Check-in success ✅')
    } else {
        AppToast.error('Check-in failed ❌')
    }
}
const checkInCalendar = ref([])
watch(
    () => props.data,
    (val) => {
        if (val) {
            console.log('val', val);

            checkInCalendar.value = useCheckInCalendar(val, 7).value
        }
    },
    { immediate: true }
)
const hasCheckedInToday = computed(() => {
    if (!props.data) return false
    const today = dayjs().format('YYYY-MM-DD')
    return props.data.some(record => record.date === today)
})

const consecutiveDays = computed(() => {
    if (!props.data || props.data.length === 0) return 0

    // ✅ 取出所有日期并排序（升序）
    const dates = props.data
        .map(r => dayjs(r.date))
        .sort((a, b) => a.diff(b))

    // ✅ 从最后一天开始往前数连续天数
    let count = 1
    for (let i = dates.length - 1; i > 0; i--) {
        const diff = dates[i].diff(dates[i - 1], 'day')
        if (diff === 1) {
            count++
        } else if (diff > 1) {
            // 断了
            break
        }
    }

    return count
})
</script>

<template>
    <div class="space-y-6">
        <div class=" rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Daily check-in</h2>
                    <p class="text-sm  mt-1">Continuous check-in {{ consecutiveDays }} days</p>
                </div>
                <Button @click="checkIn" :disabled="hasCheckedInToday"
                    :label="hasCheckedInToday ? 'I signed in today' : 'Sign in immediately'" icon="pi pi-check-circle"
                    :class="hasCheckedInToday ? 'p-button-secondary' : 'p-button-success'" />
            </div>

            <div class="grid grid-cols-7 gap-2">
                <div v-for="day in checkInCalendar" :key="day.date" :class="[
                    '  aspect-square rounded-lg flex flex-col items-center justify-center text-sm',
                    day.checked ? 'bg-primary text-white ' : 'bg-black/500 dark:text-white',
                    day.isToday ? 'ring-2 dark:ring-green-500 ring-black/80' : ''
                ]">
                    <div class="font-medium">{{ day.day }}</div>
                    <i v-if="day.checked" class="pi pi-check text-xs mt-1"></i>
                    <div v-if="day.checked" class="mt-4">10 Points</div>
                </div>
            </div>
        </div>

        <div class=" rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold  mb-4">CheckIn History</h3>
            <DataTable :value="data" :paginator="true" :rows="10">
                <Column field="date" header="Date" sortable></Column>
                <Column field="time" header="Time"></Column>
            </DataTable>
        </div>
    </div>
</template>