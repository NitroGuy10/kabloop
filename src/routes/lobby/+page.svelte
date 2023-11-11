<script lang="ts">
  import { page } from '$app/stores';

  $: outerWidth = 0
	$: innerWidth = 0
	$: outerHeight = 0
	$: innerHeight = 0
  import { docStore } from 'sveltefire';
  import { firestore } from "$lib/firebase";
  import { doc, getDoc, setDoc } from 'firebase/firestore';

  const gameStore = docStore(firestore, 'game/game');
  
  let timeLeft = 20;

  let selectedIndex = 0;

  function shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  let questions = ["", "", "", ""];
  let correctIndex = 0;
  $: {
    questions = shuffle([$gameStore?.answer1, $gameStore?.answer2, $gameStore?.answer3, $gameStore?.answer4]);
    correctIndex = questions.indexOf($gameStore?.answer1);
  }

  function decrementCount() {
      timeLeft--;
      if (timeLeft === 0)
      {
          clearInterval(interval);
      }

      if ($gameStore && teacher)
      {
        const gameRef = doc(firestore, "game/game");
        let asdf = $gameStore;
        if (timeLeft === 0)
        {
          asdf.state = "reveal";
        }
        else
        {
          asdf.state = "playing";
        }
        setDoc(gameRef, asdf);
      }
  }

  let interval = setInterval(decrementCount, 1000);

  const images = [
    'https://images.pexels.com/photos/1172018/pexels-photo-1172018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1988270/pexels-photo-1988270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/355188/pexels-photo-355188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/356966/pexels-photo-356966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/248082/pexels-photo-248082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/4386150/pexels-photo-4386150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/192738/pexels-photo-192738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3839557/pexels-photo-3839557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/302100/pexels-photo-302100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1028904/pexels-photo-1028904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ]

  let randomNum = Math.floor(Math.random() * images.length);

  const searchParams = $page.url.searchParams;
  const teacher = searchParams.get('teacher');

  const questionStore = docStore(firestore, 'questions/1');


  async function asdfasdf()
  {
    const gameRef = doc(firestore, "game/game");
    let asdf = $gameStore;
    asdf.answer1 = $questionStore.answer1;
    asdf.answer2 = $questionStore.answer2;
    asdf.answer3 = $questionStore.answer3;
    asdf.answer4 = $questionStore.answer4;
    asdf.question = $questionStore.question;
    setDoc(gameRef, asdf);
  }
  $: {
    if (teacher && $questionStore)
    {
      asdfasdf()
    }
    
  }
</script>

<!-- <svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight /> -->

<div class="h-screen font-satoshi {$gameStore?.state === "reveal" ? "bg-green-100" : ""}">
  {#if teacher}
    <div class="flex flex-col justify-center w-screen h-[60px] bg-gray-200">
      <p class="text-3xl text-center font-extrabold">
        {$gameStore?.question}
      </p>
    </div>
    <p class="font-bold text-4xl text-center">{timeLeft}</p>
    <div class="flex justify-center mt-12">
      <img src={images[randomNum]} class="object-cover h-[400px] w-[800px] rounded-lg" alt="img" />
    </div>

    <div class="mt-16 w-screen px-8 grid grid-cols-2 grid-rows-2 gap-4 font-bold">
      <div id="button1" class="bg-red-200 p-4 rounded-md   border-black {correctIndex === 0 && $gameStore?.state === "reveal" ? " border-4 " : ""}">{questions[0]}</div>
      <div id="button2" class="bg-blue-200 p-4 rounded-md   border-black {correctIndex === 1 && $gameStore?.state === "reveal" ? " border-4 " : ""}">{questions[1]}</div>
      <div id="button3" class="bg-green-200 p-4 rounded-md  border-black {correctIndex === 2 && $gameStore?.state === "reveal" ? " border-4 " : ""}">{questions[2]}</div>
      <div id="button4" class="bg-yellow-200 p-4 rounded-md border-black {correctIndex === 3 && $gameStore?.state === "reveal" ? " border-4 " : ""}">{questions[3]}</div>
    </div>
    <div class="flex justify-center gap-4 mt-12 font-bold">
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
      <img src={images[randomNum]} class="object-cover h-[200px] w-1/2 rounded-lg" alt="img" />
    </div>


    <div class="flex flex-col gap-4 mx-4 font-bold">
      <button id="button1" on:click={() => {selectedIndex = 0;}} class="bg-red-200 p-4 rounded-md text-center border-black {selectedIndex === 0 ? "border-4" : ""}">Option 1</button>
      <button id="button2" on:click={() => {selectedIndex = 1;}} class="bg-blue-200 p-4 rounded-md text-center border-black   {selectedIndex === 1 ? "border-4" : ""}">Option 2</button>
      <button id="button3" on:click={() => {selectedIndex = 2;}} class="bg-green-200 p-4 rounded-md text-center border-black  {selectedIndex === 2 ? "border-4" : ""}">Option 3</button>
      <button id="button4" on:click={() => {selectedIndex = 3;}} class="bg-yellow-200 p-4 rounded-md text-center border-black  {selectedIndex === 3 ? "border-4" : ""}">Option 4</button>
    </div>
  {/if}

</div>
