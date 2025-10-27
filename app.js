const express = require("express");
const mongodb = require("mongodb");// Import MongoDB helper file
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sess; // global session, NOT recommended, only for demonstration purposes

router.get("/", (req, res) => {
  sess = req.session;
  if (sess.email) {
    return res.redirect("/admin");
  }
  res.send("Welcome Henry");
});

router.post("/login", (req, res) => {
  sess = req.session;
  sess.email = req.body.email;
  res.end("done");
});

router.get("/admin", (req, res) => {
  sess = req.session;
  if (sess.email) {
    res.write(`Hello ${sess.email}`);
    res.end("Logout");
  } else {
    res.write("Please login first.");
    res.end("Login");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});

// Initialize MongoDB connection before starting the server
mongodb.initDb((err, db) => {
  if (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
  } else {
    console.log('✅ MongoDB initialized, starting server...');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  }
});

// Example route that uses the DB
app.get('/messages', (req, res) => {
  try {
    const db = mongodb.getDb().db('<databaseName>'); // replace with your actual DB name
    db.collection('messages')
      .find({})
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(500).send('Database not initialized');
  }
});

app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
