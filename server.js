const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password',
  database: 'nicholsconstruction'
});

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

// Set templating engine to EJS
app.set("view engine", "ejs");

//  GET -> user requests to visit a page
// POST -> a user requests to submit data
//  req -> what the user sends to your server
//  res -> what you should send back

// Home route
app.get("/", (req, res) => {
  res.render("home");
});

// Login route
app.get("/login", (req, res) => {
  res.render("login");
})

// orders route
app.get("/orders", (req, res) => {
  res.render("orders")
});

app.get("/products", (req, res) => {
  res.render("products")
});

app.get("/services", (req, res) => {
  res.render("services")
})

app.get("/register", (req, res) => {
  res.render("register")
})

app.get("/siding", (req, res) => {
  res.render("siding")
})

app.get("/roofing", (req, res) => {
  res.render("roofing")
})

app.get("/framing", (req, res) => {
  res.render("framing")
})

app.get("/flooring", (req, res) => {
  res.render("flooring")
})

app.post("/login", (req, res) => {
  const { user, password } = req.body;
  res.send(`username is ${user} and pass is ${password}`);
});

app.post("/register", (req, res) => {
  const { username, pass1, pass2 } = req.body;
  connection.query(`insert into account values (?, ?)`, [username, pass1]);
}) 

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
});