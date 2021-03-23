"use strict";

const db = require("../db");

const controllers = {
  getAllResturants: async (req, res) => {
    try {
      const resturants = await db.query("SELECT * FROM resturants");
      res.status(200).json({
        status: "success",
        numbers: resturants.rows.length,
        data: resturants.rows,
      });
    } catch (err) {
      console.error(err);
    }
  },

  getOneResturant: async (req, res) => {
    try {
      const resturant = await db.query(
        "SELECT * FROM resturants WHERE id =$1",
        [req.params.id]
      );
      res.status(200).json({
        status: "success",
        data: resturant.rows,
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
};

module.exports = controllers;
