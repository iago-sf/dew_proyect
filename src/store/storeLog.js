import { defineStore } from 'pinia';
import { ref } from 'vue';

export const storeLog = defineStore('session', () => {
    const isLogged = ref(false);
    
    const getLog = () => isLogged.value;
    const setLog = logStatus => {
        isLogged.value = logStatus;
    }

    return {
        getLog,
        setLog
    };
});