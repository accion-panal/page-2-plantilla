import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

import { PropertyData, limitDataApi } from "../Data/userId.js";
import paginationCall from "../utils/pagination.js";
/* import apiCallMap from "../propiedad/apiMapProp.js"; */

export default async function renderCall() {

   
    //* INICIALIZACION DE VARIABLES
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let response;

    //* Rescatar datos del globalResponse
    //! si hay informacion, entra al if, de lo contrario al else
    let storedGlobalResponse = localStorage.getItem('globalResponse');
    if (storedGlobalResponse) {
        response = JSON.parse(storedGlobalResponse);
        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        /* localStorage.setItem('countPage', JSON.stringify(1)); */
    } 
    else {
        //* el segundo digito es el limit
        response = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro, 1, companyId, realtorId);
        //* Guardar el response en el localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response));

        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        console.log('max-page: ',maxPage);
        localStorage.setItem('countPage', JSON.stringify(1));
        paginationCall();
    }

    //! console log para saber el contenido del response despues del if
    console.log('response in render.js',response)

    //* Guardamos el data del response en una variable data 
    let data = response.data;
    console.log('data in render.js',data)

    //* Cositas para el uf
    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor;
    const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

    //todo: Filtros Extras
    const filtroSelect = document.getElementById('FilterPrice');
    filtroSelect.addEventListener('change', handleFilterChange);
    function handleFilterChange() {
        console.log('=========== handleFilterChange ===========')
        //* Se rescata el value del select
        const selectedValue = filtroSelect.value;
        console.log(selectedValue);
        console.log(data);
        console.log(response);
      
        if (selectedValue === 'MayorMenor') {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => b.price - a.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        } else {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => a.price - b.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        }
        console.log('dataOrdenadaResponse: ',response);
        //* Se llama al showItems para actualizar las cards
        showItems();
    }

    data = data.map(item => {
		// Reemplazar "\" por "//" en la propiedad "image"
		item.image = item.image.replace(/\\/g, "//");
		return item;
	});

    //todo: LLamamos a la funcion que muestra las cards
    showItems();

    //todo: innerHTML de las propiedades encontradas
    document.getElementById("total-prop").innerHTML = `<span>${response.meta.totalItems} Propiedades encontradas</span>`;

    //todo: creacion de la funcion ShowItems
    function showItems() {
        //* si container-propiedad es distinto de Null, hara un innerHTML
        //! esto es para evitar errores
        let containerGrid = document.getElementById('container-propiedad');
        if (containerGrid !== null) {
            document.getElementById("container-propiedad").innerHTML = data.map(data =>`
            <div class="col-sm-4 property-item">
            <div class="property-item-card rounded ">
                <div class="position-relative">
                    <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                        ><img
                            class="img-fluid img-card-property"
                            src=${data.image}
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
        </div>
             
            `).join("");   
        };

        //* si container-propiedad-list es distinto de Null, hara un innerHTML
        //! esto es para evitar errores
        let containerList = document.getElementById('container-propiedad-list');
        if (containerList !== null) {
            document.getElementById("container-propiedad-list").innerHTML = data.map(data =>`
            <div class="col-sm-12 col-lg-12 property-item">
        <div class="property-item-list rounded">
      <div class="row">
        <div class="col-lg-6">
          <div class="position-relative ">
            <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
            ><img
              class="img-fluid img-property"
              src=${data.image}
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
            `).join("");
        };

      /*   let containerMap = document.getElementById('div-map-section');
        if (containerMap !== null) {
            apiCallMap()
        }; */
    };
}
