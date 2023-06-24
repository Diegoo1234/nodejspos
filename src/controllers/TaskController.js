const notifier = require('node-notifier');
const axios = require('axios');

const EC2_DOMINIO = 'https://negocia.pe/';
const EC2_BUCKET_S3 = 'negslab';

//CURL POST OBTENER CLIENTE
function buscarcliente(req, res){
const nombre = req.body.nombre || null;  

axios.post('//negocialab.com:3000/apirest/registros/data_clientes', 
{ empresa: 1, offset: 1, per_page: 10, buscador_global: nombre})
.then(response => {
  res.json(response.data);
}).catch(error => {
  res.json(error);
});

}

//OBTENER LISTA DE COLABORADORES
function buscarcolaboradores(req, res){
  axios.post('//negocialab.com:3000/apirest/registros/data_colaboradores', 
  { empresa: 1, join_users_colaboradores: 1})
  .then(response => {
    res.json(response.data);
  }).catch(error => {
    res.json(error);
  });
  
}

//OBTENER SERIES 
function buscarseries(req, res){
const tipo = req.body.tipo;

  axios.post('//negocialab.com:3000/apirest/configuraciones/data_series', 
  { empresa: 1, tipo: tipo})
  .then(response => {
    res.json(response.data);
  }).catch(error => {
    res.json(error);
  });
  

}

//OBTENER SERIES 
function buscarcorrelativo(req, res){
  const serie = req.body.serie;
  const tipodoc = req.body.tipo;
  
    axios.post('//negocialab.com:3000/apirest/configuraciones/data_correlativo', 
    { empresa: 1, tipodoc: tipodoc, serie: serie})
    .then(response => {
      res.json(response.data);
    }).catch(error => {
      res.json(error);
    });
    
  
}

//CARGAR PRODUCTOS
function buscarproducts(req, res){

  const fn_id_empresa = req.body.empresa;
  const n_producto = req.body.n_producto;
  
    axios.post('//negocialab.com:3000/apirest/productos/fn_principal_producto', 
    { empresa: 1, fn_texto_busqueda: n_producto, fn_id_sucursal: 6, poc_busq_precisa_producto: 0})
    .then(response => {
      res.json(response.data);
    }).catch(error => {
      res.json(error);
    });
    

}


module.exports = {
buscarcliente: buscarcliente,
buscarcolaboradores: buscarcolaboradores,
buscarseries: buscarseries,
buscarcorrelativo: buscarcorrelativo,
buscarproducts: buscarproducts
}