'use client';

import { createContext, useContext, useState } from 'react';

const MedicineContext = createContext(undefined);

export function MedicineProvider({ children }) {
    const [medicineData, setMedicineData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState('en');

    return (
        <MedicineContext.Provider
            value={{
                medicineData,
                setMedicineData,
                isLoading,
                setIsLoading,
                language,
                setLanguage,
            }}
        >
            {children}
        </MedicineContext.Provider>
    );
}

export function useMedicine() {
    const context = useContext(MedicineContext);
    if (!context) {
        throw new Error('useMedicine must be used within a MedicineProvider');
    }
    return context;
}
