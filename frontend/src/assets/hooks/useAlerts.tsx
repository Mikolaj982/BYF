import React, { useCallback, useState } from 'react'

interface Alert {
    message: string | undefined,
    type: any,
}

const useAlerts = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const addAlert = useCallback((message: string | undefined, type = 'error') => {
        setAlerts(prevAlerts => [...prevAlerts, { message, type }]);
    }, []);

    const removeAlert = useCallback((index: number) => {
        setAlerts(prevAlerts => prevAlerts?.filter((_, i) => i !== index));
    }, []);

    return {
        alerts,
        addAlert,
        removeAlert
    };
}

export default useAlerts