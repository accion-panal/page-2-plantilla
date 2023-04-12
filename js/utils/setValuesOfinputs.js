import { getProperties } from "../services/PropertiesServices.js";
/* import { filtersSet } from "./getInputsApi.js"; */

const formatoMexico = (number) => {
	const exp = /(\d)(?=(\d{3})+(?!\d))/g;
	const rep = "$1.";
	return number.toString().replace(exp, rep);
};

let query = {
	page: 1,
	limit: 10,
	realtorId: 0,
	statusId: 1,
	companyId: 1,
	operationType: "venta",
	typeOfProperty: "",
	region: "",
	commune: "",
	min_price: 0,
	max_price: 10000000000000,
	covered_parking_lots: 1,
	bathrooms: 1,
	surface_m2: "",
	bedrooms: 1,
};

let aux = new URLSearchParams(window.location.search);

for (let p of aux) {
	query[`${p[0]}`] = p[1];
}

document.getElementById("typeOfProperty").value = query.typeOfProperty;
document.getElementById("bedrooms").value = query.bedrooms;
document.getElementById("commune").value = query.commune;
document.getElementById("region").value = query.region;
document.getElementById("bathrooms").value = query.bathrooms;
/* document.getElementById("surface_m2").value = query.surface_m2; */
document.getElementById("min_price").value = query.surface_m2;
document.getElementById("max_price").value = query.max_price;
/* document.getElementById("surface_m2").value = query.surface_m2; */
/* document.getElementById("uncovered_parking_lots").value =
	query.covered_parking_lots; */
document.getElementById("buscar2")?.addEventListener("click", async () => {
	document.getElementById(
		"buscar2"
	).innerHTML = `    	<div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

	let { data, meta } = await getProperties(...Object.values(query));
	console.log(data);

	document.getElementById(
		"totalItems"
	).innerHTML = `${meta.totalItems} Propiedades encontradas
  </div>`;

	setTimeout(() => {
		document.getElementById("buscar2").innerHTML = `Buscar`;
		window.scroll({
			top: 500,

			behavior: "smooth",
		});

		document.getElementById("container-cards").innerHTML = data
			.map(
				(data) => `
        <div class="col-sm-4 property">
                  <div class="property-item rounded overflow-hidden">
                    <div class="position-relative overflow-hidden">
                      <a href="detalle_propiedad.html?id=${
												data.id
											}" style="max-height: 400px; min-height: 400px"
                        ><img
                          class="img-fluid"
                          style="max-height: 200px; min-height: 200px"
                          src="${
														data.image != null
															? data.image
															: "./assets/img/properties/property-1.jpg"
													}"
                          alt=""
                      /></a>
                      <div
                        class="bg-dark rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3"
                      >
                        ${data.operation}
                      </div>
                    </div>
                    <div class="item-info">
                      <div class="p-4 pb-0 card-props">
                        <a
                          class="d-block h6 mb-2 text-uppercase text-center"
                          href="detalle_propiedad.html"
                          >${data.description}</a
                        >
                        <p class="text-center">
                          <i class="bi bi-pin-map"></i> ${data.address}
                        </p>
                      </div>
                      <div class="d-flex">
                        <small class="flex-fill text-center py-2"
                          >${data.currency.isoCode} ${formatoMexico(
					data.price
				)}</small
                        >
                        <small class="flex-fill text-center py-2"
                          >CLP 302.825.086</small
                        >
                      </div>
                      <div class="p-4 pb-0">
                        <div class="d-flex justify-content-between">
                          <h6><b>M² ${data.surface_m2 | 0}</b></h6>
                          <span><i class='bx bx-bed fs-4'></i> ${
														data.bedrooms | 0
													}</span>
                          <span><i class='bx bx-bath fs-4'></i> ${
														data.bathrooms | 0
													}</span>
                          <span><i class='bx bxs-car-garage fs-4'></i> ${
														data.covered_parking_lots | 0
													}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> `
			)
			.join("");
	}, 3000);
});

document.getElementById("buscar2").click();
