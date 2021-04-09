const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// log to file
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(path.join(__dirname, "access2.log"), {
      flags: "a",
    }),
  })
);
// log to console
app.use(morgan("dev"));

// sqlite database

const sqlite3 = require("sqlite3").verbose();
const DB_PATH = path.join(__dirname, "db", "finder.sqlite");

const db = new sqlite3.Database(DB_PATH);

// get all resturants
app.get("/api/v1/restaurants", (req, res) => {
  const queryString = `SELECT * FROM restaurants ; `;

  db.all(queryString, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log(rows);

      res.status(200).json({
        status: "success",
        results: rows.length,
        data: {
          restaurants: rows,
        },
      });
    }
  //  db.close((err) => {
   //   if (err) {
    //    console.error(err);
     //   return;
    //  }
 //   });
  });
});

// get one resturant
app.get("/api/v1/restaurants/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const queryString = `SELECT *  FROM restaurants WHERE  id = ${id};`;

  db.all(queryString, (err, restaurant) => {
    if (err) {
      console.error(err);
    } else {
      console.log(restaurant);

      db.all(
        `SELECT *  FROM reviews WHERE  restaurant_id = ${id};`,
        (err, reviews) => {
          if (err) {
            console.error(err);
          } else {
            console.log(reviews);
            res.status(200).json({
              status: "success",
              data: {
                restaurant: restaurant,
                reviews: reviews,
              },
            });
          }
        }
      );
    }
  });

 
});

// add a restaurant

app.post("/api/v1/restaurants", (req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const price_range = req.body.price_range;
  const queryString = `INSERT INTO restaurants (name , location, price_range) VALUES('${name}','${location}',${price_range});`;

  db.run(queryString, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("A new restaurant has been addded");

    db.all(
      `SELECT * FROM restaurants WHERE name ='${name}' AND location='${location}' ; `,
      (err, newRestaurant) => {
        if (err) {
          console.error(err);
          return;
        } else {
          res.status(200).json({
            status: "success",
            data: {
              retaurant: newRestaurant,
            },
          });
        }
      }
    );

  
  });
});

// update a restaurant

app.put("/api/v1/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const location = req.body.location;
  const price_range = req.body.price_range;
  const queryString = `UPDATE restaurants SET name = '${name}', location = '${location}' , price_range = ${price_range}
  WHERE id= ${id};
  `;

  db.run(queryString, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("Resturant has been updated");
      db.all(
        `SELECT * FROM restaurants WHERE id=${id}`,
        (err, updatedRestaurant) => {
          if (err) {
            console.error(err);
            return;
          } else {
            res.status(200).json({
              status: "success",
              data: {
                retaurant: updatedRestaurant,
              },
            });
          }
        }
      );
    }
  });

 
});

// delete a restaurant

app.delete("/api/v1/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const queryString = `DELETE FROM restaurants WHERE id = ${id};`;

  db.run(queryString, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("Resturant has been deleted");
      res.send("the resturant has been deleted");
    }

   
  });
});

// add a review

app.post("/api/v1/restaurants/:id/addReview", (req, res) => {
  const restaurant_id = req.params.id;
  const name = req.body.name;
  const review = req.body.review;
  const rating = req.body.rating;

  const queryString = `INSERT INTO reviews (restaurant_id, name, review, rating)
  VALUES(${restaurant_id}, '${name}', '${review}', ${rating}) ;
  `;

  db.run(queryString, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("A new review has been added !!");

      db.all(
        `SELECT * FROM reviews WHERE restaurant_id =${restaurant_id} AND name='${name}';`,
        (err, newReview) => {
          if (err) {
            console.error(err);
            return;
          } else {
            res.status(200).json({
              status: "success",
              data: {
                review: newReview,
              },
            });
          }
        }
      );
    }

    
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
