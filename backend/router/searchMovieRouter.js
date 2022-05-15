const connection = require("../db");
const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const { searchMovie } = require("../utils/knowledgeFunctions");

router.get("/", async (req, res) => {
  const { query, limit } = req.body;
  if (!query || !limit) {
    return res.status(400).send("Missing Parameters");
  }

  try {
    const result = await searchMovie(query, limit);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

module.exports = router;
