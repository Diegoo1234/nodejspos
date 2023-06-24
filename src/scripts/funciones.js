 
// Variable para almacenar la instancia de CancelToken
let cancelTokenSource = null;
let cancel_colaboradores  = null;
let cancel_series = null;
let cancel_correlativo = null;
let cancelar_products = null;
var fn_id_empresa = 1;
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

        const result = await axios.post('/buscarcolaboradores',  {
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
  $('#num_factura').val('');
 
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
     
    var option = ``;
    option += `<option value="0" >Seleccione</option>`;
    if(array_serie.length > 0){
   
    array_serie.map(function(row_serie) {
    option += `<option value="`+row_serie.id+`" >`+row_serie.numero+`</option>`;
    });
   
    }
    $('#serie').append(option);

    cargar_correlativo();

  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Petición cancelada:', error.message);
    } else {
      console.error(error);
    }
    
  }

} 

//CARGAR CORRELATIVO
async function cargar_correlativo(){
  $('#num_factura').val('');

  var tipo_doc = document.getElementById('tpodoc').value;
  var serie = document.getElementById('serie').value;
  if(serie != 0){

    try {
      // Cancela la petición anterior si existe
      if (cancel_correlativo) {
        cancel_correlativo.cancel('Petición cancelada por una nueva');
      }
      // Crea una nueva instancia de CancelToken
      cancel_correlativo = axios.CancelToken.source();
  
      const result_num = await axios.post('/buscarcorrelativo', {tipo: tipo_doc, serie: serie} , {
        cancelToken: cancel_correlativo.token
      });
     
      const array_numero = result_num.data;
   
      if(array_numero.length > 0){  
       var correlativo =  parseInt(array_numero[0]['numero_factura']) + 1;
        $('#num_factura').val(correlativo);
      } else{
        $('#num_factura').val('');
      }
      
  
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Petición cancelada:', error.message);
      } else {
        console.error(error);
      }
      
    }

  }




} 

//CARGAR PRODUCTOS
async function cargar_productos(n_producto){


    try {
      // Cancela la petición anterior si existe
      if (cancelar_products) {
        cancelar_products.cancel('Petición cancelada por una nueva');
      }
      // Crea una nueva instancia de CancelToken
      cancelar_products = axios.CancelToken.source();
  
      const result_products = await axios.post('/buscarproducts', {empresa: 1, n_producto: n_producto} , {
        cancelToken: cancelar_products.token
      });
    
    load_productos(result_products.data);  

    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Petición cancelada:', error.message);
      } else {
        console.error(error);
      }
      
    }

} 

