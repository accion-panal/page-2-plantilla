import { ContactInformation } from "./userId.js";

const loadInformation = () => {
    localStorage.removeItem('globalQuery');
    const dataHorario = ContactInformation.horario;
    console.log(dataHorario)

    /* LLENAR INFORMACION DE MISION */
    /* REGION: rescatar value por su id */
    let address = document.getElementById('address-ContactInfo');
    if (address !== null) {
        address.innerHTML = `
            ${ContactInformation.address}
            `;
    }

    let phone = document.getElementById('phone-ContactInfo');
    if (phone !== null) {
        phone.innerHTML = `
            ${ContactInformation.phone}
            `;
    }

    let email = document.getElementById('email-ContactInfo');
    if (email !== null) {
        email.innerHTML = `
            ${ContactInformation.email}
            `;
    }
   
}

loadInformation();