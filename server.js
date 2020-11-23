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
  if(req.session.user) {
    // if logged in
    connection.query(`select * from orders where userid = ?;`, [req.session.user], (err, results) => {
      let orderId = [];
      if(err) {
        console.error(err);
        return res.status(500);
      }
      let orderId_ = results[0].orderid;
      for(let i = 0; i < results.length; i++) {
        orderId.push(results[i].itemid); // add item ids to orderId list
      }
      let orders = [];
      connection.query(`select * from item where itemid = ?`, [orderId[0]], (err, results) => {
        if(err) {
          console.error(err)
        }
        for(let i = 0; i < results.length; i++) {
          orders.push(results[i])
        }
        console.log(orders)
        return res.render("user_orders", {
          id: orderId_,
          orders: orders
        });
      });
    })
  } else {
    res.render("orders", {
      errors: {}
    })
  }
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
    req.session.user = usr.userid
    console.log(req.session.user)
    return res.redirect("/orders");
  });
});

app.get("/orders/:id", (req, res) => {
  const { id: orderId } = req.params;
  connection.query(`select * from orders where orderid = ?`, [orderId], (err, results) => {
    if(err) {
      console.error(err)
      return res.sendStatus(500)
    }
    const itemid = results[0].itemid;
    connection.query(`select * from item where itemid = ?`, [itemid], (err, results2) => {
      res.json({
        order: results, item: results2
      })
    })
  })
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
})

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
    return res.render("register", {
      errors: {}
    });
  });
}) 

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
});