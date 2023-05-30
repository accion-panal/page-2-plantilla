import { getPropertiesOnForm } from "../services/PropertiesServices.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "./getExchangeRate.js";
 

const onFormSubmit = (
    statusId,
    companyId,
    operationType,
    typeOfProperty,
    region,
    commune,
    min_price,
    max_price,
    bathrooms,
    bedrooms,
    covered_parking_lots
  ) => {
    return getPropertiesOnForm(
      statusId,
      companyId,
      operationType,
      typeOfProperty,
      region,
      commune,
      min_price,
      max_price,
      bathrooms,
      bedrooms,
      covered_parking_lots 
    );
  };

  let query = {
    page:1,
    limit:10,
    realtorId: 0,
    statusId:1,
    companyId:1,
    operationType : "",
    typeOfProperty: "",
    region : "",
    commune: "",
    min_price: "",
    max_price: "",
    bathrooms: "",
    bedrooms: "",
    covered_parking_lots: "",
  }

  let aux = new URLSearchParams(window.location.search);

  for (let p of aux) {
    query[`${p[0]}`] = p[1];
  }



  
document.getElementById('operationType').addEventListener('change',(element) =>{
    console.log(element.target.value)
    query.operationType = element.target.value;
    // const _operationType = operationType.length > 0 ? operationType : false;
    // return element.target.value;
    
 })
 document.getElementById('typeOfProperty').addEventListener('change' ,(element) => {
    query.typeOfProperty =  element.target.value;
    // return element.target.value;
})
document.getElementById("region").addEventListener( "change", (element) => {
 query.region = element.target.value;  
 console.log(element.target.value)
      // return element.target.value;
})
document.getElementById("commune").addEventListener( "change", (element) => {
    query.commune =  element.target.value;
    console.log(element.target.value)
  
    // return element.target.value;

  })

 document.getElementById("min_price").addEventListener( "change", (element) => {
    // return element.target.value;
     query.min_price = element.target.value;
})
  
 document.getElementById("max_price").addEventListener( "change", (element) => {
    query.max_price= element.target.value;
})
  
 document.getElementById("bathrooms").addEventListener( "change", (element) => {
    query.bathrooms= element.target.value; 
})
document.getElementById("bedrooms").addEventListener( "change", (element) => { 
     query.bedrooms =  element.target.value;
  
  })
  
// document.getElementById("surface_m2").addEventListener( "change", (element) => {
//      query.surface_m2= element.target.value;
  
//   })

document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
    query.covered_parking_lots = element.target.value;  
})


