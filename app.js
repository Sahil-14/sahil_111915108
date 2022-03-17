const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const PORT = 8000;
const app = express();

var corsOptions = {
  origin: "http://localhost:8000"
};

app.use(cors(corsOptions));


app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./src/models");

db.sequelize.sync();
// drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

var err = '';
const check = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    err = 'Connection has been established successfully.';
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    err = 'Connection has been established successfully.';
  }
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to test application.", err });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




