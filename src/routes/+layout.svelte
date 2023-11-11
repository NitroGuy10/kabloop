
<script lang="ts">
    import { FirebaseApp } from 'sveltefire';
    import { firestore, auth, storage } from '$lib/firebase';
</script>

<FirebaseApp {auth} {firestore} {storage}>
    <slot />
</FirebaseApp>
