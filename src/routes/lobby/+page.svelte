<script>
  import FaAngleRight from 'svelte-icons/fa/FaAngleRight.svelte'
  import FaAngleLeft from 'svelte-icons/fa/FaAngleLeft.svelte'

  $: outerWidth = 0
	$: innerWidth = 0
	$: outerHeight = 0
	$: innerHeight = 0
  let question = "What is the capital of the United States?";
  const images = [
    'https://t3.ftcdn.net/jpg/00/60/46/76/240_F_60467600_edVkJvDs6Zl0HMo6x6IdZoO5Qv3WZQ64.jpg',
  ]

  import { page } from '$app/stores';
  const searchParams = $page.url.searchParams;
  const teacher = searchParams.get('teacher');

</script>

<svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight />

<div class="h-screen overflow-hidden">
  {#if innerWidth > 1024}
    <div class="flex flex-col justify-center w-screen h-[60px] bg-gray-200">
      <p class="text-3xl text-center font-medium">
        {question}
      </p>
    </div>
    <div class="flex justify-center mt-12">
      <img src={images[0]} class="object-cover h-[400px] w-[800px] rounded-lg" alt="img" />
    </div>

    <div class="mt-16 w-screen px-8 grid grid-cols-2 grid-rows-2 gap-4">
      <div id="button1" class="bg-red-200 p-4 rounded-md">Box 1</div>
      <div id="button2" class="bg-blue-200 p-4 rounded-md">Box 2</div>
      <div id="button3" class="bg-green-200 p-4 rounded-md">Box 3</div>
      <div id="button4" class="bg-yellow-200 p-4 rounded-md">Box 4</div>
    </div>
    <div class="flex justify-center gap-4 mt-12">
      <button class="rounded-md px-4 py-2 border-gray-700 bg-slate-500 text-white">
        Next
      </button>
      <button class="rounded-md px-4 py-2 border-gray-700 bg-slate-500 text-white">
        Previous
      </button>
      <button class="rounded-md px-4 py-2 border-gray-700 bg-slate-500 text-white">
        Pause
      </button>
      <button class="rounded-md px-4 py-2 border-gray-700 bg-slate-500 text-white">
        Pause
      </button>
    </div>
  {:else}
    <div class="flex justify-center my-12">
      <img src={images[0]} class="object-cover h-[200px] w-1/2 rounded-lg" alt="img" />
    </div>
    <div class="flex flex-col gap-4 mx-4">
      <button id="button1" class="bg-red-200 p-4 rounded-md text-center">Option 1</button>
      <button id="button2" class="bg-blue-200 p-4 rounded-md text-center">Option 2</button>
      <button id="button3" class="bg-green-200 p-4 rounded-md text-center">Option 3</button>
      <button id="button4" class="bg-yellow-200 p-4 rounded-md text-center">Option 4</button>
    </div>
  {/if}

</div>
