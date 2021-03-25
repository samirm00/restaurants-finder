"use strict";

const db = require("../db");

const controllers = {
  getAllResturants: async (req, res) => {
    try {
      const restaurantRatingsData = await db.query(
        "select * from resturants left join (select resturant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by resturant_id) reviews on resturants.id = reviews.resturant_id;"
      );

      res.status(200).json({
        status: "success",
        results: restaurantRatingsData.rows.length,
        data: {
          restaurants: restaurantRatingsData.rows,
        },
      });
    } catch (err) {
      console.error(err);
    }
  },

  getOneResturant: async (req, res) => {
    try {
      const restaurant = await db.query(
        "select * from resturants left join (select resturant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by resturant_id) reviews on resturants.id = reviews.resturant_id where id = $1",
        [req.params.id]
      );

      const reviews = await db.query(
        "select * from reviews where resturant_id = $1",
        [req.params.id]
      );

      res.status(200).json({
        status: "success",
        data: {
          restaurant: restaurant.rows[0],
          reviews: reviews.rows,
        },
      });
    } catch (err) {
      console.error(err);
    }
  },

  addResturant: async (req, res) => {
    try {
      const results = await db.query(
        "INSERT INTO resturants (name, location, price_range) values ($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price_range]
      );

      res.status(201).json({
        status: "success",
        data: {
          restaurant: results.rows[0],
        },
      });
    } catch (err) {
      console.error(err);
    }
  },

  updateResturant: async (req, res) => {
    try {
      const results = await db.query(
        "UPDATE resturants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id]
      );

      res.status(200).json({
        status: "success",
        data: {
          restaurant: results.rows[0],
        },
      });
    } catch (err) {
      console.error(err);
    }
  },

  deleteResturant: async (req, res) => {
    try {
      const results = db.query("DELETE FROM resturants where id = $1", [
        req.params.id,
      ]);
      res.status(204).json({
        status: "success",
      });
    } catch (err) {
      console.error(err);
    }
  },

  addReview: async (req, res) => {
    try {
      const newReview = await db.query(
        "INSERT INTO reviews (resturant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
        [req.params.id, req.body.name, req.body.review, req.body.rating]
      );

      res.status(201).json({
        status: "success",
        data: {
          review: newReview.rows[0],
        },
      });
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = controllers;
