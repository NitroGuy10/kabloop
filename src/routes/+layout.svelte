
<script lang="ts">
    import { FirebaseApp } from 'sveltefire';
    import { firestore, auth, storage } from '$lib/firebase';
</script>

<svelte:head>
    <link href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap" rel="stylesheet">
</svelte:head>

<FirebaseApp {auth} {firestore} {storage}>
    <slot />
</FirebaseApp>
