 
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
    var color = ``;  
    var evento_producto = "agregar_productos("+ id_producto +")";

    if(stock_real <= 0 ){
    color = 'color: red;';  
    evento_producto = "alert('El producto seleccionado no cuenta con stock.')";
    }
    
    

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
    <button type="button" onclick="`+evento_producto+`"
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

//CARGAR DETALLE VENTA POS
function agregar_productos(){
//HTML
var tmp_id_tmp = 1, isc, tmp_precio_producto, precio_venta_to, total_descuento, precio_unitario, total_igv, valorventa, tmp_cantidad, tmp_id_producto , precio_total , tmp_select_und ;
var tmp_descuento,tmp_observacion, tmp_select_igv, tipo_changue ;
var tmp_nombre_producto = 'html producto';
var formato_html = ``;
if (1 == 1) {
  formato_html += `
  <table id="fn_table_load_detalle" class="table table-condensed reportes_tabla_principal" style="width: 100%; ">
  <tr id="tr_append_`+ tmp_id_tmp + `" class="reportes_tr_tabla_normal" style="border-left: 0px;">
  <td class="reportes_th_tabla_principal border_remove_mous_`+ tmp_id_tmp + ` nombre_producto_pos_movil" onclick="$('.contenedor_sub_tabla_view_` + tmp_id_tmp + `').toggle();remover_tr_borde(` + tmp_id_tmp + `);" style="text-align: left; padding-top: 0px; padding-bottom: 0px; width: 40% !important; border-bottom-width: 1px;">
  
  <input type="text" class="input_hidden_fercho d-none" id="tmp_valor_descuento_`+ tmp_id_tmp + `" value="0">
  <input type="text" class="input_hidden_fercho d-none" id="tmp_total_descuento_`+ tmp_id_tmp + `" value="0">
  <input type="text" class="input_hidden_fercho d-none" id="tmp_valor_unitario_`+ tmp_id_tmp + `" value="0">
  <input type="text" class="input_hidden_fercho d-none" id="tmp_subtotal_`+ tmp_id_tmp + `" value="0">
  <input type="text" class="input_hidden_fercho d-none" id="tmp_total_igv_`+ tmp_id_tmp + `" value="0">
  <input type="text" class="input_hidden_fercho d-none" id="tmp_total_isc_`+ tmp_id_tmp + `" value="0">
  
  <!--<input type="text" class="input_hidden_fercho d-none" readonly="readonly" id="observacion_`+ tmp_id_tmp + `">-->
  <input type="text" class="input_hidden_fercho d-none" readonly="readonly" id="precio_venta_`+ tmp_id_tmp + `" value="` + tmp_precio_producto + `">
  <input type="text" class="input_hidden_fercho d-none" readonly="readonly" id="valor_decimal_`+ tmp_id_tmp + `" value="` + precio_venta_to + `">
  <input type="text" class="input_hidden_fercho d-none" readonly="readonly" id="total_desc_`+ tmp_id_tmp + `" class="sum_descuento" value="` + total_descuento + `">
  
  <input type="text" class="input_hidden_fercho d-none" id="valor_base_lp_`+ tmp_id_tmp + `" value="` + precio_unitario + `">
  
  <input class="sum_subtotal" type="hidden" class="input_hidden_fercho d-none" readonly="readonly" id="valorv_total_`+ tmp_id_tmp + `" value="` + Number(valorventa).toFixed(2) + `">
  <input class="sum_isc" type="hidden" class="input_hidden_fercho d-none" readonly="readonly" id="isc_`+ tmp_id_tmp + `" value="` + Number(isc).toFixed(2) + `">
  <input class="sum_igv" type="hidden" class="input_hidden_fercho d-none" readonly="readonly" id="venta_igv_`+ tmp_id_tmp + `" value="` + Number(total_igv).toFixed(2) + `">
  
  <!--TMP NOMBRE PRODUCTO $codigo_producto-->
  <textarea readonly="readonly" id="tmp_nombre_producto_`+ tmp_id_tmp + `" style="display: none;">PLAN ANUAL ECOMMERCE</textarea>
  
  <span id="nombre_`+ tmp_id_tmp + `" style="font-weight: bold; font-size: 13px; cursor: pointer; display: inline-block;">` + tmp_nombre_producto + `</span>
  
  <!--<a id="btn_info_producto_`+ tmp_id_producto + `" href="javascript:void(0)" onclick="info_Producto(` + tmp_id_producto + `)"><i class="fa fa-info-circle" style="font-size: 15px; color: #ff5900;"></i></a>--><br>
  
  
  
  </td>
  <!--CONFIGURACION LISTA Y TIPO IGV-->
  <td class="reportes_th_tabla_principal configuraciones_pc border_remove_mous_`+ tmp_id_tmp + `" style="text-align: left; padding-top: 12px; display: none; width: 3% !important; border-bottom-width: 1px;">
  <a href="javascript:void(0)" style="width: 5%;" id="POS_configuracion_producto_`+ tmp_id_tmp + `" class=" clase_configuracion_movil" onclick="POS_configuracion_producto(` + tmp_id_producto + `, ` + tmp_id_tmp + `, 0);" title="Configurar Datos Producto"><i class="fa fa-cog" style="font-size: 14px; color: #666;"></i></a>  
  <a href="javascript:void(0)" id="POS_configuracion_producto_igv_`+ tmp_id_tmp + `" style="padding-top: 8px;" class=" clase_igv_movil" onclick="POS_configuracion_producto(` + tmp_id_producto + `, ` + tmp_id_tmp + `, 1);" title="Configurar Tipo Igv Producto"><i class="fa fa-info-circle" style="font-size: 14px; color: red;"></i></a>
  </td>
  
  <!--CANTIDADES-->
  <td class="reportes_th_tabla_principal reporte_number_movil border_remove_mous_`+ tmp_id_tmp + `" style="padding-top: 0px; padding-bottom: 0px; width: 25% !important; border-bottom-width: 1px;">
  <div class="number-input-group d-flex align-items-center">
  <span style="border:none !important; font-size: 20px; background: #fff;" class="input-number-decrement" id="input-number-decrement_`+ tmp_id_tmp + `" 
  onclick="input_number_decrement(`+ tmp_id_tmp + `)"> 
  <svg xmlns="http://www.w3.org/2000/svg" class="svg_resta" viewBox="0 0 24 24"><path  d="M7 11h10v2H7z"/><path   d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8s8 3.589 8 8s-3.589 8-8 8z"/></svg>

  </span><input id="cantidad_`+ tmp_id_tmp + `" class="input-number-custom" type="number" step="any" value="` + tmp_cantidad + `" min="1" style="border:none !important;" onkeyup="calcular_precios(`+ tmp_id_tmp + `, 1)" ><span class="input-number-increment" 
  style="border:none !important;font-size: 20px;  background: #fff;" id="input-number-increment_`+ tmp_id_tmp + `" onclick="input_number_increment(` + tmp_id_tmp + `)">
  <svg xmlns="http://www.w3.org/2000/svg" class="svg_suma" viewBox="0 0 24 24"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"/><path   d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8s8 3.589 8 8s-3.589 8-8 8z"/></svg>
   </span>
  </div>
  </td>
  
  <!--TOTAL POR PRODUCTO-->
  <td class="reportes_th_tabla_principal sum_total_td border_remove_mous_`+ tmp_id_tmp + `" style="padding: 0px 10px; width: 25% !important; border-bottom-width: 1px;">
  
  <table>
  <tr>
  <td style="width: 30% !important; font-size: 13px; text-align: right;" class="border_precio_td_etiqueta">S/</td>
  <td style="width: 70% !important;" class="border_precio_td"><input autocomplete="off" type="number" step="any" class="form-control input-sm sum_total" 
  style="border:0px; background: white; text-align:left; font-size: 14px; height: 30px; padding:0; padding-right: 3px; background: white; width: 95%;" 
  id="venta_valor_`+ tmp_id_tmp + `" value="` + Number(precio_total).toFixed(2) + `" onkeyup="calcular_precios(`+ tmp_id_tmp + `, 2)" ></td>
  </tr>
  </table>
  
  </td>
  
  <!--ELIMIANR EL PRODUCTO-->
  <td class="reportes_th_tabla_principal eliminar_pos_movil" style="width: 10%;padding-top: 0px; padding: 0px;">
  <button type="button" class="" title="Eliminar" onclick="deleteData([`+ tmp_id_tmp + `, 'tb_tmp']); cargar_por_cobrar(); enlistar_productos(1); " style="text-align: center; background: none;  border: none; color: #000;"><span class="pointer" style="font-size: 27px;">x</span></button>
  <span style="position:absolute; padding-top: 11px;">
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="pointer" viewBox="0 0 24 24" onclick="$('.contenedor_sub_tabla_view_`+ tmp_id_tmp + `').toggle(); remover_tr_borde(` + tmp_id_tmp + `);"><path fill="currentColor" d="m11.998 17l7-8h-14z"/></svg>

  
  </span>
  <input type="text" class="input_hidden_fercho d-none" id="activar_borde_tr_detalle_`+ tmp_id_tmp + `" value="1">
  </td>
  
  
  <!--NEW POS-->
  <td class="reportes_th_tabla_principal" style="width: 70px; display: none;">
  <select id="select_lista_precio_`+ tmp_id_tmp + `" style="font-size: 14px; height: 25px; padding: 0; text-align: left; background: none; color: #000; border: none; background-image: url(https://negsb-img-recursos.s3.amazonaws.com/flecha_select_naranja.png);" class="form-control input-sm control_frm css_flecha_naranja">
  <option value="0">Seleccione</option>
  
  </select>
  <div class="recargar_lista_precios_volumen_`+ tmp_id_tmp + `"></div>
  <div class="resultado_lista_precio_`+ tmp_id_tmp + `"></div>
  <div class="resultado_lista_precio_tmp_`+ tmp_id_tmp + `"></div>
  </td>
  
  </tr>
  
  <!--SUB_TABLA-->
  <tr id="tr_append_sub_tabla_`+ tmp_id_tmp + `" class="paddind_td_sub_tabla contenedor_sub_tabla_view_` + tmp_id_tmp + `" style="border-left: 0px; display: none;">
  <td colspan="4" style="padding:0px;border:0px;" class="paddind_table_sub_tabla td_css_movil_remove_padding">
  <table style="width: 100%;">
  <tr>
  <td style="width: 30%;" class="borde_sub_tabla">
  <label class="paddind_td_sub_tabla" style="font-size: 11px; font-weight: normal; margin: 0; color: #464646; text-align: left;">Unidad</label><br>
  
  
  
  
  <select class="unidad_derecha_movil paddind_td_sub_tabla" id="idequivalencia_`+ tmp_id_tmp + `" onchange="mandaprecio(`+ tmp_id_tmp +`);"
  style=" font-size: 14px; height: 25px; width: 90%; text-align: left; border: none; box-shadow: none; outline: none; color: #000;">
  `+ tmp_select_und + `
  </select>   
  </td>
      
  <!--CAMPO PRECIO-->
  <td style="width: 30%;" class="borde_sub_tabla">
  <label class="paddind_td_sub_tabla" style="font-size: 11px; font-weight: normal; margin: 0; color: #464646; text-align: left;">Precio Unitario</label><br>
  <!--PRECIO-->
  <span style="font-size: 13px; font-weight: normal; padding-left: 0.75rem;">S/</span><input type="number" step="any" class="precio_derecha_movil" 
  style="font-size: 14px; height: 25px; padding: 0; text-align: left; border: none;  box-shadow: none; outline: none; width: 50%; background: white; font-weight: normal; color: #000;"
  id="precio_valor_decimal_`+ tmp_id_tmp + `" value="` + Number(precio_unitario).toFixed(2) + `" onkeyup="precio_decimal(`+ tmp_id_tmp + `);   calcular_precios(`+ tmp_id_tmp + `, 1);   " >
  </td>
      
      
  <!--DESCUENTO-->
  <td style="width: 20%; border-right: 0px !important;" class="borde_sub_tabla">
      
  
  <label class="paddind_td_sub_tabla d-none" style="font-size: 11px; font-weight: normal; margin: 0; color: #464646; text-align: left;">Descuento</label><br>
  <input autocomplete="off" type="number" step="any" class="form-control paddind_td_sub_tabla input-sm monto_des d-none tb_desc_porcentaje_`+ tmp_id_tmp + ` campo_td_monto_desc" style="text-align:left; font-size: 14px; height: 30px;  border:none; " id="desc_` + tmp_id_tmp + `" value="` + tmp_descuento + `" placeholder="%" onkeyup="calcular_precios(`+ tmp_id_tmp + `, 1)">
  <input autocomplete="off" type="number" step="any" class="form-control paddind_td_sub_tabla input-sm monto_des d-none tb_desc_monto_`+ tmp_id_tmp + ` campo_td_monto_desc" style=" text-align:left; font-size: 14px; height: 30px; border:none; display: none;" id="desc_monto_` + tmp_id_tmp + `" placeholder="S/" onkeyup="descuento_monto(`+ tmp_id_tmp + `);">
  
      
  </td>
      
      
  <td style="width: 20%; border-left: 0px !important; text-align: center;" class="borde_sub_tabla">
  
  <span style="padding: 3px;background: #F0F0F0;padding-bottom: 7px;padding-top: 7px;top: 7px !important; position:relative;" class="d-none">
  <button onclick="
  $('.tb_desc_porcentaje_`+ tmp_id_tmp + `').css('display', 'none');
  $('.tb_desc_monto_`+ tmp_id_tmp + `').css('display', '');
  $('#desc_`+ tmp_id_tmp + `').val(''); 
  $('.vista_tipo_descuento_porcentaje_`+ tmp_id_tmp + `').css('background', '#F0F0F0').css('color', '#000');
  $('.vista_tipo_descuento_soles_`+ tmp_id_tmp + `').css('background', '#ff5900').css('color', 'white');
  $('#desc_monto_`+ tmp_id_tmp + `').val('');
  $('#desc_`+ tmp_id_tmp + `').keyup();
  " tabindex="-1" type="button" class="hint--bottom hint--negocia div_cambio_vista_producto_detalle vista_tipo_descuento_soles_`+ tmp_id_tmp + `" aria-label="Cambiar a Monto" style="width: 25%; height: 25px; display: inline-block; text-align: center; font-size: 13px; background: #F0F0F0; color: #000 !important; padding: 0; outline: none; margin-top: 0px; border: 0px solid #ff9c00; border-left: none; padding:0; border-bottom-right-radius: 3px; border-top-right-radius: 3px;">
  S/
  </button>
  <button onclick="
  $('.tb_desc_porcentaje_`+ tmp_id_tmp + `').css('display', '');
  $('.tb_desc_monto_`+ tmp_id_tmp + `').css('display', 'none');
  $('.vista_tipo_descuento_porcentaje_`+ tmp_id_tmp + `').css('background', '#ff5900').css('color', 'white');
  $('.vista_tipo_descuento_soles_`+ tmp_id_tmp + `').css('background', '#F0F0F0').css('color', '#000');
  $('#desc_`+ tmp_id_tmp + `').val('');
  $('#desc_monto_`+ tmp_id_tmp + `').val('');
  $('#desc_`+ tmp_id_tmp + `').keyup(); 
  " tabindex="-1" type="button" class="hint--bottom hint--negocia div_cambio_vista_producto_detalle  vista_tipo_descuento_porcentaje_`+ tmp_id_tmp + `" aria-label="Cambiar a Porcentaje" style="width: 25%; height: 25px; display: inline-block; text-align: center; font-size: 13px; background: #ff5900; color: white !important; padding: 0; outline: none; margin-top: 0px; border: 0px solid #ff9c00; border-right: none;padding: 0;border-top-left-radius: 3px; border-bottom-left-radius: 3px;">
  %
  </button>  
  </span>
  
  </td>
  
  </tr>
  <tr>
  
  <td colspan="4" style="padding:0px;">
  <table style="width: 100%;">    
  <tr>
  <td style="width: 70%;" class="borde_sub_tabla_mas_opciones">    
  
  <textarea type="text" class="form-control paddind_bottom_sub_td" id="observacion_`+ tmp_id_tmp + `" onkeyup="calcular_precios(`+ tmp_id_tmp + `, 1);" style="border: 0px; height: 25px; padding: 5px;" placeholder="Agregar nota...">`+ tmp_observacion + `</textarea>
  
  </td>
  <td style="width: 30%;" class="borde_sub_tabla_mas_opciones">    
  <select id="tipoigv_`+ tmp_id_tmp + `" class=" paddind_td_sub_tabla" onchange="calcular_precios(`+ tmp_id_tmp + `, 1);" style=" font-size: 14px; height: 25px; width: auto; text-align: left; border: none; box-shadow: none; outline: none; color: #000;">
  `+tmp_select_igv+`
  </select>
  </td>
  </tr>
  </table>
  </td> 
  
  </tr>
  
  <tr>
  
  
  
  </tr>
  
  </table>
  </td>
  </tr>
  
  </table>
  
  
  `;
  var scrip = '<'+'/'+'script>'; 
  if(tipo_changue == 1){
    formato_html += 
  `<script>
  $('#venta_valor_`+ tmp_id_tmp + `').keyup();`+
  scrip   
  ;
   
  }else{
    formato_html += 
  `<script> $('#cantidad_`+ tmp_id_tmp + `').keyup();`+scrip;
       
  }
      
  }
  $( "#div_load_tabla_detalle" ).html('');
$("#div_load_tabla_detalle" ).append(formato_html);
  
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
  


 