//Create the function with input
function generateMeme(img, topText, bottomText, topTextSize, bottomTextSize) {
   //get canvas element then use getcontext to access drawing context
    const canvas = document.getElementById('meme-canvas');
    const ctx = canvas.getContext('2d');
  
    // set canvas to image size
    canvas.width = img.width;
    canvas.height = img.height;

    // draw main image
    ctx.drawImage(img, 0, 0);
  
    // Set text color and alignment
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.textAlign = 'center';

    // erase the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // set top text font size
    let fontSize = canvas.width * topTextSize;
    ctx.font = `${fontSize}px Impact`;
    ctx.lineWidth = fontSize / 20;

  
    // add top text
    ctx.textBaseline = 'top';
    topText.split('\n').forEach((t, i) => {
      ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
      ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
    });
  
    // set bottom text font size
    fontSize = canvas.width * bottomTextSize;
    ctx.font = `${fontSize}px Impact`;
    ctx.lineWidth = fontSize / 20;
  
    // Draw bottom text
    ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach((t, i) => { // .reverse() because it's drawing the bottom text from the bottom up
      ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
      ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    });
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    // initialize variables to get text, text size, image and button for function
    const topTextInput = document.getElementById('top-text');
    const bottomTextInput = document.getElementById('bottom-text');
    const topTextSizeInput = document.getElementById('top-text-size-input');
    const bottomTextSizeInput = document.getElementById('bottom-text-size-input');
    const imageInput = document.getElementById('image-input');
    const generateBtn = document.getElementById('generate-btn');

    // set default meme text
    topTextInput.value = 'Top Text';
    bottomTextInput.value = 'Bottom Text';
  
    // add click listener for generate meme button
    generateBtn.addEventListener('click', () => {
      // use FileReader API to read image
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          generateMeme(img, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);
        };
      };
      reader.readAsDataURL(imageInput.files[0]);
    });
  });