<script>
  export let title = '';
  export let description = '';
  export let icon = '';
</script>

<div class="w-72 text-center p-4 bg-white shadow rounded-lg m-4">
  <div class="w-10 h-10 bg-orange-300 rounded-full mx-auto mb-4">
    {#if icon}
      <img src={icon} class="w-full h-full" />
    {/if}
  </div>
  <div class="text-xl font-semibold mb-2">{title}</div>
  <div class="text-gray-500">{description}</div>
</div>
