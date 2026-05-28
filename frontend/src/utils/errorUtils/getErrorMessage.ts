import { MESSAGES } from "../messages";

export const getErrorMessage = (error: unknown, fallback = MESSAGES.ERROR.UNKNOWN): string => {
    if (!error) return fallback;
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    if (typeof error === 'object' && error !== null && 'message' in error) {
        return (error as { message: string }).message;
    }

    return fallback;
}; 