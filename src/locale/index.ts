import { useStorage } from '@vueuse/core'
import { watchEffect } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

const savedLang = useStorage('lang', 'en')

const i18n = createI18n({
  legacy: false,
  locale: savedLang.value, // 读取本地存储语言
  fallbackLocale: 'en',
  messages: { en, zh },
})

// 监听 locale 改变时自动更新 localStorage
watchEffect(() => {
  savedLang.value = i18n.global.locale.value
})


export default i18n
