const notifier = require('node-notifier');
const axios = require('axios');

const EC2_DOMINIO = 'https://negocia.pe/';
const EC2_BUCKET_S3 = 'negslab';
function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM libro', (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/libro', { tasks });
    });
  });
}

function create(req, res) {

  res.render('tasks/guardar');
}

function index_renew(req, res) {
  const data = { menu_renew: false};

  // Hacer una solicitud GET a una API REST
axios.get('http://negocialab.com:3000/api/datos_perfil?id_perfil=1')
.then(response => {
 const datos = response.data;
  res.render('libreria',  { EC2_DOMINIO, EC2_BUCKET_S3, data, datos});
})
.catch(error => {
  datos = error;
});

}



function store(req, res) {
  const data = req.body;
  const nombre = data.nombre;
  if(nombre == ''){
    notifier.notify({
      title: '¡Alerta!',
      message: 'Este es un mensaje de alerta.',
    }); 
  return;  
  }
  req.getConnection((err, conn) => {
    conn.query('INSERT INTO libro SET ?', [data], (err, rows) => {
      res.redirect('/tasks');
    });
  });
}

function destroy(req, res) {
  const id = req.body.id;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM libro WHERE id = ?', [id], (err, rows) => {
      res.redirect('/tasks');
    });
  })
}

function edit(req, res) {
  const id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM libro WHERE id = ?', [id], (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/edit', { tasks });
    });
  });
}

function update(req, res) {
  const id = req.params.id;
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('UPDATE libro SET ? WHERE id = ?', [data, id], (err, rows) => {
      res.redirect('/tasks');
    });
  });
}


module.exports = {
  index: index,
  create: create,
  store: store,
  destroy: destroy,
  edit: edit,
  update: update,
  index_renew: index_renew
}