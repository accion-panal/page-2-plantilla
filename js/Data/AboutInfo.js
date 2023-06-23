import { AboutInformation } from "./userId.js";

const loadInformation = () => {
/* Parrafos del head de quienes somos*/
let Text1 = document.getElementById('Text1');
if (Text1 !==null){
    Text1.innerHTML = `
    ${AboutInformation.text1}
    `;
}

let Text2 = document.getElementById('Text2');
if (Text2 !==null){
    Text2.innerHTML = `
     ${AboutInformation.text2}
    `;
}

let Text3 = document.getElementById('Text3');
if (Text3 !==null){
    Text3.innerHTML = `
    ${AboutInformation.text3}
    `;
}


let Text4 = document.getElementById('Text4');
if (Text4 !==null){
    Text4.innerHTML = `
    ${AboutInformation.text4}
    `;
}

let Text5 = document.getElementById('Text5');
if (Text5 !==null){
    Text5.innerHTML = `
     ${AboutInformation.text5}
    `;
}

let Text6 = document.getElementById('Text6');
if (Text6 !==null){
    Text6.innerHTML = `
    ${AboutInformation.text6}
    `;
}

let Image = document.getElementById('image');
if (Image !==null){
    Image.innerHTML = `
    <div
    class="card-bg"
    style="
    background-image: url('${AboutInformation.imageHead}');
    "
    ></div>
    `;
}


}

loadInformation();