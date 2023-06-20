const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks');
const { JSDOM } = require('jsdom');

const cors = require('cors');
/*const jquery = require('jquery');
const { window } = new JSDOM();
const axios = require('axios');
*/

const app = express();
app.use(cors());
 
 

/*PERMITIR LEER LIBRERIAS COMO LINK*/
app.use(express.static('src'));
app.use('/axios', express.static('node_modules/axios/dist'));
app.set('port', 4000);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
 
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

/*
app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'libreria'
}, 'single'));
*/


app.listen(app.get('port'), () => {
  console.log('Listening on port ', app.get('port'));
});



app.use('/', tasksRoutes);

app.get('/', (req, res) => {

// Variables que quieres pasar a la plantilla
const EC2_DOMINIO = 'https://negocia.pe/';
const EC2_BUCKET_S3 = 'negslab';
const data = { menu_renew: true};

  res.render('index_renew',  { EC2_DOMINIO, EC2_BUCKET_S3, data });

});