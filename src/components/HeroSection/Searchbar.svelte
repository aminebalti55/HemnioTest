<script>
  import { writable } from 'svelte/store';

  let selection = writable('');
  let price = '';
  let location = '';
  let propertyType = '';
  let sellingPoint = ''; 

  function search() {
    // Add your search functionality here
  }
</script>

<div class="w-100 h-10 relative flex flex-col mr-4">
  <div class="flex justify-start h-12 bg-gray-200 rounded-tl-3xl rounded-tr-3xl">
    <div class="mr-2 px-4 py-2 text-sm font-bold uppercase leading-none cursor-pointer bg-white rounded-tl-3xl rounded-tr-3xl" 
    class:bg-white={$selection === 'rent'}
    on:click={() => $selection = 'rent'}>Rent</div>
    <div class="mr-2 px-4 py-2 text-sm font-bold uppercase leading-none cursor-pointer bg-white rounded-tl-3xl rounded-tr-3xl" 
    class:bg-white={$selection === 'buy'}
    on:click={() => $selection = 'buy'}>Buy</div>
    <div class="mr-2 px-4 py-2 text-sm font-bold uppercase leading-none cursor-pointer bg-white rounded-tl-3xl rounded-tr-3xl" 
    class:bg-white={$selection === 'sell'}
    on:click={() => $selection = 'sell'}>Sell</div>
  </div>

  <div class="h-20 bg-white bg-opacity-80 shadow-lg rounded-bl-3xl rounded-br-3xl flex justify-between items-center p-4">
    {#if $selection !== 'sell'}
      <select bind:value={price} class="mr-2 px-4 py-2 text-sm font-medium text-black bg-white border-none rounded-3xl appearance-none">
        <option value="">Price range</option>
        <option value="100000">100,000 - 200,000</option>
        <option value="200000">200,000 - 300,000</option>
        <option value="300000">300,000 - 400,000</option>
      </select>

      <select bind:value={propertyType} class="mr-2 px-4 py-2 text-sm font-medium text-black bg-white border-none rounded-3xl appearance-none">
        <option value="">Property type</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="condo">Condo</option>
      </select>

      <select bind:value={location} class="mr-2 px-4 py-2 text-sm font-medium text-black bg-white border-none rounded-3xl appearance-none">
        <option value="">Location</option>
        <option value="stockholm">Stockholm</option>
        <option value="gothenburg">Gothenburg</option>
        <option value="malmo">Malmö</option>
      </select>
    {:else}
      <select bind:value={sellingPoint} class="mr-2 px-4 py-2 text-sm font-medium text-black bg-white border-none rounded-3xl appearance-none">
        <option value="">Selling point</option>
        <option value="renovated">Recently Renovated</option>
        <option value="location">Great Location</option>
        <option value="price">Priced to Sell</option>
      </select>
    {/if}

    <div class="w-10 h-10 bg-red-600 rounded-full flex justify-center items-center cursor-pointer" on:click={search}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  </div>
</div>
