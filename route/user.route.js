const express = require("express");
const UserRoute = express.Router();
const { signup, login,update,retrieve } = require("../controllers/auth");

UserRoute.post("/signup", signup);
UserRoute.post("/login", login);
UserRoute.patch("/update/:id", update);
UserRoute.get("/retrieve/:id", retrieve);


module.exports = UserRoute;
