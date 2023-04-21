import { getProperties } from "../services/PropertiesServices.js"


export default async function apiDestCall() {
    let {data} = await getProperties(0,1,1);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );
  
          document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
          `	
          <div class="position-relative overflow-hidden">
          <a href="property-details.html"
              ><img
                  class="img-fluid"
                  src="assets/img/properties/property-4.jpg"
                  alt=""
          /></a>
      </div>
      <div class="p-4 pb-0 card-props">
          <a class="d-block h6 mb-2 text-uppercase text-center" href=""
              >Lujosa Oficina en Venta La Dehesa</a
          >

          <div class="d-flex py-2">
              <small class="flex-fill text-center p-2"> UF 8.843</small>
              <small class="flex-fill text-center py-2">|</small>
              <small class="flex-fill text-center p-2">
                  CLP 302.825.086</small
              >
          </div>

          <p class="text-center">
              <i class="bi bi-pin-map"></i> Lo Barnechea, LO BARNECHEA
          </p>

          <div class="d-flex w-100 border-2">
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
          `
          ).join('');
}