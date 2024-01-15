import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function SingleBookingPage(){
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(()=>{
        if(id){
            axios.get(`/bookings`).then(response =>{
             const foundBooking =   response.data.find(({_id}) => _id === id);
             if(foundBooking){
                 setBooking(foundBooking);
             }
            });
        }
    },[id]);

    if(!booking) 
    {
        return "";
    }
    return(
        <div className="my-8">
           <h2 className="text-3xl">{booking.place.title}</h2>
           <AddressLink className="my-2 "> {booking.place.address}</AddressLink>
           <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex items-center justify-between pr-25">
            <div>
            <h2 className="text-xl">Your Booking Information</h2>
            <BookingDates booking={booking}/>
            </div>
            <div className="bg-primary p-4 rounded-2xl text-white">
                <div>Total price</div>
                <div className="text-3xl">{booking.price}$</div>
                 
            </div>
           </div>
           <PlaceGallery singleplace={booking.place}/>
        </div>
    );
}