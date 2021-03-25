import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context /RestaurantsContext";
import StarRating from "../components/StarRating";
//import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder(`/${id}`);
        console.log(response.data);
        setSelectedRestaurant(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
          {/*  {selectedRestaurant.data[0].name} */}
          </h1>
          <div className="mt-3">
          {/*  <Reviews reviews={selectedRestaurant.reviews} />*/}
            <AddReview />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
