import type { ToastServiceMethods } from 'primevue/toastservice'

let toastInstance: ToastServiceMethods | null = null

/** 在 App.vue 中注册 Toast 实例 */
export function setToastInstance(instance: ToastServiceMethods) {
  toastInstance = instance
}

/** 获取 Toast 实例（带安全检查） */
function getToast() {
  if (!toastInstance) {
    console.warn('[toast] Toast instance not registered yet.')
    return null
  }
  return toastInstance
}

/** 封装通用 Toast 调用 */
export const AppToast = {
  show(type: 'success' | 'error' | 'info' | 'warn', summary: string, detail?: string, life = 3000) {
    const toast = getToast()
    if (!toast) return

    toast.add({
      severity: type,
      summary,
      detail,
      life,
    })
  },

  success(summary: string, detail?: string, life = 3000) {
    AppToast.show('success', summary, detail, life)
  },

  error(summary: string | Error, detail?: string, life = 3000) {
    let message = detail
    if (summary instanceof Error) {
      message = summary.message
    } else if (typeof summary === 'string') {
      message = summary
    }
    AppToast.show('error', 'Error', message, life)
  },

  info(summary: string, detail?: string, life = 3000) {
    AppToast.show('info', summary, detail, life)
  },

  warn(summary: string, detail?: string, life = 3000) {
    AppToast.show('warn', summary, detail, life)
  },
}
