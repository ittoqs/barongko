import { useState, useEffect } from 'react';

export function useSystemTime() {
    const [ubuntuTimeStr, setUbuntuTimeStr] = useState('');
    const [androidTimeStr, setAndroidTimeStr] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const updateSystemClocks = () => {
            const now = new Date();
            setCurrentTime(now);

            const daysShort = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
            const dayName = daysShort[now.getDay()];
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');

            setUbuntuTimeStr(`${dayName} ${hours}:${minutes}`);
            setAndroidTimeStr(`${hours}:${minutes}`);
        };

        updateSystemClocks();
        const intervalId = setInterval(updateSystemClocks, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return { ubuntuTimeStr, androidTimeStr, currentTime };
}
