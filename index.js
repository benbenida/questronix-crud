const express = require("express");
const mysql = require("mysql")
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs");

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
  connection.query("SELECT * FROM items", function(err, rows, fields) {
    res.render("index", {data: rows});
  });
})

app.listen(3000, () => console.log("Serving at port 3000"))