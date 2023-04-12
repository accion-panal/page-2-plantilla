import { getPropertiesForId } from "../services/PropertiesServices.js";
import apiCallMap from "./map.js";
export default async function apiCallId() {
	let { data, meta } = await getPropertiesForId(
		window.location.search.split("=")[1]
	);

	console.log(data);

	const formatoMexico = (number) => {
		const exp = /(\d)(?=(\d{3})+(?!\d))/g;
		const rep = "$1.";
		return number.toString().replace(exp, rep);
	};

	document.getElementById(
		"address"
	).innerHTML = `<i class="bi bi-pin-map"></i>${data.address}`;

	/* 	document.getElementById("operation").innerHTML = `${data.operation}`; */

	document.getElementById("price").innerHTML = `
    <h3 class="flex-fill text-center border-end py-2"><b>${
			data.currency.name
		} ${formatoMexico(data.price)}</b></h3>
    <h3 class="flex-fill text-center border-end py-2"
      ><b>CLP ${formatoMexico(data.price * 35593)}</b></h3
    >
  `;

	document.getElementById("tableProperties").innerHTML = ` <thead>
  <tr>
    <th scope="col">Tipo de Propiedad</th>
    <th scope="col">${data.types.map((data) => data)}</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">M²</th>
    <td><b> ${data.surface_m2}</b></td>
  </tr>
  <tr>
    <th scope="row">Habitaciones</th>
    <td>
      <span><i class="bx bx-bed fs-4"></i> ${data.bedrooms | 0}</span>
    </td>
  </tr>
  <tr>
    <th scope="row">Baños</th>
    <td>
      <span><i class='bx bx-bath fs-4'></i> ${data.bathrooms | 0}</span>

    </td>
  </tr>
  <tr>
    <th scope="row">Estacionamiento(s)</th>
    <td>
      <span><i class='bx bxs-car-garage fs-4'></i> ${
				data.uncoveredParkingLots | 0
			}</span>

    </td>
  </tr>
</tbody>`;

	document.getElementById("description").innerHTML = `${data.description}`;

	document.getElementById(
		"realtor"
	).innerHTML = ` <h5 class="text-center text-white">${data.realtor.name} ${data.realtor.lastName}</h5>
  <div
    class="d-flex flex-column justify-content-center text-white"
  >
    <span
      class="d-flex align-items-center justify-content-center"
    >
      <i class="bi bi-envelope-open"></i>
      <small href="tel:+56912345678"
        >${data.realtor.mail}</small
      >
    </span>
    <span
      class="d-flex align-items-center justify-content-center"
    >
      <i class="bi bi-telephone"></i>
      <small href="tel:+56912345678">+56 9 12345678</small>
    </span>
  </div>`;

	apiCallMap(data);
}

apiCallId();
