import { IToastMessage } from "@/types/toast-message";
import { ReactNode, createContext, useState } from "react";

type ItoastContext = {
  showToast: (toast: IToastMessage) => void;
  hideToast: (toastId: IToastMessage) => void;
  toastMessages: IToastMessage[];
}

export const ToastContext = createContext({} as ItoastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toastMessages, setToastMessages] = useState<IToastMessage[]>([]);

  const showToast = (newToast: IToastMessage) => {
    const newToastData = { ...newToast, id: new Date().getTime().toString() };
    setToastMessages((prevState) => [...prevState, newToastData])

    newToastData.timeout = setTimeout(function () {
      setToastMessages((prevState) => [...prevState.slice(1)]);
    }, 1000 * (newToastData.duration || 5));
  }

  const hideToast = (toastToHide: IToastMessage) => {
    setToastMessages((prevState) => [...prevState.filter(toast => toast.id !== toastToHide.id)]);
    clearTimeout(toastToHide.timeout);
  }
  return (
    <ToastContext.Provider value={{ showToast, toastMessages, hideToast }}>
      {children}
    </ToastContext.Provider>
  )
}