import { defineStore } from 'pinia';
import { ref } from 'vue';

export const storeEmail = defineStore('mail', () => {
    const email = ref("");
    
    const getEmail = () => email.value;
    const setEmail = mail => {
        email.value = mail;
    }

    return {
        getEmail,
        setEmail
    };
});