<script lang="ts">
    export let overall = false;
</script>

<div class="relative flex items-center rounded-full text-secondary">
    <input
            id="checkbox-all-search"
            type="checkbox"
            value=""
            class="peer w-5 h-5 relative z-10 rounded-md appearance-none cursor-pointer border-neutral-300 checked:bg-center border-2 checked:border-secondary checked:bg-secondary checked:bg-opacity-20">
    <label for="checkbox-all-search" class="sr-only">checkbox</label>
    {#if overall}
        <i class="fi fi-br-minus hidden absolute inset-0 items-center justify-center peer-checked:flex text-xs"></i>
    {:else}
        <i class="fi fi-br-check hidden absolute inset-0 items-center justify-center peer-checked:flex text-xs"></i>
    {/if}
</div>