
import { useEffect } from "react";
import Header from "../Header";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {  
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response =>{
      setPlaces([...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,]);
    });
  },[]);
  return (
    <div className=" mt-8 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cursur-pointer">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+ place._id}>
          <div className="bg-gray-500 rounded-3xl flex">
          {place.photos?.[0] && (
            <img className="rounded-3xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+ place.photos[0]} alt="" />
          )}
          </div>
          <h3 className="font-bold truncate">{place.address}</h3>
         <h2 className="text-sm  font-gray-500">{place.title}</h2> 
         <div className="mt-1">
           <span className="font-bold">${place.pricePerNight} Per Night</span> 
         </div>
        </Link>
      ))}
  </div>
  );
}