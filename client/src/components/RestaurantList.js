import React, {useEffect} from 'react';
import RestaurantFinder from '../api/RestaurantFinder';

const RestaurantList = () => {
    
 useEffect(() => {
     const fetchData = async () => {
        try {
            const response = await RestaurantFinder.get("/");
            console.log(response);
      
           } catch (err) {} 
     }
    
      fetchData();
         },[])

    return (
        <div className="list-group">
           <table className="table table-hover table-dark">
               <thead>
                   <tr className="bg-primary">
                       <th scope="col">Restaurant</th>
                       <th scope="col">Location</th>
                       <th scope="col">Price Range</th>
                       <th scope="col">Rating</th>
                       <th scope="col">Edit</th>
                       <th scope="col">Delete</th>

                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <td>BelgaQueen</td>
                       <td>Brussels</td>
                       <td>€€€</td>
                       <td>Rating</td>
                       <td><button className=" btn btn-warning">Edit</button></td>
                       <td><button className=" btn btn-danger">Delete</button></td>
                   </tr>

               </tbody>
               </table>   
 
        </div>
    );
};

export default RestaurantList;