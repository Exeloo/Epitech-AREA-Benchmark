<script lang="ts">
    export let valid: boolean = false;
    export let description: string;
</script>

<div class="flex gap-2 items-center w-full">
    <div class="peer w-5 h-5 relative z-10 rounded-full bg-neutral-300">
        <i class="fi fi-br-check absolute inset-0 items-center justify-center flex text-xs text-white"></i>
    </div>
    <p>
        {description}
    </p>
</div>