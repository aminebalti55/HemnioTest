<script lang="ts">
    import { faDollarSign, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
    import { Fa } from 'svelte-fa';
    import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
    import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
    import './PropertyCard.css'
    export let image = '';
    export let title = '';
    export let price = '';
    export let location = '';

    let isFavorited = false;

    function toggleFavorite() {
        isFavorited = !isFavorited;
    }
</script>

<div class="card border rounded shadow-sm overflow-hidden">
    <div class="relative">
        <img src={image} alt={title} class="w-full h-48 object-cover" />
        <button class="absolute top-2 right-2 bg-white rounded-full p-2" on:click={toggleFavorite}>
            <Fa icon={isFavorited ? solidHeart : outlineHeart} class="text-red-500 heart-icon" />
        </button>
    </div>
    <div class="p-4">
        <h3 class="font-bold text-xl mb-2">{title}</h3>
        <div class="flex items-center mb-2">
            <Fa style="color: #A53B1C;" icon={faDollarSign} class="mr-2" />
            <span style="color: #A53B1C;">{price}</span>
        </div>
        <div class="flex items-center">
            <Fa icon={faMapMarkerAlt} class="mr-2" />
            <span>{location}</span>
        </div>
    </div>
</div>

