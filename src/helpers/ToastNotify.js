import { toast } from "react-toastify";

export const toastWarnNotify = (msg) => {
  toast.warn(msg, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: `bg-yellow-100 text-yellow-800 dark:bg-[#5e4c1f] dark:text-yellow-200 border-l-4 border-yellow-500`,
    bodyClassName: "text-sm",
    theme: "colored",
  });
};

export const toastSuccessNotify = (msg) => {
  toast.success(msg, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: `bg-green-100 text-green-800 dark:bg-[#1f3d2f] dark:text-green-200 border-l-4 border-green-500`,
    bodyClassName: "text-sm",
    theme: "colored",
  });
};

export const toastErrorNotify = (msg) => {
  toast.error(msg, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: `bg-white text-red-700 dark:bg-[#2f223c] dark:text-red-300 border-l-4 border-red-400`,
    bodyClassName: "text-sm",
    theme: "colored",
  });
};
