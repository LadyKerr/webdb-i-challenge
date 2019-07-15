const express = require("express");
const accountsDb = require("../data/dbConfig.js");

const router = express.Router();

//CRUD via knex

//CREATE
router.post("/", async (req, res) => {
  const post = req.body;

  try {
    const newPost = await accountsDb("accounts").insert(post);
    res.status(201).json(newPost[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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

//READ by ID
router.get("/:id", (req, res) => {
  const { id } = id;

  accountsDb("accounts")
    .where({ id: id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res
          .status(404)
          .json({ message: "The account with that ID doesn't exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAccount = await accountsDb("accounts")
      .where({ id: id })
      .update(req.body);
    res.status(200).json({ message: `${updatedAccount} record(s) updated` });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAccount = await accountsDb("accounts")
      .where({ id: id })
      .del();
    res
      .status(200)
      .json({ message: `${deletedAccount} record(s) was deleted.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
