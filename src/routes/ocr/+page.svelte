<script lang="ts">
  import Tesseract from "tesseract.js";
  import { DownloadURL, UploadTask } from "sveltefire";
  import OpenAI from "openai";
  import { API_KEY } from "$lib/api_key";
  import {
    setDoc,
    updateDoc,
    doc,
    addDoc,
    collection,
  } from "firebase/firestore";
  import { arrayUnion } from "firebase/firestore";
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { firebaseConfig } from "$lib/firebase";

  let file: any;
  let result: any;

  function chooseFile(e: any) {
    file = e.target.files[0];
  }

  async function performOCR(imageSrc: any) {
    console.log("Performing OCR" + imageSrc);
    if (imageSrc) {
      const {
        data: { text },
      } = await Tesseract.recognize(
        imageSrc,
        "eng"
        // { logger: info => console.log(info) }
      );
      console.log("Finished OCR");
      result = text;
      sendToChatGPT(result);
    }
  }
  async function sendToChatGPT(data: string) {
    try {
      const inputString =
        "I have these lecture notes: " +
        data +
        ". Ignore any nonsensical text or unclear text. Please give me a json of 10 questions regarding the material and subject matter that would help students learn. Order the questions in order of difficulty with the first being extremely easy and the last being challenging. There should also be corresponding lists of 4 answers of which only one is correct for each question. The correct answer should the first answer in each answers list. The format of the json is: {question1:'this is question 1?', answer1: ['this is answer choice 1 for question 1 (correct)', 'this is answer choice 2 for question 1', 'this is answer choice 3 for question 1', 'this is answer choice 4 for question 1'], question2:'this is question2', answer2 : ['this is answer choice 1 for question 2 (correct)', 'this is answer choice 2 for question 2', 'this is answer choice 3 for question 2', 'this is answer choice 4 for question 2']...}. Only return the json and nothing else";
      const openai = new OpenAI({
        apiKey: API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: inputString }],
        model: "gpt-4-1106-preview",
      });
      var ret_str = "";
      if (completion.choices[0].message.content != null) {
        ret_str = completion.choices[0].message.content;
      }
      const jsonString = JSON.stringify(
        { answer: `${JSON.stringify(ret_str, null, 2)}` },
        null,
        2
      );
      console.log(ret_str);
      sendToFirebase(ret_str);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }
  async function sendToFirebase(str: String) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const formattedStr = (str as string).substring(
      8,
      (str as string).length - 3
    );
    const tenQuestions = JSON.parse(formattedStr);
    for (var i = 1; i <= 10; i++) {
      const difficulty = 0.1 * i;
      const question = tenQuestions["question" + i];
      const answer = tenQuestions["answer" + i];
      const docRef = await addDoc(collection(db, "questions", String(i)), {
        question: question,
        answer1: answer[0],
        answer2: answer[1],
        answer3: answer[2],
        answer4: answer[3],
        correct: 1,
        difficulty: difficulty,
      });
    }
  }
</script>

<div
  class="flex flex-col items-center gap-4 justify-center h-[calc(100vh)] font-satoshi"
>
  <input
    type="file"
    on:change={chooseFile}
    class="file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-200 file:text-blue-700
        hover:file:bg-blue-300 border-2 border-blue-200 p-4 rounded-lg font-medium"
  />

  {#if file}
    <UploadTask ref="uploaded.jpg" data={file} let:progress let:snapshot>
      {#if snapshot?.state === "running"}
        {progress}% uploaded
      {/if}

      {#if snapshot?.state === "success"}
        <DownloadURL ref={snapshot?.ref} let:link>
            <div class="flex flex-row gap-2">
                <button on:click={() => performOCR(link)} class="bg-blue-500 px-8 py-3 rounded-md text-white font-bold min-w-[200px] text-center">Generate</button>
            </div>
        </DownloadURL>
      {/if}
    </UploadTask>
  {/if}

  {#if result}
    <p>{result}</p>
  {/if}
</div>
