const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'arkademy'
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query('select * from produk;', (error,results) => {
    res.render('index.ejs',{produk:results});
});

});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM produk',
    (error, results) => {
      // Teruskan object sebagai argument kedua res.render
      res.render('index.ejs',{produk:results});
    }
  );
});

app.get('/new', (req, res) => {

      res.render('new.ejs');
});

// app.post('/create', (req, res) => {
//   connection.query(
//     'INSERT INTO produk (nama_produk) VALUES(?)',
//     [req.body.itemName],
//     (error, results) => {
//     res.redirect('/index');
// });
// });

app.post('/create',(req, res) => {
  let data = {nama_produk: req.body.itemName, keterangan: req.body.keterangan , harga: req.body.harga, jumlah: req.body.jumlah};
  let sql = "INSERT INTO produk SET ?";
  let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/index');
  });
});

app.post('/delete/:id', (req, res) => {
  connection.query( 'DELETE FROM produk WHERE nama_produk=?',
  [req.params.nama_produk],
  (error, results) => {
    res.redirect('/index');
  }
  
);
});

app.get('/edit/:nama_produk', (req, res) => {
  connection.query('select * from items where nama_produk=?', [req.params.id],
  (error,results) => {
  res.render('edit.ejs', {produk: results[0]});
});
}
);

app.post('/update/:nama_produk', (req, res) =>{
  connection.query('update produk set name =? where nama_produk =?',
  [req.body.nama_produk, req.params.id],
  (error, results) => {
  res.redirect('/index');
});
});

app.listen(3100);