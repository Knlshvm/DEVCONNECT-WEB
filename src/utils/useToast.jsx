import { useState, useCallback, useRef } from "react";

const ALERT_CLASS = {
  success: "alert-success",
  error: "alert-error",
};

const useToast = (duration = 3000) => {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback(
    (message, type = "success") => {
      clearTimeout(timerRef.current);
      setToast({ message, type });
      timerRef.current = setTimeout(() => setToast(null), duration);
    },
    [duration],
  );

  const ToastComponent = toast ? (
    <div className="toast toast-top toast-center z-[9999]">
      <div className={`alert ${ALERT_CLASS[toast.type] || "alert-info"}`}>
        <span>{toast.message}</span>
      </div>
    </div>
  ) : null;

  return { showToast, ToastComponent };
};

export default useToast;
