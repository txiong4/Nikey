const express = require("express");
const path = require("path");

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


app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
});