import { getProperties } from "../js/services/PropertiesServices.js";

export default async function apiCall() {
	let { data } = await getProperties();

	document.getElementById("container-cards").innerHTML = data
		.map(
			(data) =>
				`<div class="col-sm-4 property">
    <div class="property-item rounded overflow-hidden">
      <div class="position-relative overflow-hidden">
        <a href="property-details.html"
          ><img
            class="img-fluid"
            src="assets/img/properties/property-1.jpg"
            alt=""
        /></a>
        <div
          class="bg-dark rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3"
        >
          Venta
        </div>
      </div>
      <div class="item-info">
        <div class="p-4 pb-0 card-props">
          <a
            class="d-block h4 mb-4 text-uppercase text-center"
            href=""
            >Lujosa Oficina en Venta La Dehesa</a
          >
          <p class="text-center">
            <i class="bi bi-pin-map"></i> Lo Barnechea, LO BARNECHEA
          </p>
        </div>
        <div class="d-flex">
          <h4 class="flex-fill text-center py-2">
            <b>UF 8.843</b>
          </h4>
          <h4 class="flex-fill text-center py-2">
            <b>CLP 302.825.086</b>
          </h4>
        </div>
        <div class="d-flex w-100 border-2 bg-light">
          <span class="flex-fill text-center p-2">
            <i class="bi bi-building"></i> 100 m<sup>2</sup>
          </span>
          <span class="flex-fill text-center py-2">
            <i class="fa-sharp fa-solid fa-bed"></i> 5
          </span>
          <span class="flex-fill text-center p-2">
            <i class="fa-sharp fa-solid fa-toilet"></i> 4
          </span>
        </div>
      </div>
    </div>
  </div>`
		)
		.join("");
}
