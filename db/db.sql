

CREATE TABLE restaurants (
  id SERIAL NOT NULL PRIMARY KEY ,
  name VARCHAR(50) NOT NULL ,
  location VARCHAR(50) NOT NULL ,
  price_range INT NOT NULL CHECK(price_range >= 1  AND price_range <=5)
);

INSERT INTO restaurants (name,location,price_range) VALUES('Black Rose', 'Brussels', 3);
INSERT INTO restaurants (name,location,price_range) VALUES('Pizza Hot', 'Jette', 2);
INSERT INTO restaurants (name,location,price_range) VALUES('Italiano', 'Italy', 4);
INSERT INTO restaurants (name,location,price_range) VALUES('Corner Meal', 'Brussels', 4);
INSERT INTO restaurants (name,location,price_range) VALUES('Black Rose', 'Germany', 3);
INSERT INTO restaurants (name,location,price_range) VALUES('Black Rose', 'Austria', 3);
INSERT INTO restaurants (name,location,price_range) VALUES('Black Rose', 'Miami', 3);
INSERT INTO restaurants (name,location,price_range) VALUES('Black Rose', 'Cool Meal', 3);
INSERT INTO restaurants (name,location,price_range) VALUES('Black Rose', 'Saint-Gilles', 1);
INSERT INTO restaurants (name,location,price_range) VALUES('Black Rose', 'Italy', 5);
INSERT INTO restaurants (name,location,price_range) VALUES('Red Flower', 'Mons', 3);
INSERT INTO restaurants (name,location,price_range) VALUES('Super Meal', 'Antwerp', 3);



CREATE TABLE reviews (
    id SERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);

INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(1,'Marc','it was a nice restaurant', 1);
INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(2,'Patrick','it was a ok restaurant', 2 );
INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(6,'Jolie','it was a bad  restaurant', 3 );
INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(4,'Kristy','it was a nice restaurant', 5 );
INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(5,'Lien','it was a nice restaurant', 3);
INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(6,'Derick','it was a nice restaurant', 5 );
INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(7,'Marcus','it was a nice restaurant', 2 );
INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(8,'Stephan','it was a nice restaurant', 1 );
INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(9,'Lara','it was a nice restaurant', 4 );
INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(2,'Ava','it was a nice restaurant', 2 );
INSERT INTO reviews (restaurant_id, name, review,rating) VALUES(3,'Shun','it was a nice restaurant', 1);


