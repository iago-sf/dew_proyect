<template>
    <div class="flex flex-row border-b-2 border-gray-600 py-5 mx-10 justify-center items-center">
        <div class="lg:w-[5%] w-[7.5%] text-center">{{ searchData.market_cap_rank }}</div>
        <div class="lg:w-[5%] w-[7.5%] text-center"><img class="m-auto" width="32" :src="searchData.image" /></div>
        <div class="lg:w-[5%] w-[7.5%] text-center">{{ searchData.symbol.toUpperCase() }}</div>
        <div class="lg:w-[20%] w-[30%] text-left pl-2">{{ searchData.name}}</div>
        <div class="lg:w-[12.5%] w-[15%] text-center">${{ searchData.current_price }}</div>
        <div v-if="searchData.price_change_24h > 0" class="lg:w-[12.5%] w-[15%] text-center text-green-600">${{ searchData.price_change_24h.toFixed(2) }}</div>
        <div v-else class="lg:w-[12.5%] w-[15%] text-center text-red-600"  >${{ searchData.price_change_24h.toFixed(2) }}</div>
        <div v-if="width >= 1024" class="w-[12.5%] text-center">${{ searchData.market_cap }}</div>
        <div v-if="width >= 1024" class="w-[12.5%] text-center">{{ searchData.max_supply }}</div>
        <div v-if="session.getLog()" class="lg:w-[15%] w-[17.5%] text-center">
            <button class="" @click="handleToggle({ cryptoId: searchData.id, cryptoName: searchData.name })">Add to porfolio</button>
        </div>
    </div>
</template>
 
<script setup>
import { storeLog } from '../../store/storeLog';

const session = storeLog();

defineProps({
    searchData: {
        type: Object,
        require: true,
    },
    width: {
        type: Number,
    }
});

const emit = defineEmits(['toggle']);
const handleToggle = (id) => {
    emit('toggle', id);
};

</script>