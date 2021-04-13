const express = require("express");
const mysql = require("mysql")
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'inventory'
})

connection.connect((err) => {
  if (err) throw err
})

app.get("/", (req, res) => {
  res.redirect("/items")
})

// Index route
app.get("/items", (req, res) => {
  connection.query("SELECT * FROM items", function(err, rows, fields) {
    res.render("index", {data: rows});
  });
})

// New Route
app.get("/items/new", (req, res) => {
  res.render("new")
})

// Show Route
app.get("/items/:id", (req, res) => {
  connection.query(`SELECT * FROM items WHERE item_id=${req.params.id}`, function(err, row, field) {
    if (err) throw err;
    res.render("show", {data: row[0]})
  })
  // res.render("show")
})

app.post("/items", (req, res) => {
  const {item} = req.body;
  connection.query(`INSERT INTO items(item_name, item_qty, item_amount) values ("${item.name}", ${item.qty}, ${item.amount});`,
  function(err, row, field ) {
    if (err) throw err;
    res.redirect("/")
  })
});

app.put("/items/:id", async (req, res) => {
  const { item } = req.body;
  console.log(item)
  connection.query(`UPDATE items SET item_name = "${item.name}", item_qty = ${item.qty}, item_amount = ${item.amount} WHERE item_id=${req.params.id}`, 
    function(err, row, field) {
    if (err) throw err;
    res.redirect("/")
  })
})

app.delete("/items/:id", (req, res) => {
  connection.query(`DELETE FROM items WHERE item_id=${req.params.id}`, function(err, row, fields) {
    if (err) throw err;
    res.redirect("/")
  })
})

app.listen(4000, () => console.log("Serving at port 4000"))