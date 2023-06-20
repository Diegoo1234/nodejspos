const notifier = require('node-notifier');
const axios = require('axios');

const EC2_DOMINIO = 'https://negocia.pe/';
const EC2_BUCKET_S3 = 'negslab';

//CURL POST OBTENER CLIENTE
function buscarcliente(req, res){
const nombre = req.body.nombre;  
 
axios.post('http://negocialab.com:3000/apirest/registros/data_clientes', 
{ empresa: 1, offset: 1, per_page: 10, nombre: nombre, codigo: nombre, dni: nombre})
.then(response => {
  res.json(response.data);
}).catch(error => {
  res.json(error);
});

 
}


module.exports = {
buscarcliente: buscarcliente
}