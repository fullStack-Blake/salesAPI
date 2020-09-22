/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students. *
 * Name: SangYeup Han   Student ID: 165932187       Date: Sept.22nd.2020
 * Heroku Link: https://morning-scrubland-27998.herokuapp.com/
 *
 * * ********************************************************************************/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");

const myData = dataService(
  "mongodb+srv://user:pass@sales.sf7us.mongodb.net/sample_supplies?retryWrites=true&w=majority"
);

const app = express();

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

// ************* API Routes

// POST /api/sales (NOTE: This route must read the contents of the request body)

app.post("/api/sales", (req, res) => {
  myData
    .addNewSale(req.body)
    .then(data => res.json(data))
    .catch(err => console.log(`Error when add New sales ${err}`));
});

// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )

app.get("/api/sales", (req, res) => {
  myData
    .getAllSales(req.query.page, req.query.perPage)
    .then(data => res.json(data))
    .catch(err => console.log(`Error when loading all sales ${err}`));
});

// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)

app.get("/api/sales/:id", (req, res) => {
  myData
    .getSaleById(req.params.id)
    .then(data => res.json(data))
    .catch(err => `Error when getting sale by id ${err}`);
});

// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)

app.put("/api/sales/:id", (req, res) => {
  myData
    .updateSaleById(req.body, req.params.id)
    .then(data => res.json(data))
    .catch(err => `Error when Update existing sale ${err}`);
});

// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)

app.delete("/api/sales/:id", (req, res) => {
  myData
    .deleteSaleById(req.params.id)
    .then(data => res.json(data))
    .catch(err => `Error when deleting sale`);
});

// ************* Initialize the Service & Start the Server

myData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
