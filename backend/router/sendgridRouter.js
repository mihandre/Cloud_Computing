const connection = require("../db");
const express = require("express");
const { LANGUAGE_ISO_CODE } = require("../utils/dictionaries");
const { translateText } = require("../utils/translateFunctions");
const { sendMail } = require("../utils/sendgridFunctions");
const mysql = require("mysql");
const router = express.Router();

router.post("/send", (req, res) => {
  const { senderName, senderMail, receiverMail, messageContent } = req.body;
  if (!senderName || !senderMail || !receiverMail || !messageContent) {
    return res.status(400).send("Missing Parameters");
  }

  try {
    sendMail(
      receiverMail,
      senderMail,
      messageContent,
      `Message from ${senderName}`
    );
  } catch (error) {
    res.status(500).send("Internal error");
  }

  res.status(200).send("Message sent");
});

router.post("/foreign", async (req, res) => {
  const { senderName, senderMail, receiverMail, messageContent, language } =
    req.body;

  if (
    !senderName ||
    !senderMail ||
    !receiverMail ||
    !messageContent ||
    !language
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let translationData = {};
  try {
    if (language === "ALL") {
      const availableLanguages = Object.values(LANGUAGE_ISO_CODE);

      const translatedTexts = await Promise.all(
        availableLanguages.map(async (language) => {
          const translatedText = await translateText(messageContent, language);
          return translatedText[0];
        })
      );

      translationData.translatedText = translatedTexts.reduce((acc, curr) => {
        return acc + curr + "\n";
      }, "");

      sendMail(
        receiverMail,
        senderMail,
        translationData.translatedText,
        `${senderName} has sent you a message`
      );

      connection.query(
        `INSERT INTO messages (senderName, senderMail, receiverMail, messageContent) VALUES (${mysql.escape(
          senderName
        )}, ${mysql.escape(senderMail)}, ${mysql.escape(
          receiverMail
        )}, ${mysql.escape(messageContent)})`,
        (err, results) => {
          if (err) {
            console.log(err);
            return res.send(err);
          }

          return res.json({ translationData });
        }
      );
    } else {
      if (!LANGUAGE_ISO_CODE[language]) {
        return res.status(400).send("Invalid language");
      } else {
        if (LANGUAGE_ISO_CODE[language]) {
          const translatedText = await translateText(
            messageContent,
            LANGUAGE_ISO_CODE[language]
          );
          translationData.translatedText = translatedText[0];

          sendMail(
            receiverMail,
            senderMail,
            translationData.translatedText,
            `${senderName} has sent you a message`
          );

          connection.query(
            `INSERT INTO messages (senderName, senderMail, receiverMail, messageContent) VALUES (${mysql.escape(
              senderName
            )}, ${mysql.escape(senderMail)}, ${mysql.escape(
              receiverMail
            )}, ${mysql.escape(messageContent)})`,
            (err, results) => {
              if (err) {
                console.log(err);
                return res.send(err);
              }

              return res.json({ translationData });
            }
          );
        } else {
          return res.send("Invalid language");
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

module.exports = router;
