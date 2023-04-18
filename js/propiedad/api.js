import { getProperties } from "../services/PropertiesServices.js"

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";


export default async function apiCall() {
const response = await getProperties(0, 1, 1);
const data = response.data;

console.log(data)

const response2 = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response2?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));


document.getElementById("total-prop").innerHTML = `<div>${response.meta.totalItems} Propiedades encontradas
	</div>`

  document.getElementById('container-propiedad').innerHTML = data.map(data => 
      `` ).join('');

    document.getElementById('container-propiedad-list').innerHTML = data.map(data => `
  
    `).join('')
     


}

