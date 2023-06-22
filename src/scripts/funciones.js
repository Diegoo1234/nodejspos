 
// Variable para almacenar la instancia de CancelToken
let cancelTokenSource = null;
let cancel_colaboradores  = null;
let cancel_series = null;

//LLAMAR DATOS CLIENTE
async function buscarCliente(buscador) {
   
  try {

// Cancela la petición anterior si existe
if (cancelTokenSource) {
  cancelTokenSource.cancel('Petición cancelada por una nueva');
}
// Crea una nueva instancia de CancelToken
cancelTokenSource = axios.CancelToken.source();
    
    const response = await axios.post('/buscarCliente', {nombre: buscador}, {
      cancelToken: cancelTokenSource.token
    });
  
    autocomplete_cliente(response.data);
    // Aquí puedes utilizar los datos del cliente para mostrarlos en tu interfaz
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Petición cancelada:', error.message);
    } else {
      console.error(error);
    }
    
  }
}

//CARGAR RESULTADOS BUSCADOR CLIENTE
function autocomplete_cliente(datos){

$('#load_result_clientes').html(``);

var formato_ul = ``;
if(datos.length > 0){
formato_ul += `<div class="content_result_css">`;
formato_ul += `<ul>`;

datos.map(function(resultado) {
var cliente = ''; 
if(resultado.codigo_cliente != ''){
  cliente += 'Cod: '+resultado.codigo_cliente; 
}
if(resultado.dni != ''){
  cliente += '-'+resultado.dni; 
}
if(resultado.nombre_cliente != ''){
  cliente += '-'+resultado.nombre_cliente; 
}
 

formato_ul += `<li onclick="setinputvalue('`+resultado.id_cliente+`', '`+cliente+`', '1');">`+cliente+`</li>`;
});


formato_ul += `<li>Nuevo Cliente</li>`;
 

formato_ul += `</ul>`;
formato_ul += `</div>`;
 
 
$('#load_result_clientes').append(formato_ul);
}
}

//CARGAR RESULTADOS BUSCADOR VENDEDORES
async function opciones_colaboradores(){  

  try {
        // Cancela la petición anterior si existe
        if (cancel_colaboradores) {
       cancel_colaboradores.cancel('Petición cancelada por una nueva');
        }
        // Crea una nueva instancia de CancelToken
        cancel_colaboradores = axios.CancelToken.source();

        const result = await axios.post('/buscarcolaboradores', {nombre: 1}, {
          cancelToken: cancel_colaboradores.token
        });
        
        const resultado_colaborador = result.data;

        if(resultado_colaborador.length > 0){
        var option = ``;
        resultado_colaborador.map(function(row) {
        option += `<option value="`+row.id_cliente+`" >`+row.nombre_cliente+`</option>`;
        });
        $('#elvendedor').append(option);
        }

      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Petición cancelada:', error.message);
        } else {
          console.error(error);
        }
        
      }


}
  
//CARGAR SERIES
async function cargar_series(){
  $('#serie').html(``);
  var tipo_doc = document.getElementById('tpodoc').value;

  try {
    // Cancela la petición anterior si existe
    if (cancel_series) {
    cancel_series.cancel('Petición cancelada por una nueva');
    }
    // Crea una nueva instancia de CancelToken
    cancel_series = axios.CancelToken.source();

    const result_serie = await axios.post('/buscarseries', {tipo: tipo_doc} , {
      cancelToken: cancel_series.token
    });
   
    const array_serie = result_serie.data;
    console.log(array_serie);
    var option = ``;
    option += `<option value="0" >Seleccione</option>`;
    if(array_serie.length > 0){
   
    array_serie.map(function(row_serie) {
    option += `<option value="`+row_serie.id+`" >`+row_serie.numero+`</option>`;
    });
   
    }
    $('#serie').append(option);

  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Petición cancelada:', error.message);
    } else {
      console.error(error);
    }
    
  }

} 


//INSERTAR VALOR EN INPUT
function setinputvalue(id, texto, tipo){

  var input = document.getElementById('id_cliente');
  input.value = id; 
  var input_text = document.getElementById('b');
  input_text.value = texto; 
  $('#load_result_clientes').html(``);
}

//EJECUTAR BUSCADOR CLIENTE
$('#b').on('keyup', function(e){
  const buscador = document.getElementById('b').value;
  
  if(buscador != '' && buscador != 0){
  buscarCliente(buscador); 
  }else{
  $('#load_result_clientes').html(``);
  }
  
});
  


 