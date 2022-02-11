import { defineStore } from 'pinia';
import { ref } from 'vue';

export const storeApiUrl = defineStore('url', () => {
    const url = ref("http://localhost:3001");
    
    const getUrl = () => url.value;

    return {
        getUrl
    };
});