<script lang="ts">
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  import { Fa } from 'svelte-fa';
  import { faHome, faBuilding, faUmbrellaBeach, faCampground, faTree, faSwimmingPool, faWater, faTractor } from '@fortawesome/free-solid-svg-icons';
  import PropertyCard from './PropertyCard.svelte';

  type Icon = {
      name: string;
      color: string;
      icon: any;
  };

  let properties = [
      { image: '/1.jpg', title: 'Property 1', price: '1000', location: 'Location 1', category: 'House' },
      { image: '/2.jpg', title: 'Property 2', price: '2000', location: 'Location 2', category: 'Apartment' },
      { image: '/3.jpg', title: 'Property 3', price: '3000', location: 'Location 3', category: 'Cabins' },
      { image: '/4.jpg', title: 'Property 4', price: '4000', location: 'Location 4', category: 'Tree House' },
      { image: '/5.jpg', title: 'Property 5', price: '5000', location: 'Location 5', category: 'Pool House' },
      { image: '/6.jpg', title: 'Property 6', price: '6000', location: 'Location 6', category: 'Lakefront' },
  ];

  const icons = writable<Icon[]>([
      { name: 'House', color: '#565656', icon: faHome },
      { name: 'Apartment', color: '#565656', icon: faBuilding },
      { name: 'Beach House', color: '#565656', icon: faUmbrellaBeach },
      { name: 'Cabins', color: '#565656', icon: faCampground },
      { name: 'Tree House', color: '#565656', icon: faTree },
      { name: 'Pool House', color: '#565656', icon: faSwimmingPool },
      { name: 'Lakefront', color: '#565656', icon: faWater },
      { name: 'Farm House', color: '#565656', icon: faTractor },
  ]);

  let selectedCategory = '';

  function handleClick(icon: Icon, event: MouseEvent) {
      event.stopPropagation(); 
      selectedCategory = icon.name;
      icons.update(items => items.map(item => {
          if (item.name === icon.name) {
              return {...item, color: '#A53B1C'};
          } else {
              return {...item, color: '#565656'};
          }
      }));
  }

  onMount(() => {
      const deselectCategory = () => {
          selectedCategory = '';
          icons.update(items => items.map(item => ({...item, color: '#565656'})));
      };

      window.addEventListener('click', deselectCategory);

      return () => {
          window.removeEventListener('click', deselectCategory);
      };
  });
</script>

<div class="text-4xl font-semibold text-center my-10">
What we can Offer
</div>

<div class="flex justify-center">
<div class="flex space-x-6">
  {#each $icons as icon (icon.name)}
    <button type="button" class="flex flex-col items-center text-center cursor-pointer w-24" on:click={(event) => handleClick(icon, event)}>
      <Fa icon={icon.icon} class="text-2xl mb-2" style="color: {icon.color}" />
      <div class="text-sm font-medium">{icon.name}</div>
    </button>
  {/each}
</div>
</div>

<div class="flex justify-center flex-wrap mt-3"> 
{#each properties as property (property.title)}
  {#if !selectedCategory || property.category === selectedCategory}
    <PropertyCard 
        image={property.image} 
        title={property.title} 
        price={property.price} 
        location={property.location} 
    />
  {/if}
{/each}
</div>

<style>
.cursor-pointer:hover {
  opacity: 0.7;
}

button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
