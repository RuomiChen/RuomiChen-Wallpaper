<script setup lang="ts">
import { Button, Column, DataTable } from 'primevue';
import { ref } from 'vue';
import { useMyFetch } from '../../utils/request';
import { AppToast } from '../../utils/toast';

interface CheckInDay {
    date: string
    day: number
    checked: boolean
    isToday: boolean
}

interface CheckInRecord {
    date: string
    time: string
}

// 签到相关
const hasCheckedInToday = ref(false)
const consecutiveDays = ref(7)

const checkInCalendar = ref<CheckInDay[]>([
    { date: '2025-01-07', day: 7, checked: true, isToday: false },
    { date: '2025-01-08', day: 8, checked: true, isToday: false },
    { date: '2025-01-09', day: 9, checked: true, isToday: false },
    { date: '2025-01-10', day: 10, checked: true, isToday: false },
    { date: '2025-01-11', day: 11, checked: true, isToday: false },
    { date: '2025-01-12', day: 12, checked: true, isToday: false },
    { date: '2025-01-13', day: 13, checked: false, isToday: true }
])



const checkIn = async () => {

    // 添加签到记录
    const { data, error } = await useMyFetch('/api/user/checkIn').post().json()
    if (!error) {
        hasCheckedInToday.value = true
        consecutiveDays.value++
        // 更新日历
        const today = checkInCalendar.value.find(day => day.isToday)
        if (today) {
            today.checked = true
        }
        AppToast.success('checkIn success')
    }

}
const { data: checkInRecords } = useMyFetch('/api/user/checkIn').json()
console.log(checkInRecords);

</script>

<template>
    <div class="space-y-6">
        <div class=" rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Daily check-in</h2>
                    <p class="text-sm  mt-1">Continuous check-in {{ consecutiveDays }} days</p>
                </div>
                <Button @click="checkIn" :disabled="hasCheckedInToday" :label="hasCheckedInToday ? 'I signed in today' : 'Sign in immediately'"
                    icon="pi pi-check-circle" :class="hasCheckedInToday ? 'p-button-secondary' : 'p-button-success'" />
            </div>

            <div class="grid grid-cols-7 gap-2">
                <div v-for="day in checkInCalendar" :key="day.date" :class="[
                    '  aspect-square rounded-lg flex flex-col items-center justify-center text-sm',
                    day.checked ? ' bg-primary text-black dark:text-white' : 'bg-black/500 dark:text-white',
                    day.isToday ? 'ring-2 ring-green-500' : ''
                ]">
                    <div class="font-medium">{{ day.day }}</div>
                    <i v-if="day.checked" class="pi pi-check text-xs mt-1"></i>
                </div>
            </div>
        </div>

        <div class=" rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold  mb-4">Check History</h3>
            <DataTable :value="checkInRecords" :paginator="true" :rows="10">
                <Column field="date" header="Date" sortable></Column>
                <Column field="time" header="Time"></Column>
            </DataTable>
        </div>
    </div>
</template>