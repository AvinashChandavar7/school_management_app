import { useEffect } from "react";
import clsx from "clsx";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icon = type === "SUCCESS" ? (
    <svg className="w-6 h-6 text-green-500 rounded-md bg-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-6 h-6 text-red-500 rounded-md bg-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="fixed z-50 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-md shadow-lg top-10 right-4 dark:bg-gray-800">
      <div className={clsx("flex items-center justify-start", {
        "text-green-500": type === "SUCCESS",
        "text-red-500": type === "ERROR",
      })}>
        {icon}
        <span className="ml-2 text-lg font-semibold">{message}</span>
      </div>
      <button onClick={onClose} className="absolute text-gray-500 top-2 right-2 hover:text-red-500 focus:outline-none">
        <svg className="w-6 h-6 p-1 rounded-md hover:bg-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default Toast;
