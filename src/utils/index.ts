import dayjs from 'dayjs';
import { ref } from "vue";
import { BASE_URL } from "./request";
export const getServerSource = (url: string | null | undefined) => {
  if (!url) return '' 
  // 判断是否是 Base64
  if (url.startsWith('data:image/')) {
    return url
  }
  // 否则拼接服务器地址
  return BASE_URL + url
}

// 签到相关
export interface CheckInDay {
  date: string
  day: number
  checked: boolean
  isToday: boolean
}

export interface ServerCheckIn {
  date: string
  time: string
}

export function useCheckInCalendar(serverData: ServerCheckIn[], days = 7) {
  const today = dayjs()
  const list: CheckInDay[] = []

  for (let i = days - 1; i >= 0; i--) {
    const current = today.subtract(i, 'day')
    const dateStr = current.format('YYYY-MM-DD')
    list.push({
      date: dateStr,
      day: current.date(),
      checked: serverData.some(d => d.date === dateStr),
      isToday: dateStr === today.format('YYYY-MM-DD')
    })
  }

  return ref(list)
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ObjectValues<T> = T[keyof T];
