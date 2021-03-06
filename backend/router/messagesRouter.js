const connection = require("../db");
const express = require("express");
const { LANGUAGE_ISO_CODE } = require("../utils/dictionaries");
const { translateText } = require("../utils/translateFunctions");
const { sendMail } = require("../utils/sendgridFunctions");
const router = express.Router();

router.get("/", (req, res) => {
  connection.query("SELECT * FROM messages", (err, results) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});

router.post("/", (req, res) => {
  const { senderName, senderMail, receiverMail, messageContent } = req.body;

  if (!senderName || !senderMail || !receiverMail || !messageContent) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }

  const queryString = `INSERT INTO messages (senderName, senderMail, receiverMail, messageContent) VALUES (${mysql.escape(
    senderName
  )}, ${mysql.escape(senderMail)}, ${mysql.escape(
    receiverMail
  )}, ${mysql.escape(messageContent)})`;

  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `SELECT * FROM messages WHERE entryID = ${mysql.escape(
    id
  )}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Message not found.");
    }
    return res.json({
      messages: results,
    });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `DELETE FROM messages WHERE entryID = ${mysql.escape(
    id
  )}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Message not found.");
    }
    return res.json({
      results,
    });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }
  const { senderName, senderMail, receiverMail, messageContent } = req.body;
  if (!senderName || !senderMail || !receiverMail || !messageContent) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `UPDATE messages SET senderName = ${mysql.escape(
    senderName
  )}, senderMail = ${mysql.escape(senderMail)}, receiverMail = ${mysql.escape(
    receiverMail
  )}, messageContent = ${mysql.escape(
    messageContent
  )} WHERE entryID = ${mysql.escape(id)}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Message not found.");
    }
    return res.json({
      results,
    });
  });
});

module.exports = router;
