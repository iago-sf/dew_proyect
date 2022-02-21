import { defineStore } from 'pinia';
import { ref } from 'vue';

export const storeApiUrl = defineStore('url', () => {
    const url = ref("https://dpl-proyect.herokuapp.com");
    
    const getUrl = () => url.value;

    return {
        getUrl
    };
});