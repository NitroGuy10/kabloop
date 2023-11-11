
<script lang="ts">
import Tesseract from 'tesseract.js';

let imageSrc = 'https://cdn.discordapp.com/attachments/1064320855217278998/1172961969289044018/IMG_0033.JPG?ex=656238f6&is=654fc3f6&hm=06eb0e9654c435b550e609cdcee7095deab186bfece352ebe62573e3d0d9dc9f&'; 
console.log("yessir")

async function performOCR() {
    if (imageSrc) {
        const { data: { text } } = await Tesseract.recognize(
            imageSrc,
            'eng',    
            { logger: info => console.log(info) } 
        );

        console.log('Recognized text:', text);
    }
}
performOCR()
</script>

<p>ocr time </p>