import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function () {
  const { id } = useParams();
  const [singleplace, setSinglePlace] = useState(null);
  
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setSinglePlace(response.data);
    });
  }, [id]);
  if (!singleplace) return "";

  
  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8 ">
      <h2 className="text-3xl">{singleplace.title}</h2>
     
      <AddressLink>{singleplace.address}</AddressLink>
      <PlaceGallery singleplace={singleplace} />
      <div className="mt-8 mb-8 grid  grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl"> Description</h2>
            {singleplace.description}
          </div>
          <b>Check in : </b> {singleplace.checkInTime} <br />
          <b>Check out : </b> {singleplace.checkOutTime} <br />
          <b>Max Number of Guests : </b> {singleplace.maxGuests} <br />
        </div>
        <div>
          <BookingWidget singleplace={singleplace} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
      <div>
        <h2 className="font-semibold text-2xl"> Extra Info</h2>
      </div>
      <div className="mb-4 mt-2 text-sm text-gray-800 leading-5">
        {singleplace.extraInfo}
      </div>
      </div>
      
    </div>
  );
}
