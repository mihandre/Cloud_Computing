const express = require("express");
const router = express.Router();
const {
  detectLanguage,
  translateText,
} = require("../utils/translateFunctions");
const { LANGUAGE_ISO_CODE } = require("../utils/dictionaries");

router.get("/detect", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send("Missing Parameters");
  }

  const languageDetection = await detectLanguage(text);
  return res.json({ language: languageDetection[0]?.language });
});

router.get("/translate", async (req, res) => {
  const { text, language } = req.body;

  if (!text || !language) {
    return res.status(400).send("Missing Parameters");
  }

  if (!LANGUAGE_ISO_CODE[language]) {
    return res.status(400).send("Invalid Language");
  }

  const translatedText = await translateText(text, language);
  return res.json({ translateText: translatedText[0] });
});

module.exports = router;
