import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context /RestaurantsContext";

const UpdateRestaurant = (props) => {
  let history = useHistory();
  const { restaurants } = useContext(RestaurantsContext);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      console.log(response);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name: name,
      location: location,
      price_range: priceRange,
    });
    console.log(updatedRestaurant);

    history.push("/");
  };

  return (
    <div>
      <br></br>
      <form>
        <br></br>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control"
            type="number"
          />
        </div>
        <br></br>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
