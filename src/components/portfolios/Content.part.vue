<template>
    <div class="flex flex-col basis-9/12">
        <div class="flex flex-row text-center p-5">
            <div class="flex flex-col basis-10/12">
                <h3 class=" text-3xl">
                    {{ pName }}
                </h3>
                <span v-if="pDescription != ''" class="text-gray-600">
                    {{ pDescription }}
                </span>
            </div>
            <div class="flex flex-col basis-2/12">
                
            </div>
        </div>
        
        
        <Coins :coinsInfo="coinsInfo" />

    </div>
</template>
 
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { storeApiUrl } from '../../store/storeApiUrl';
import Coins from './Coins.part.vue';

const router = useRoute();
const pName = ref("");
const pDescription = ref("");
let coinsInfo = ref([]);

const url = storeApiUrl();

const dbSearch = async id => {
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
}

onMounted(async () => {
    await dbSearch(router.params.id);
});

onBeforeRouteUpdate(async (to, from) => { 
    if(to.params.id !== from.params.id ) {
        await dbSearch(to.params.id);
    }
});


</script>
 
<style>
</style>