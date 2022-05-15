const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const fetch = require("node-fetch");

const searchMovie = async (query, limit) => {
  const service_url = "https://kgsearch.googleapis.com/v1/entities:search";
  const params = {
    query,
    limit,
    indent: true,
    key: process.env.GOOGLE_KNOWLEDGE_API_KEY,
  };
  try {
    const response = await fetch(
      service_url +
        `?query=${params.query}&key=${params.key}&limit=${params.limit}&indent=True`
    ).then((res) => res.json());

    return response;
  } catch (error) {
    console.log(error);
    response.send(error);
  }

  //     function (response) {
  //       $.each(response.itemListElement, function (i, element) {
  //         $("<div>", { text: element["result"]["name"] }).appendTo(document.body);
  //       });
  //     }
  //   );
};

module.exports = {
  searchMovie,
};
