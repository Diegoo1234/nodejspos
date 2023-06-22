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

module.exports = {
buscarcliente: buscarcliente,
buscarcolaboradores: buscarcolaboradores,
buscarseries: buscarseries
}