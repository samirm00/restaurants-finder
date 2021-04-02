# Restaurants finder

---

<!-- ## User Story Dependencies

[Story Dependency Diagram](https://excalidraw.com/)

---

## WIREFRAME

![wireframe]() -->

---

## 0.Setup

- fork the repo `restful-chinook`
- turn on GitHub pages
- add collaborators
- create a project board `resturants-finder-project-board`
- simple README.md
- first Strategy plan
- add milestones and labels

---

## 1. Create a server

**As a developer I want to create a server to send all the information about restaurants list when the user asked**

### REPO

- This user story is developed on branch `1-server`.
- This branch is merged to `master` branch after completion.

### Task A

`server.js`

- this issue developed on a branch `1-server`
- create a server
- install and require the necessary libraries `express` , `morgen`,`cors`,`dotenv`
- start the server

### Task B

`routes.js`

- this issue developed on a branch `2-routes`
- use express `router`
- create a route GET to get all restaurants `/api/restaurants`
- create a route GET to get one restaurant by id ` /api/restaurants/:id`
- create a route POST to add a new restaurant `/api/restaurants`
- create a route PUT to update a restaurants by id ` /api/restaurants/:id`
- create a route DELETE to delete a restaurants by id ` /api/restaurants/:id`
- create `controllers` object with all methods
- require `controllers`
- import `router` to `server.js`

### Task C

`controllers.js`

- create an object to group our controllers
- create a method to get all restaurants
- create a method to get one restaurant by id
- create a method to get add a new restaurant
- create a method to update a restaurant by id
- create a method to delete a restaurant by id

### Task D

`db/index.js`

- install `node-postgres` library`
- create a new folder `db`
- create a new `pool` in index.js and export `query`
- mange default values for the environment variables
- require `/db` in the server

## 1. Client

**As a user I wan to see all the restaurants in the list with name , rating**

### REPO

- This user story is developed on branch `3-client`.
- This branch is merged to `master` branch after completion.

### Task A

`/components`

- create `components/AddRestaurants.js`
- `components/Header.js`
- `components/ResturantList.js`
- add all the components to `routes/Home.js`

### Task B

`routes`

- create `routes/Home.js` `routes/RestaurantDetail.js` and `routes/ÙpdatePage.js`
- update to `App.js` all the routes

### Task C

`RestaurantFinder.js`

- Fetching Data
- created `api/RestaurantFinder.js`

### Task D

`restaurantUpdatePage`

- create new component for the update page

### Task E

`detailsPage`

- create new component for the details page

### Task F

- update `renderRating` handler to `components/RestaurantList.js`
- updated rating to `routes/RestaurantDetailPage.js`

### Task G

- add style
