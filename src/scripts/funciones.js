// Variable para almacenar el token de cancelación
let cancelToken;

//LLAMAR DATOS CLIENTE
async function buscarCliente(nombre) {
  const dato_filtro = { nombre: nombre }
  try {
    const response = await axios.post('/buscarCliente', {
      dato_filtro
    });

    const datosCliente = response.data;
    console.log(response.data);
    prueba_alerta(response.data);
    // Aquí puedes utilizar los datos del cliente para mostrarlos en tu interfaz
  } catch (error) {
    console.error(error);
  }
}

//CARGAR RESULTADOS BUSCADOR CLIENTE
function prueba_alerta(datos){
// Obtener el elemento padre
var container = document.getElementById("load_result_clientes");  

var formato_ul = ``;

formato_ul += `<div class="content_result_css">`;
formato_ul += `<ul>`;
datos.map(function(resultado) {
formato_ul += `<li>`+resultado.nombre_cliente+`</li>`;
});
formato_ul += `<li> holiiii </li>`;
 

formato_ul += `</ul>`;
formato_ul += `</div>`;
 
 
$('#load_result_clientes').append(formato_ul);

}

//EJECUTAR BUSCADOR CLIENTE
$('#b').on('keyup', function(e){
  const buscador = document.getElementById('b').value;
  if(buscador != '' && buscador != 0){
    buscarCliente(buscador); 
  }
  
});
  