document.getElementById("buscar")?.addEventListener("click", async () => {
	window.open(
		window.location.origin +
			`/properties.html?page=${query.page}&limit=${query.limit}&realtorId=${query.realtorId}&statusId=${query.statusId}&companyId=${query.companyId}&operationType=${query.operationType}&typeOfProperty=${query.typeOfProperty}&region=${query.region}&commune=${query.commune}&min_price=${query.min_price}&max_price=${query.max_price}&covered_parking_lots=${query.covered_parking_lots}&bathrooms=${query.bathrooms}&bedrooms=${query.bedrooms}`
	);
});




 document.getElementById('buscar2')?.addEventListener('click', async() => {
  console.log('buscando');
  document.getElementById(
		"buscar2"
	).innerHTML = `    	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>`;
	// let  response  = await getProperties(0,1,1);
  // const data = response.data;
  let filtred = await onFormSubmit(
    1,
    1,
    query?.operationType,
    query?.typeOfProperty,
    query?.region,
    query?.commune,
    query?.min_price,
    query?.max_price,
    query?.bathrooms,
    query?.bedrooms,
    query?.covered_parking_lots
    )    

  
  const response2= await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor


  const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
  console.log(filtred);
	document.getElementById("totalItems").innerHTML = `<div>${filtred.meta.totalItems} Propiedades encontradas
	</div>`;
	setTimeout(() => {
		document.getElementById("buscar2").innerHTML = `Buscar`;
		window.scroll({
			top: 500,
			behavior: "smooth",
		});
   

  document.getElementById("container-propiedad-list").innerHTML = filtred.data.map((data) => 
        `<div class="col-sm-4 property">
        <div class="property-item-card rounded ">
            <div class="position-relative">
                <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                    ><img
                        class="img-fluid img-card-property"
                        src="assets/img/properties/property-1.jpg"
                        alt=""
                /></a>
                <div
                    class="bg-dark rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3"
                >
                ${data.operation} / ${data.types}
                </div>
            </div>
            <div class="item-info">
                <div class="p-4 pb-0 card-props">
                    <a
                        class="d-block h5 mb-4 text-uppercase text-center textLimitClass"
                        href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                        >${data.title}</a
                    >
                </div>
                <div class="p-4 pb-0 card-props">
                    <p class="text-center">
                        <i class="bi bi-pin-map"></i> ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra Región"}, Chile
                    </p>
                </div>
                <div class="">
                  <p class="text-center">
                    COD: ${data.id}
                  </p>
                </div>
                <div class="d-flex">
                    <h4 class="flex-fill text-center py-1">
                        <b>UF ${clpToUf(data.price,ufValueAsNumber)}</b>
                    </h4>
                    <h4 class="flex-fill text-center py-1">
                        <b>CLP  ${parseToCLPCurrency(data?.price)}</b>
                    </h4>
                </div>
                <div class="d-flex w-100 border-2 bg-light">
                    <span class="flex-fill text-center p-2">
                        <i class="bi bi-building"></i> ${data.surface_m2 != undefined && data.surface_m2 != null && data.surface_m2 != "" ? data.surface_m2 : "0"} m<sup>2</sup>
                    </span>
                    <span class="flex-fill text-center py-2">
                        <i class="fa-sharp fa-solid fa-bed"></i> ${data.bedrooms != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0"}
                    </span>
                    <span class="flex-fill text-center p-2">
                        <i class="fa-sharp fa-solid fa-toilet"></i> ${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0"}
                    </span>
                </div>
            </div>
        </div>
    </div>`).join("");

    document.getElementById('container-cards').innerHTML = filtred.data.map((data)=> `
    <div class="col-sm-12 col-lg-12 property">
      <div class="property-item-list rounded">
          <div class="row">
            <div class="col-lg-6">
              <div class="position-relative ">
                <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                ><img
                  class="img-fluid img-property"
                  src="assets/img/properties/property-1.jpg"
                  alt=""
              /></a>
              <div
                class="bg-dark rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3"
              >
              ${data.operation} / ${data.types}
              </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="item-info text-center">
                <div class=" mt-3 p-4 pb-0 card-props">
                  <a
                    class="d-block h4 mb-4 text-uppercase text-center"
                    href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                    >${data.title}</a
                  >
              
                </div>
                <div class=" p-4 pb-0">
                  <p class="text-center">
                    <i class="bi bi-pin-map"></i> ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra Región"}, Chile
                  </p>
                </div>
              
                <div class="">
                  <p class="text-center">
                    COD: ${data.id}
                  </p>
                </div>
                <div class="mt-5 d-flex">
                  <h4 class="flex-fill text-center py-1">
                    <b>UF ${clpToUf(data.price,ufValueAsNumber)}</b>
                  </h4>
                  <h4 class="flex-fill text-center py-1">
                    <b>CLP ${parseToCLPCurrency(data?.price)}
                    </b>
                  </h4>
                </div>
                <div class="mt-3 d-flex w-100 border-2 bg-light">
                  <span class="flex-fill text-center p-2">
                    <i class="bi bi-building"></i> ${data.surface_m2 != undefined && data.surface_m2 != null && data.surface_m2 != "" ? data.surface_m2 : "0"} m<sup>2</sup>
                  </span>
                  <span class="flex-fill text-center py-2">
                    <i class="fa-sharp fa-solid fa-bed"></i> ${data.bedrooms != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0"}
                  </span>
                  <span class="flex-fill text-center p-2">
                    <i class="fa-sharp fa-solid fa-toilet"></i> ${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0"}
                  </span>                 
                </div>
              </div>
            </div>
          </div>
    
      </div>
      
    </div>
    `)
	}, 3000);

  

    
   
  })
