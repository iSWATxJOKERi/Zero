const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');

const users =  require("./routes/api/users");
const items = require("./routes/api/items");

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected to MongoDB succesfully")).catch(err => console.log(err))

app.get("/", (req, res) => res.send("Facts"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${ port }`));