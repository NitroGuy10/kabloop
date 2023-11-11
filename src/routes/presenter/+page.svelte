
<script lang="ts">
    import { docStore } from 'sveltefire';
    import { firestore } from "$lib/firebase";

    const asdf = docStore(firestore, 'game/game');
    
    let timeLeft = 10;

    function decrementCount() {
        timeLeft--;
        if (timeLeft === 0)
        {
            clearInterval(interval);
        }
    }

    let interval = setInterval(decrementCount, 1000);
</script>

<div>
    <p>{timeLeft}</p>
    <p>{$asdf?.question}</p>
    <p>{$asdf?.answer1}</p>
    <p>{$asdf?.answer2}</p>
    <p>{$asdf?.answer3}</p>
    <p>{$asdf?.answer4}</p>
</div>
