<script>
  let question = "What is the capital of the United States?";
  const images = [
    'https://t3.ftcdn.net/jpg/00/60/46/76/240_F_60467600_edVkJvDs6Zl0HMo6x6IdZoO5Qv3WZQ64.jpg',
  ]
</script>

<div class="h-screen overflow-hidden">
  <div class="flex flex-col justify-center w-screen h-[60px] bg-gray-200">
    <p class="text-3xl text-center font-medium">
      {question}
    </p>
  </div>
  <div class="flex justify-center mt-12">
    <img src={images[0]} class="object-cover h-[400px] w-[800px] rounded-lg" alt="img" />
  </div>

  <div class="absolute bottom-16 w-screen px-8 grid grid-cols-2 grid-rows-2 gap-4">
    <div id="button1" class="bg-gray-200 p-4 rounded-md">Box 1</div>
    <div id="button2" class="bg-gray-200 p-4 rounded-md">Box 2</div>
    <div id="button3" class="bg-gray-200 p-4 rounded-md">Box 3</div>
    <div id="button4" class="bg-gray-200 p-4 rounded-md">Box 4</div>
  </div>
</div>