//FORMATO DE CARGA DE PRODUCTOS
function load_productos(array){
  const vista_products = document.getElementById('vista_products').value;  
  var formato_tabla = ``;  
  if( vista_products == 1){
    formato_tabla += `<div class="row formato_1">`;  
  }
  $('.outer_div').html('');
  if(array.length > 0){
    array.map(function(row) {
    var adicionales = ``;
    var codigo_producto = row.NOMBRE_PRODUCTO;
    var nombre_producto =  row.NOMBRE_PRODUCTO;
    var id_producto = row.ID_PRODUCTO;
    var precio_producto = row.PRECIO_PRODUCTO;
    //var n_familia_producto = row.CATEGORIA_PRODUCTO;
    var stock_real = row.INV_STOCK_ACTUAL;
    var marca = row.MARCA_PRODUCTO;
    var descripcion = row.DESCRIPCION_PRODUCTO;
    var n_ubicacion = row.N_UBICACION;
    if(marca){
    adicionales += `<span style="margin-left: 20px;">Marca: `+marca+`</span>`;
    }
    if(descripcion){
    adicionales += `<span class="descripcion_pos_producto" style="margin-left: 20px;">Descripci&oacute;n: `+descripcion+`</span>`;
    }
    if(n_ubicacion){
    adicionales += `<span class="ubicacion_pos_producto" style="margin-left: 20px;">Ubicaci&oacute;n: `+n_ubicacion+`</span>`;
    }
    var color = 0;
    var evento_producto = '';
    
    

    //FORMATO TABLA
    if(vista_products == 0 || vista_products == ''){
    formato_tabla += `
    <table title="`+ codigo_producto + ` - ` + nombre_producto + `" class="tabla_movil_producto" style="border: 0.5px solid #ff9c00; width: 98% !important; height: 40px !important; background: #fff; border: 2px solid #ccc;
    border-left: none; border-right: none; border-top:none; margin: 0 auto; margin-left: 10px; margin-top: 5px; margin-bottom: 5px; margin-right: 10px;  ">
    <tr>
    <td>
    <table style="width: 100%;">
    <tr style="background: #fff;">
    <td>
    <button type="button" 
    style="width: 99%; height: 60px; border: none; background: transparent;">
    <table style="width: 100%;">
    <tr>
    <td id="btn_focus_click_`+ id_producto + `" class="img-tabla tipo_2_css_img"
    style="width: 8%; height: 50px !important; cursor: pointer; border-radius: 0px !important;">
    <img src="views/images/null.png" width="auto" height="50px">
    </td>
    <td style="width: 2%; height: 40px !important;"></td>
    <td style="width: 80%; height: 40px !important; cursor: pointer; border-radius: 0px !important; background-color:transparent;">
    <table style="width: 100% !important; background: #fff; border-radius:5px; height: 40px !important;">
    <tr>
    <td style="font-size: 14px; font-weight: bold; text-align: left; height: 20px !important; ">
    `+ codigo_producto + ` - ` + nombre_producto + `</td>
    </tr>
    <tr>
    <td style="font-size: 13px; font-weight: normal; text-align: left; height: 20px !important;">
    <span class="precio_real">Precio: S/ `+ precio_producto + `</span>
    <span class="precio_costo_promedio" style="margin-left: 20px;">Precio Costo Promedio: S/ `+ precio_producto + `</span>
    <span class="stock_real" style="margin-left: 20px; `+ color + ` ">Stock Real: `+stock_real+`</span>
    `+adicionales+`
    
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </button>
    </td>
    <td class="img-tabla" style="width: 5%; height: 40px !important; text-align: right;">
    <a tabindex="-1" id="btn_info_producto_`+ id_producto + `" href="javascript:void(0)" onclick="POS_configuracion_producto(` + id_producto + `, 'negocia.pe')" style="margin-top: 2px; margin-right:15px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 1536 1536"><path fill="#ff5900" d="M1024 1248v-160q0-14-9-23t-23-9h-96V544q0-14-9-23t-23-9H544q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zM896 352V192q0-14-9-23t-23-9H672q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5T1153.5 1433T768 1536t-385.5-103T103 1153.5T0 768t103-385.5T382.5 103T768 0t385.5 103T1433 382.5T1536 768z"></path></svg>
    
    </a>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>  
    `;
    } else{
    //FORMATO CUADRICULA
    formato_tabla += `
    
    <div class="col-lg-3 col-md-4 col-sm-6 col-6 text-center col_vista1_hover"  >
    <table title="` + nombre_producto + `" class="tmano_tabla_tipo_1" >
    <tr>
    <td class="titulo_vista_1" >
    <div style="width: 100%;">
    <a id="btn_info_producto_` + id_producto + `" class="icono_vista_1" href="javascript:void(0)"  >
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 1536 1536"><path fill="#ff5900" d="M1024 1248v-160q0-14-9-23t-23-9h-96V544q0-14-9-23t-23-9H544q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zM896 352V192q0-14-9-23t-23-9H672q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5T1153.5 1433T768 1536t-385.5-103T103 1153.5T0 768t103-385.5T382.5 103T768 0t385.5 103T1433 382.5T1536 768z"/></svg>
    </a>
    </div>
    <div class="nombre_product_vista_1" >
    <span title="` + nombre_producto + `">` + nombre_producto + `</span> 
    </div>    
    </td>
    </tr>
    <tr>
    <td  class="img-tabla img_vista_1" style=" background-image: url('views/images/null.png');"></td>
    </tr>
    <tr>
    <td>
    <div class="precio_vista_1" >
    <span> S/ ` + precio_producto + `</span>
    </div>
    </td>
    </tr>
    </table>
    </div>
     
    `;

    }

    });

    if( vista_products == 1){
      formato_tabla += `</div>`;  
    }

    $('.outer_div').append(formato_tabla);
  }
}


//CAMBIAR VISTA PREVIA
function load_vista(){
  const vista_products = document.getElementById('vista_products').value;  
  if(vista_products == 0){
    document.getElementById('vista_products').value = '1';
  } else{
    document.getElementById('vista_products').value = '0';
  }
  const n_producto = document.getElementById('n_producto').value;
  cargar_productos(n_producto); 
}

//INSERTAR VALOR EN INPUT
function setinputvalue(id, texto, tipo){

  var input = document.getElementById('id_cliente');
  input.value = id; 
  var input_text = document.getElementById('b');
  input_text.value = texto; 
  $('#load_result_clientes').html(``);
}

//EJECUTAR BUSCADOR PRODUCTO
$('#n_producto').on('keyup', function(e){
  const n_producto = document.getElementById('n_producto').value;
  
  cargar_productos(n_producto); 
  
});

//EJECUTAR BUSCADOR CLIENTE
$('#b').on('keyup', function(e){
  const buscador = document.getElementById('b').value;
  
  if(buscador != '' && buscador != 0){
  buscarCliente(buscador); 
  }else{
  $('#load_result_clientes').html(``);
  }
  
});
  


 