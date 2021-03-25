import React, { useState } from "react";
import RestaurantFinder from "../api/RestaurantFinder";
import { useHistory, useLocation, useParams } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`${id}/addReview`, {
        name: name,
        review: reviewText,
        rating: rating,
      });
      console.log(response);
      history.push("/");
      history.push(location.pathname);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mb-2">
      <br></br>
      <form>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="name"
              className="form-control"
            />
          </div>
          <br></br>

          <div className=" form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option disabled> Rating </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmitReview}
          className="btn btn-primary"
        >
          Add Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
