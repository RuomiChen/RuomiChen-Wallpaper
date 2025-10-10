<template>
  <div class="grid md:grid-cols-4 w-full gap-8 text-center">
    <!-- Fast Download -->
    <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000' }"
      class="flex flex-col bg-purple-500 text-white border-purple-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
      <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
        <i class="pi pi-wifi !text-2xl"></i>
      </div>
      <span class="text-2xl font-bold">Lightning-Fast Downloads</span>
      <span class="">Get your favorite wallpapers instantly with zero buffering for a seamless experience.</span>
    </div>

    <!-- Unlimited Storage -->
    <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-1000' }"
      class="flex flex-col bg-teal-500 text-white border-teal-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
      <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
        <i class="pi pi-database !text-2xl"></i>
      </div>
      <span class="text-2xl font-bold">Unlimited Collection</span>
      <span class="">Upload, save, and organize your favorite wallpapers without any storage limits. Access them anytime, anywhere.</span>
    </div>

    <!-- Massive Library -->
    <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000' }"
      class="flex flex-col bg-indigo-500 text-white border-indigo-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
      <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
        <i class="pi pi-images !text-2xl"></i>
      </div>
      <span class="text-2xl font-bold">Massive Wallpaper Library</span>
      <span class="">Discover thousands of high-quality wallpapers across all categories to perfectly match your style.</span>
    </div>

    <!-- Community Sharing -->
    <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-1000' }"
      class="flex flex-col bg-orange-500 text-white border-orange-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
      <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
        <i class="pi pi-users !text-2xl"></i>
      </div>
      <span class="text-2xl font-bold">Community Sharing</span>
      <span class="">Share your creations, explore trending wallpapers, and join a vibrant community of wallpaper enthusiasts.</span>
    </div>
  </div>
</template>
