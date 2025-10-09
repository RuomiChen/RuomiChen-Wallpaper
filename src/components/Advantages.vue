<template>
    <div class="grid md:grid-cols-4 w-full gap-8">
        <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000' }"
            class="flex flex-col bg-purple-500 text-white border-purple-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
            <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                <i class="pi pi-wifi !text-2xl"></i>
            </div>
            <span class="text-2xl font-bold">Bandwidth</span>
            <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        </div>
        <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-1000' }"
            class="flex flex-col bg-teal-500 text-white border-teal-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
            <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                <i class="pi pi-database !text-2xl"></i>
            </div>
            <span class="text-2xl font-bold">Storage</span>
            <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        </div>
        <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000' }"
            class="flex flex-col bg-indigo-500 text-white border-indigo-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
            <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                <i class="pi pi-arrows-v !text-2xl"></i>
            </div>
            <span class="text-2xl font-bold">Requests</span>
            <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        </div>
    </div>
</template>