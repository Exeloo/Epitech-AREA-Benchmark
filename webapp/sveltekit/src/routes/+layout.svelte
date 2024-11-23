<script lang="ts">
    import { page } from '$app/stores';

    import '../app.css';
</script>

<div class="w-screen flex justify-center mt-40">
    <div class="flex flex-col justify-center items-center w-96 gap-5">
        <h2 class="font-semibold text-3xl">{$page.url.pathname !== "/signup" ? "Login in to you account" : "Create an account"}</h2>
        <p class="text-neutral-600 font-medium">{$page.url.pathname !== "/signup" ? "Welcome back! Please enter your details." : "The adventure begins here"}</p>
        <div class="relative w-full flex justify-center items-center bg-gray-100 rounded-xl outline outline-1 outline-neutral-200 font-semibold">
            <div
                    class="absolute left-0 bg-white rounded-xl transition-all duration-300 outline outline-1 outline-neutral-300"
                    style="height: 100%; width: 50%; transform: translateX({$page.url.pathname === '/login' ? '100%' : '0%'})"
            ></div>
            <a href="/signup"
                    class="relative z-10 text-center py-2 rounded-full transition-all duration-300 w-full"
                    class:text-gray-500={$page.url.pathname !== "/signup"}
            >
                Sign up
            </a>
            <a href="/login"
                    class="relative w-full z-10 text-center py-2 rounded-full transition-all duration-300"
                    class:text-gray-500={$page.url.pathname !== "/login"}
            >
                Log in
            </a>
        </div>
        <slot/>
    </div>
</div>
