const express = require("express");
const FetchRoute = express.Router();
const {fetchUser}=  require("../controllers/fetch");

FetchRoute.get("/fetch", fetchUser);

module.exports = FetchRoute;
