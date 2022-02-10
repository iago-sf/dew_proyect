<template>
    <div id="CreatePortfolio" class="w-full h-full bg-black bg-opacity-80 top-0 fixed sticky-0 hidden">
        <div class="2xl:container 2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
            <div class="w-96 md:w-auto dark:bg-black relative flex flex-col justify-center items-center border-2 border-red-600 bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36 rounded-md">
                <form @submit.prevent="createPortfolio">
                    <div>
                        <label id="name" class="text-sm font-medium leading-none text-red-600">
                            Portfolio name
                        </label>
                        <input aria-labelledby="name" type="text" class="i-login/register-input" v-model.trim="name"/>
                    </div>
                    <div class="mt-6 w-full">
                        <label id="description" class="text-sm font-medium leading-none text-red-600">
                            Description
                        </label>
                        <input aria-labelledby="description" type="text" class="i-login/register-input" v-model.trim="description" placeholder="Optional"/>
                    </div>
                    <div v-if="error" class="mt-6 w-full border-2 border-red-600 rounded p-2 bg-red-600/20">
                        <label for="pass" class="text-sm font-medium leading-none text-red-600">
                            {{ error }}
                        </label>
                    </div>
                    <div class="mt-8">
                        <button role="button" class="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 text-sm font-semibold leading-none text-white focus:outline-none bg-red-600 border rounded hover:bg-red-700 py-4 w-full">
                            Create portfolio
                        </button>
                    </div>
                </form>
                <button @click="modalToggle()" class="text-black dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" aria-label="close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
 
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { storeEmail } from '../../store/storeEmail';

const emit = defineEmits(['toggle']);
const modalToggle = () => {
    emit('toggle');
};

let name = ref();
let description = ref("");
let error = ref();

const mail = storeEmail();

const createPortfolio = async () => {
    console.log(mail.getEmail());
    const { data: user} = await axios.post('http://localhost:3001/user/login', { email: mail.getEmail()})
        .catch(err => console.log(err));
    console.log(user);
    const res = await axios.post('http://localhost:3001/portfolio', {
        name: name.value,
        description: description.value,
        ownerId: user.userId,
    })
    .catch(err => {
        console.log(err);
    });

    console.log(res);
};

</script>
 
<style>
</style>