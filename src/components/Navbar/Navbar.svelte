<script lang="ts">
  import { writable } from 'svelte/store';
  import Hero from './../../components/HeroSection/Hero.svelte';
  export let tabs = [
    { name: 'Home'},
    { name: 'About' },
    { name: 'Service' },
    { name: 'Contact' },
    { name: 'Property' }
  ];
  const activeTab = writable(tabs[0]);
</script>

<nav class="flex items-center justify-between p-4 font-poppins">
  <div>
    <img src="/hemnio-01.png" alt="Logo" class="object-contain h-24 w-25 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 xl:h-40 xl:w-40" />
  </div>
  
  <div class="flex justify-center space-x-6 sm:space-x-12 ml-12 sm:ml-24">
    {#each tabs as tab (tab.name)}
      <a href="#" class="hover:text-blue-500 transition duration-300 ease-in-out text-lg sm:text-xl font-semibold" class:selected={$activeTab.name === tab.name} on:click={() => activeTab.set(tab)}>
        {tab.name}
      </a>
    {/each}
  </div>
  
  <div class="flex space-x-2 sm:space-x-4">
    <button class="btn btn-outline border-primary text-primary hover:bg-secondary hover:text-base-100 text-sm sm:text-base">Sign Up</button>
    <button class="btn btn-primary text-sm sm:text-base">Login</button>
  </div>
</nav>

<Hero/> 

<style>
  .selected {
    position: relative;
    top: -1px;
    color: #A53B1C;
  }

  .selected::after {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    background-color: #A53B1C;
    margin-top: 4px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
