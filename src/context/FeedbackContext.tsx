import React, {
  createContext,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";

import AppToast
  from "../components/feedback/AppToast";

import AppConfirmModal
  from "../components/feedback/AppConfirmModal";

import {
  ConfirmOptions,
  FeedbackType,
  ToastOptions,
} from "../types/feedback";

interface FeedbackContextType {
  showToast:
    (options: ToastOptions) => void;

  showSuccess:
    (
      title: string,
      message?: string
    ) => void;

  showError:
    (
      title: string,
      message?: string
    ) => void;

  showWarning:
    (
      title: string,
      message?: string
    ) => void;

  showInfo:
    (
      title: string,
      message?: string
    ) => void;

  showConfirm:
    (
      options: ConfirmOptions
    ) => void;

  hideToast:
    () => void;

  hideConfirm:
    () => void;
}

const FeedbackContext =
  createContext<
    FeedbackContextType | undefined
  >(undefined);

interface Props {
  children: ReactNode;
}

interface ToastState {
  visible: boolean;
  type: FeedbackType;
  title: string;
  message?: string;
}

interface ConfirmState {
  visible: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  destructive: boolean;
  loading: boolean;
  onConfirm?: () =>
    void | Promise<void>;
}

export const FeedbackProvider = ({
  children,
}: Props) => {
  const [toast, setToast] =
    useState<ToastState>({
      visible: false,
      type: "info",
      title: "",
    });

  const [confirm, setConfirm] =
    useState<ConfirmState>({
      visible: false,
      title: "",
      message: "",
      confirmText:
        "Confirm",
      cancelText:
        "Cancel",
      destructive:
        false,
      loading:
        false,
    });

  const toastTimer =
    useRef<
      ReturnType<
        typeof setTimeout
      > | undefined
    >(undefined);

  const hideToast =
    useCallback(() => {
      if (
        toastTimer.current
      ) {
        clearTimeout(
          toastTimer.current
        );
      }

      setToast(prev => ({
        ...prev,
        visible: false,
      }));
    }, []);

  const showToast =
    useCallback(
      (
        options:
          ToastOptions
      ) => {
        if (
          toastTimer.current
        ) {
          clearTimeout(
            toastTimer.current
          );
        }

        setToast({
          visible: true,
          type:
            options.type,
          title:
            options.title,
          message:
            options.message,
        });

        toastTimer.current =
          setTimeout(
            () => {
              setToast(prev => ({
                ...prev,
                visible: false,
              }));
            },
            options.duration ??
              3500
          );
      },
      []
    );

  const showSuccess =
    useCallback(
      (
        title: string,
        message?: string
      ) => {
        showToast({
          type:
            "success",
          title,
          message,
        });
      },
      [showToast]
    );

  const showError =
    useCallback(
      (
        title: string,
        message?: string
      ) => {
        showToast({
          type:
            "error",
          title,
          message,
          duration:
            4500,
        });
      },
      [showToast]
    );

  const showWarning =
    useCallback(
      (
        title: string,
        message?: string
      ) => {
        showToast({
          type:
            "warning",
          title,
          message,
        });
      },
      [showToast]
    );

  const showInfo =
    useCallback(
      (
        title: string,
        message?: string
      ) => {
        showToast({
          type:
            "info",
          title,
          message,
        });
      },
      [showToast]
    );

  const showConfirm =
    useCallback(
      (
        options:
          ConfirmOptions
      ) => {
        setConfirm({
          visible:
            true,

          title:
            options.title,

          message:
            options.message,

          confirmText:
            options.confirmText ??
            "Confirm",

          cancelText:
            options.cancelText ??
            "Cancel",

          destructive:
            options.destructive ??
            false,

          loading:
            false,

          onConfirm:
            options.onConfirm,
        });
      },
      []
    );

  const hideConfirm =
    useCallback(() => {
      setConfirm(prev => ({
        ...prev,
        visible: false,
        loading: false,
      }));
    }, []);

  const handleConfirm =
    async () => {
      if (
        !confirm.onConfirm ||
        confirm.loading
      ) {
        return;
      }

      try {
        setConfirm(prev => ({
          ...prev,
          loading: true,
        }));

        await confirm.onConfirm();

        hideConfirm();
      } catch (error) {
        setConfirm(prev => ({
          ...prev,
          loading: false,
        }));

        throw error;
      }
    };

  return (
    <FeedbackContext.Provider
      value={{
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showConfirm,
        hideToast,
        hideConfirm,
      }}
    >
      {children}

      <AppToast
        visible={
          toast.visible
        }
        type={
          toast.type
        }
        title={
          toast.title
        }
        message={
          toast.message
        }
        onClose={
          hideToast
        }
      />

      <AppConfirmModal
        visible={
          confirm.visible
        }
        title={
          confirm.title
        }
        message={
          confirm.message
        }
        confirmText={
          confirm.confirmText
        }
        cancelText={
          confirm.cancelText
        }
        destructive={
          confirm.destructive
        }
        loading={
          confirm.loading
        }
        onCancel={
          hideConfirm
        }
        onConfirm={
          handleConfirm
        }
      />
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;