import { getPropertiesForId } from "../services/PropertiesServices.js";
// import { clpToUf } from "../utils/getExchangeRate.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"

export default async function apiDetalleCall(id, realtorId, statusId, companyId){
  let {data} = await getPropertiesForId(id, realtorId, statusId, companyId );

  const response = await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response?.UFs[0]?.Valor
  const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

  let indicator;

  let realtorInfo = data.realtor;
  console.log(realtorInfo);

  let updatedImages = data.images.map(function (image) {
    return image.replace(/\\/g, "//");
  });


 //! Imagenes en splide */
 let img = '';
 updatedImages.forEach((image, index) => {
     img += `
         <li class="splide__slide ${index === 0 ? 'active' : ''}">
             <img src="${image || 'img/Sin.png'}" style="height: 600px; width: 100%;" />
         </li>
     `;
 });
 document.getElementById('carrucel-img').innerHTML = img;

 let splide = new Splide('.splide', {
     type: 'fade',
     padding: '5rem',
     rewind: true,
     autoplay: 'play',
 });

 splide.mount();


  console.log(id); // Imprimirá "134" si ese es el valor actual del parámetro "id"

  /* data.images.forEach((images, index) => {img +=
      ` <div class="carousel-item ${ index == 0 ? "active" : ""} ">
          <img src="${images != undefined && images != null && images != "" ? images : "assets/img/Sin.png"}" class="img-property-detail"/>
      </div> 	
      `
      indicator += `
      <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="${index}" ${index == 0 ? "class = active": ""} aria-current="true" aria-label="${index + 1}"></button>
      `
      }) */


  document.getElementById('title-ubicacion').innerHTML = 
  `<h1 class="text-start"><b>${data.title}</b></h1>
  <h5><i class="bi bi-pin-map"></i> ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra Región"}, Chile</h5>
  `

  /* document.getElementById('container-carrucel-imgProps').innerHTML = 
  ` <div class="section" style="padding-top:2rem; padding-bottom:2rem">
          <div class="container" >
            <div class="row">
              <div class="col">											
              <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
              ${indicator != undefined && indicator != null ? indicator : "no registra imagenes"}
              </div>
              <div class="carousel-inner">
              ${img}									
              </div>	
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
              </div>
              </div>
            </div>
          </div>
        </div>
  ` */

  document.getElementById('caract-prop').innerHTML = `
      <div class="w-100">
          <h2 class="w-100">Características</h2>
      </div>
    <tbody>
                    <tr>
                    <th scope="row">Código de propiedad</th>
                    <td>${data.id}</td>
                    </tr>
                    <tr>
                      <th scope="row">Operación</th>
                      <td>${data.operation}</td>
                    </tr>
                    <tr>
                      <th scope="row">Tipo de propiedad</th>
                      <td>${data.types}</td>
                    </tr>
              
                    <tr>
                      <th scope="row">M<sup>2</sup></th>
                      <td>${data.surface_m2}<sup>m2</sup></td>
                    </tr>
                    <tr>
                      <th scope="row">Habitaciones</th>
                      <td>${data.bedrooms != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Baños</th>
                      <td>${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Estacionamiento(s)</th>
                      <td>${data.coveredParkingLots != undefined && data.coveredParkingLots != null && data.coveredParkingLots != "" ? data.coveredParkingLots : "0"}</td>
                    </tr>
                  </tbody>
  `;



  document.getElementById('descrip-prop').innerHTML = `
  <h5 class="text-uppercase text-black-50">Descripción</h5>
  <p>
    ${data.description != "" && data.description != null && data.description != undefined ? data.description : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,ipsam."}
  </p>

  <p>
  ${data.description != "" && data.description != null && data.description != undefined ? data.description : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,ipsam."}
  </p>

  <ul>
    <li>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
      ipsam.
    </li>
    <li>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
      ipsam.
    </li>
    <li>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
      ipsam.
    </li>
  </ul>
  `;


  document.getElementById('price-uf').innerHTML  = `
  <div class="text-center">
  <h4 style="font-size:33px;"><b>UF  ${clpToUf(data.price,ufValueAsNumber)}</b>
  </h4>
  </div>
  <div class="text-center">
  <h6> CLP ${parseToCLPCurrency(data?.price)}
  </h6>
  </div>
  `;


  document.getElementById('contact-form-corredor').innerHTML = `<div class="d-flex justify-content-center">
  <img
    src="assets/img/Sin.png"
    class="rounded-circle w-50"
    alt="Cinque Terre"
  />
  </div>
  <div
  class="py-2 d-flex flex-column justify-content-center text-dark"
  >
  <h5 class="text-center">${realtorInfo.name != undefined && realtorInfo.name  != null && realtorInfo.name  != "" ? realtorInfo.name  : "no registra un nombre"} 
                          ${realtorInfo.lastname != undefined && realtorInfo.lastname  != null && realtorInfo.lastname  != "" ? realtorInfo.lastname  : "no registra un apellido"} </h5>
  <div class="d-flex flex-column justify-content-center">
    <span
      class="d-flex align-items-center justify-content-center"
    >
      <i class="bi bi-envelope-open ml-2"></i>
      <small href="tel:+56912345678"
        >${realtorInfo.mail != undefined && realtorInfo.mail  != null && realtorInfo.mail  != "" ? realtorInfo.mail  : "no registra un email"}</small
      >
    </span>
    <span
      class="d-flex align-items-center justify-content-center"
    >
      <i class="bi bi-telephone ml-2"></i>
      <small href="tel:+56912345678">${realtorInfo.phone != undefined && realtorInfo.phone != null && realtorInfo.phone != "" ? realtorInfo.phone : "no registra teléfono"}</small>
    </span>

    <div class="w-100 d-flex justify-content-center">
      <button type="button" class="btn btn-default">
        Contactar por whatsapp
      </button>
    </div>
  </div>
  </div>
  <hr />
  `

}