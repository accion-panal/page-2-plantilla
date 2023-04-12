let query = {
	page: 1,
	limit: 10,
	realtorId: 0,
	statusId: 1,
	companyId:1,
	operationType: "venta",
	typeOfProperty: "casa",
	region: "",
	commune: "",
	min_price: 0,
	max_price: 10000000000000,
	covered_parking_lots: 1,
	bathrooms: 1,
	surface_m2: "",
	bedrooms: 1,
};

document
	.getElementById("typeOfProperty")
	.addEventListener("change", (element) => {
		query.typeOfProperty = element.target.value;
	});

document
	.getElementById("typeOperation")
	.addEventListener("change", (element) => {
		query.typeOperation = element.target.value;
	});

document.getElementById("region").addEventListener("change", (element) => {
	query.region = element.target.value;
});

document.getElementById("commune").addEventListener("change", (element) => {
	query.commune = element.target.value;
});

document.getElementById("min_price").addEventListener("change", (element) => {
	query.min_price = element.target.value;
});

document.getElementById("max_price").addEventListener("change", (element) => {
	query.max_price = element.target.value;
});

document.getElementById("bathrooms").addEventListener("change", (element) => {
	query.bathrooms = element.target.value;
});

/* document.getElementById("surface_m2").addEventListener("change", (element) => {
	query.surface_m2 = element.target.value;
}); */

/* document
	.getElementById("uncovered_parking_lots")
	.addEventListener("change", (element) => {
		query.uncovered_parking_lots = element.target.value;
	}); */

document.getElementById("buscar")?.addEventListener("click", async () => {
	window.open(
		window.location.origin +
			`/properties.html?page=${query.page}&limit=${query.limit}&realtorId=${query.realtorId}&statusId=${query.statusId}&companyId=${query.companyId}&operationType=${query.operationType}&typeOfProperty=${query.typeOfProperty}&region=${query.region}&commune=${query.commune}&min_price=${query.min_price}&max_price=${query.max_price}&covered_parking_lots=${query.covered_parking_lots}&bathrooms=${query.bathrooms}&surface_m2=${query.surface_m2}&bedrooms=${query.bedrooms}`
	);
});
