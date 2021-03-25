"use strict";
const controllers = require("./controllers.js");
const express = require("express");
const router = express.Router();

// routes

router.get("/restaurants", controllers.getAllResturants);
router.get("/restaurants/:id", controllers.getOneResturant);
router.post("/restaurants", controllers.addResturant);
router.post("/restaurants/:id/addReview", controllers.addReview);
router.put("/restaurants/:id", controllers.updateResturant);
router.delete("/restaurants/:id", controllers.deleteResturant);

module.exports = router;
