export type FeedbackType =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface ToastOptions {
  type: FeedbackType;
  title: string;
  message?: string;
  duration?: number;
}

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onConfirm: () => void | Promise<void>;
}