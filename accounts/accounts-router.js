const express = require("express");
const knex = require("knex");

//knex connect
const accountsDb = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/dbConfig.js"
  },
  useNullAsDefault: true
});

const router = express.Router();

//CRUD via knex

//CREATE

//Read
router.get("/", (req, res) => {
  accountsDb("accounts")
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "There was an error retrieving accounts." });
    });
});

module.exports = router;
