import type { DialogServiceMethods, DialogServiceRef } from "primevue/dialogservice";

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

export const AppDialog = {
  open(component: any, options: Record<string, any> = {}): DialogServiceRef | null {
    const dialog = getDialog();
    if (!dialog) return null;

    const dialogRef = dialog.open(component, {
      props: {
        header: options.header || '提示',
        modal: true,
        ...options.props,
      },
    });

    return dialogRef; // dialogRef 包含 hide() 方法
  },

  close(dialogRef: DialogServiceRef | null) {
    if (!dialogRef) return;
    if (typeof dialogRef.hide === 'function') {
      dialogRef.hide(); // 使用 hide() 关闭
    } else {
      console.warn('[dialog] dialogRef does not have hide() method.');
    }
  }
};
