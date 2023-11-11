
<script lang="ts">
    import { docStore } from 'sveltefire';
    import { firestore } from "$lib/firebase";

    const asdf = docStore(firestore, 'game/game');
</script>

<div>
    <p>{$asdf?.answer1}</p>
</div>
