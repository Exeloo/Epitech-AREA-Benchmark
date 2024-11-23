<script>
    import Input from "$lib/Input.svelte";
    import Submit from "$lib/Submit.svelte";
    import Validation from "$lib/Validation.svelte";
</script>

<Input title="Username" placeholder="Enter your username" dataType="text" />
<Input title="Email" placeholder="Enter your email" dataType="email" />
<Input title="Password" placeholder="Create your password" dataType="password" />
<Validation description="Must be at least 8 characters"/>
<Validation description="Must contain one special character"/>
<Submit text="Get started"/>
<p>
    Already have an account?<a href="/login/" class="font-semibold pl-2">Log in</a>
</p>