"use strict";

const db = require("../db");

const controllers = {
  getAllResturants: async (req, res) => {
    try {
      const resturants = await db.query("SELECT * FROM resturants");
      const resturantsRatingData = await db.query(
        "SELECT * FROM resturants LEFT JOIN (SELECT resturant_id , COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY resturant_id) reviews ON resturant_id = reviews.resturant_id;"
      );
      console.log(resturantsRatingData);
      res.status(200).json({
        status: "success",
        numbers: resturants.rows.length,
        data: resturants.rows,
        ratingData: resturantsRatingData.rows,
      });
    } catch (err) {
      console.error(err);
    }
  },

  getOneResturant: async (req, res) => {
    try {
      const resturant = await db.query(
        "SELECT * FROM resturants LEFT JOIN (SELECT resturant_id , COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY resturant_id) reviews ON resturant_id = reviews.resturant_id WHERE id =$1;",
        [req.params.id]
      );

      const reviews = await db.query(
        "SELECT * FROM reviews WHERE resturant_id =$1",
        [req.params.id]
      );
      res.status(200).json({
        status: "success",
        data: resturant.rows,
        reviews: reviews.rows,
      });
    } catch (err) {
      console.error(err);
    }
  },

  addResturant: async (req, res) => {
    try {
      const newResturant = await db.query(
        "INSERT INTO resturants (name, location, price_range) VALUES ($1,$2,$3) returning *",
        [req.body.name, req.body.location, req.body.price_range]
      );
      res.status(200).json({
        status: "success",
        data: newResturant.rows,
      });
    } catch (err) {
      console.error(err);
    }
  },

  updateResturant: async (req, res) => {
    try {
      const updatedResturant = await db.query(
        "UPDATE resturants SET name=$1, location=$2,price_range=$3 WHERE id=$4 returning *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id]
      );

      res.status(200).json({
        status: "success",
        data: updatedResturant.rows,
      });
    } catch (err) {
      console.error(err);
    }
  },

  deleteResturant: async (req, res) => {
    try {
      const deletedResturant = await db.query(
        "DELETE FROM  resturants  WHERE id=$1 ",
        [req.params.id]
      );

      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      console.error(err);
    }
  },

  addReview: async (req, res) => {
    try {
      const newReview = await db.query(
        "INSERT INTO reviews(resturant_id,name,review,rating) VALUES ($1,$2,$3,$4) returning * ",
        [req.params.id, req.body.name, req.body.review, req.body.rating]
      );

      res.status(200).json({
        status: "success",
        data: newReview.rows[0],
      });
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = controllers;
