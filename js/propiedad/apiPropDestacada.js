import { getProperties } from "../services/PropertiesServices.js"


import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";

export default async function apiDestCall() {
    let {data} = await getProperties(0,1,1);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );



const response2 = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response2?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
  
          document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
          `	
          <div class="col-sm-4 property">
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
														class="d-block h5 mb-4 text-uppercase text-center"
														href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
														>${data.title}</a
													>
												</div>
												<div class="p-4 pb-0 card-props">
													<p class="text-center">
														<i class="bi bi-pin-map"></i> ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra Región"}, Chile
													</p>
												</div>
												<div class="d-flex">
													<h4 class="flex-fill text-center py-2">
														<b>UF ${clpToUf(data.price,ufValueAsNumber)}</b>
													</h4>
													<h4 class="flex-fill text-center py-2">
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
          `
          ).join('');
}