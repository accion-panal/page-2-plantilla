import { getProperties } from "../services/PropertiesServices.js"


export default async function apiDestCall() {
    let {data} = await getProperties(0,1,1);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );
  
          document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
          ``
          ).join('');
}