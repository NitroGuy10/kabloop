<script lang="ts">
  let variable = 1;
</script>

<p class="text-3xl">{variable}</p>
<button
  on:click={() => {
    variable++;
  }}>increment</button
>
