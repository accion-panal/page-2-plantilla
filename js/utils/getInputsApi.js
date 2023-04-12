import { getSelects } from "../services/PropertiesServices.js";
import { getCommunes } from "../services/PropertiesServices.js";

export const filtersSet = async () => {
	let { data } = await getSelects();
	let aux = await getCommunes();

	document.getElementById("commune").innerHTML = aux.dat;
	document.getElementById("typeOperation").innerHTML = data.operationType
		.map((data, index) => {
			if (index == 0) {
				return `
            <option selected>Tipo de operacion</option>
            <option value="${data.value}">${data.name}</option>
          `;
			} else {
				return `
            <option value="${data.value}">${data.name}</option>
          `;
			}
		})
		.join("");

	document.getElementById("region").innerHTML = data.regions
		.map((data, index) => {
			if (index == 0) {
				return `
          <option selected>Region</option>
          <option value="${data.id}">${data.name}</option>
        `;
			} else {
				return `
          <option value="${data.id}">${data.name}</option>
        `;
			}
		})
		.join("");

	document.getElementById("typeOfProperty").innerHTML = data.typeOfProperty
		.map((data, index) => {
			if (index == 0) {
				return `
        <option selected>Tipo inmueble</option>
          <option value="${data.value}">${data.name}</option>
            `;
			} else {
				return `
          <option value="${data.value}">${data.name}</option>
            `;
			}
		})
		.join("");

	document.getElementById("region").addEventListener("change", async (data) => {
		let aux = await getCommunes(data.target.value);
		document.getElementById("commune").innerHTML = aux.data.map(
			(data) => `<option value="${data.id}">${data.name}</option>`
		);
	});

	document.getElementById("commune").innerHTML = aux.data.map(
		(data) => `<option value="${data.id}">${data.name}</option>`
	);
};

filtersSet();
