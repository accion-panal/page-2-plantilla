import { RealtorSendEmailData } from "../Data/userId.JS";
const formEmailRealtor = document.getElementById("form-realtor");

formEmailRealtor.addEventListener('submit', function(e) {
    e.preventDefault();

let realtorMail = RealtorSendEmailData.detail;
let firstName = document.getElementById('nombre');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let subject = document.getElementById('subject');
let message = document.getElementById('message');   
 
if(firstName.value==='' || email.value==='' || phone.value==='' || subject.value==='' || message.value===''){
  return;
}

  fetch(`https://formsubmit.co/ajax/${realtorMail}`, {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
      Nombre: firstName.value,
      Correo: email.value,
      Telefono :phone.value,
      Sujeto: subject.value,
      Mensaje: message.value,
    })
  })
    .then(response => response.json())
    .then((data) => {
      console.log('SendEmail: ',data)
      console.log(data.success)
      console.log('mensaje enviado');
    })
    .catch(error => console.log('Error al enviar correo',error));
})