const body = document.querySelector("body");
const IMG_NUMBER = 5;


function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genNumber(){
    return number = Math.floor((Math.random()*IMG_NUMBER))+1;
}
function init(){
    const randomNumber = genNumber();
    paintImage(randomNumber);
}
init();