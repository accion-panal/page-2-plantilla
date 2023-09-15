import { getProperties } from "../services/PropertiesServices.js"

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";

import { PropertyData } from "../Data/userId.js";


export default async function apiDestCall() {
	const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
	let {data} = await getProperties(1, 10, CodigoUsuarioMaestro, 1, companyId, realtorId);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );
	console.log(filtrado);

	filtrado = filtrado.map(item => {
		// Reemplazar "\" por "//" en la propiedad "image"
		item.image = item.image.replace(/\\/g, "//");
		return item;
	});

	const response2 = await ExchangeRateServices.getExchangeRateUF();
	const ufValue = response2?.UFs[0]?.Valor
	const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
  
        document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
          `<li class="splide__slide">
          		<div class="col-lg-11 property">
						<div class="property-item-card rounded ">
								<div class="position-relative">
										<a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${companyId}" target="_blank">
										${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid img-card-property">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid img-card-property">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid img-card-property">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid img-card-property">`}
										</a>
									<div class="bg-dark rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3">
                        				${data.operation} / ${data.types}
									</div>
								</div>
								<div class="item-info">
									<div class="p-4 pb-0 card-props">
										<a class="d-block h5 mb-4 text-uppercase text-center" href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" target="_blank">${data?.title || "No cuenta con titulo"}</a>
									</div>
									<p class="text-center">Cod. Prop: ${data.id}</p>
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
			</li>
          `
          ).join('');

		  let splide = new Splide(".splide", {
            type: "loop",
            drag :"free",
            autoplay: "play",
            perPage: 3,
			breakpoints: {
				1399: {
				  perPage: 2,
				},
				991: {
				  perPage: 1,
				}
			  }
        });
        splide.mount();
}

document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	splide.mount();
});