import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/errorUtils/getErrorMessage";

export const useErrorToast = (error: unknown) => {
    const previousError = useRef<unknown>(null);

    useEffect(() => {
        if (error && error !== previousError.current) {
            toast.error(getErrorMessage(error));
            previousError.current = error;
        }
    }, [error]);
};