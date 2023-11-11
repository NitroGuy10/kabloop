<script lang="ts">
  import Tesseract from "tesseract.js";
  import { DownloadURL, UploadTask } from "sveltefire";

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

      result = text;
    }
  }
</script>

<input type="file" on:change={chooseFile} />

{#if file}
  <UploadTask ref="uploaded.jpg" data={file} let:progress let:snapshot>
    {#if snapshot?.state === "running"}
      {progress}% uploaded
    {/if}

    {#if snapshot?.state === "success"}
      <DownloadURL ref={snapshot?.ref} let:link>
        <a href={link} download>Link</a>
        <button on:click={() => performOCR(link)}>Perform OCR</button>
    </DownloadURL>
    {/if}
</UploadTask>
{/if}

{#if result}
  <p>{result}</p>
{/if}