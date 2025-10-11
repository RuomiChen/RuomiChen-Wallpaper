import type { DialogServiceMethods } from "primevue/dialogservice";

let dialogInstance: DialogServiceMethods | null = null;

/**
 * 注册 Dialog 实例
 */
export function setDialogInstance(instance: DialogServiceMethods) {
  dialogInstance = instance;
}

/**
 * 获取全局 Dialog 实例
 */
function getDialog(): DialogServiceMethods | null {
  if (!dialogInstance) {
    console.warn("[dialog] Dialog instance not registered yet.");
    return null;
  }
  return dialogInstance;
}

/**
 * 定义一个兼容类型，代表 dialog.open() 的返回引用
 */
type DialogRefLike = {
  close: () => void;
  [key: string]: any;
};

let dialogRef: DialogRefLike | null = null;

export const AppDialog = {
  /**
   * 打开对话框
   */
  open(component: any, options: Record<string, any> = {}): DialogRefLike | null {
    const dialog = getDialog();
    if (!dialog) return null;

    const ref = dialog.open(component, {
      ...options,
      props: {
        header: options.header || "提示",
        modal:true,
        ...options.props,
      },
    }) as DialogRefLike;

    dialogRef = ref;
    return ref;
  },

  /**
   * 关闭对话框
   */
  close() {
    if (dialogRef && typeof dialogRef.close === "function") {
      dialogRef.close();
      dialogRef = null;
    } else {
      console.warn("[dialog] No active dialog to close.");
    }
  },
};
