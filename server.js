const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

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
app.use(session({
  secret: "some_secret",
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1800000
  }
}))
app.use(express.static(path.join(__dirname, "public")));

// Set templating engine to EJS
app.set("view engine", "ejs");

//  GET -> user requests to visit a page
// POST -> a user requests to submit data
//  req -> what the user sends to your server
//  res -> what you should send back

// Home route
app.get("/", (req, res) => {
  res.render("home", {
    errors: {}
  })
});

// Login route
app.get("/login", (req, res) => {
  res.render("login", {
    errors: {}
  })
})

// orders route
app.get("/orders", (req, res) => {
  res.render("orders", {
    errors: {}
  })
});

app.get("/products", (req, res) => {
  res.render("products", {
    errors: {}
  })
});

app.get("/services", (req, res) => {
  res.render("services", {
    errors: {}
  })
})

app.get("/register", (req, res) => {
  res.render("register", {
    errors: {}
  })
})

app.get("/siding", (req, res) => {
  res.render("siding", {
    errors: {}
  })
})

app.get("/roofing", (req, res) => {
  res.render("roofing", {
    errors: {}
  })
})

app.get("/framing", (req, res) => {
  res.render("framing", {
    errors: {}
  })
})

app.get("/flooring", (req, res) => {
  res.render("flooring", {
    errors: {}
  })
})

app.post("/login", (req, res) => {
  const { user, password } = req.body;
  connection.query(`select * from account where username = ?`, [user], (err, results) => {
    let found = false;
    let usr;
    for(let i = 0; i< results.length; i++) {
      if(results[i].username === user) {
        if(password === results[i].password) {
          usr = results[i];
          found = true;
          break;
        }
      }
    }
    if(!found) {
      return res.status(404).render("login", {
        errors: "noUserName"
      });
    }
    req.session.user = usr.username
    return res.render("orders");
  });
});

app.post("/register", (req, res) => {
  const { username, pass1, pass2 } = req.body;
  connection.query(`select * from account;`, (err, results) => {
    if(err) {
      console.error(err);
      return res.status(500).json({ message: "could not insert into account db"})
    }
    for(let i = 0; i < results.length; i++) {
      if(results[i].username === username) {
        return res.status(409).render("register", {
          errors: "username"
        })
      }
    }
    connection.query(`INSERT INTO Account(username, password) Values(?,?)`, [username, pass1], (err, results) => {
      if(err) {
        console.error(err);
        return res.status(500).json({ message: "could not insert into account db"})
      }
    });
    return res.send("OK!");
  });
}) 

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
});