<template>
    <div v-if="coinsInfo[0]" class="flex flex-row justify-center border-b-2 py-5 mx-10 border-red-600">
        <div class="flex flex-col basis-[20%]">Icon</div>
        <div class="flex flex-col basis-[20%]">Crypto</div>
        <div class="flex flex-col basis-[20%]">Profit</div>
        <div class="flex flex-col basis-[20%]">Cuantity</div>
        <div class="flex flex-col basis-[20%]">Value</div>
    </div>

    <div v-for="coin in coinsInfo" :key="coin.market_cap_rank" class="flex flex-row border-b-2 border-gray-600 py-5 mx-10 justify-center">
        <div class="flex flex-col basis-[20%]"><img class="w-[32px] m-auto" :src="coin.image.small" /></div>
        <div class="flex flex-col basis-[20%]">{{ coin.name }}</div>
        <div v-if="profit(coin) >= 0" class="flex flex-col basis-[20%] text-green-600">${{ profit(coin).toFixed(2) }}</div>
        <div v-else class="flex flex-col basis-[20%] text-red-600">{{ profit(coin).toFixed(2) }}</div>
        <div class="flex flex-col basis-[20%]">{{ coin.dbInfo.cuantity }}</div>
        <div class="flex flex-col basis-[20%]">${{ (coin.tickers[0].last * coin.dbInfo.cuantity).toFixed(2) }}</div>
    </div>
</template>
 
<script setup>
import { computed } from 'vue';

defineProps({
    coinsInfo: {
        type: Array,
        required: true,    
    }
});

const profit = coin => (coin.tickers[0].last * coin.dbInfo.cuantity) - (coin.dbInfo.addedPrice * coin.dbInfo.cuantity);

</script>
 
<style>
</style>