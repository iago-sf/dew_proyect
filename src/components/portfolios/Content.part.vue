<template>
    <div class="flex flex-col basis-9/12 xl:basis-10/12">
        <div class="flex flex-row text-center p-5">
            <div class="flex flex-col basis-10/12 pl-[17.7%] align-middle xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm max-w-s">
                <h3 class=" text-3xl">
                    {{ pName }}
                </h3>
                <span v-if="pDescription != '' && !editing" class="text-gray-600 break-words">
                    {{ pDescription }}
                </span>
                <div v-if="editing" class="mt-6 w-full mb-2">
                    <input aria-labelledby="description" type="text" class="i-input" v-model.trim="description" :placeholder="pDescription" @focusout="updateDesc" maxlength="255"/>
                </div> 
            </div>
            <button @click="editPortfolio" class="flex flex-col basis-1/12 h-fit w-fit hover:scale-100 text-center mt-3 place-items-end">
                <i class="bi bi-pencil text-red-600 text-3xl"></i>
            </button>
            <button @click="deletePortfolio" class="flex flex-col basis-1/12 h-fit w-fit hover:scale-100 text-center mt-3">
                <i class="bi bi-trash text-red-600 text-3xl m-auto"></i>
            </button>
        </div>
        
        <div v-if="loading" class="flex items-center justify-center">
            <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-600" role="status">
            </div>
        </div>
        <Coins v-if="!loading && coinsInfo != ''" :coinsInfo="coinsInfo" @deleted="handleDeleted"/>
        <div v-if="!loading && coinsInfo == ''" class="text-gray-600">
            Go to <router-link to="/" class="hover:text-red-600 underline underline-offset-2">home</router-link> and add new cryptos to your portfolio
        </div>

    </div>
</template>
 
<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { storeApiUrl } from '../../store/storeApiUrl';

import Coins from './Coins.part.vue';

/*
 * Constants 
 */
const route = useRoute();
const router = useRouter();
const url = storeApiUrl();

/*
 * Properties 
 */
const pName = ref("");
const pDescription = ref("");
const coinsInfo = ref([]);
const editing = ref(false);
const description = ref();
const loading = ref(false);

/*
 * Functions 
 */
const dbSearch = async id => {
    loading.value = true;
    const { data } = await axios.get(`${url.getUrl()}/portfolio/${id}`)
        .catch(err => console.log(err));

    pName.value = data.name;
    pDescription.value = data.description;

    let tempCoins = ref([]);

    for (const e of data.Cryptos){
        const coin = await axios.get(`https://api.coingecko.com/api/v3/coins/${e.coin}?localization=false&tickers=true&market_data=false&community_data=false&developer_data=false`)
            .catch(err => console.log(err));
        
        coin.data.dbInfo = e;

        tempCoins.value.push(coin.data);
    };

    coinsInfo.value = tempCoins.value;
    loading.value = false;
}

const deletePortfolio = async () => {
    const { data } = await axios.delete(`${url.getUrl()}/portfolio/${route.params.id}`)
        .catch(err => console.log(err));
    
    router.push('/portfolios');
};

const editPortfolio = async () => {
    if(editing.value){
        editing.value = false;
    } else {
        editing.value = true;
    }
};

const handleDeleted = () => {
    dbSearch(route.params.id);
};

const updateDesc = async () => {
    if(pDescription.value != description.value){
        const { data } = await axios.put(`${url.getUrl()}/portfolio/${route.params.id}`, { description: description.value })
            .catch(err => console.log(err));

        await dbSearch(route.params.id);
    }

    editing.value = false;
};

/*
 * Hooks 
 */
onMounted(async () => {
    await dbSearch(route.params.id);
});

onBeforeRouteUpdate(async (to, from) => { 
    if(to.params.id !== from.params.id ) {
        await dbSearch(to.params.id);
    }
});
</script>