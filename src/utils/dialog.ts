import type { DialogServiceMethods } from "primevue/dialogservice";

let dialogInstance: DialogServiceMethods | null = null;

export function setDialogInstance(instance: DialogServiceMethods) {
  dialogInstance = instance;
}

function getDialog() {
  if (!dialogInstance) {
    console.warn('[dialog] Dialog instance not registered yet.');
    return null;
  }
  return dialogInstance;
}

// 全局对话框工具
export const AppDialog = {
  /**
   * 打开一个通用对话框
   * @param component 要展示的组件
   * @param options Dialog 配置项
   */
  open(component: any, options: Record<string, any> = {}) {
    const dialog = getDialog();
    if (!dialog) return;
    dialog.open(component, {
      props: {
        header: options.header || '提示',
        modal: true,
        ...options.props,
      },
    });
  },
};
