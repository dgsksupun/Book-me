import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';

export default function BookingWidget({ singleplace }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [redirect, setRedirect] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThePlace() {
    try {
      const response = await axios.post('/bookings', {
        checkIn,
        checkOut,
        guests,
        name,
        phoneNumber,
        place: singleplace._id,
        price: singleplace.pricePerNight * numberOfNights,
      });

      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAlertMessage(error.response.data.error);
      } else {
        // Handle other errors if needed
        console.error(error);
      }
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-3xl">
      {alertMessage && (
        <div className="mb-4 text-red-600">
          <strong>{alertMessage}</strong>
        </div>
      )}

      <div className="text-2xl text-center">
        Price : ${singleplace.pricePerNight} / Per Night
      </div>
      <div className="border rounded-2xl mt-4">
<div className="flex">
  <div className=" py-4 px-4">
    <label>Check In :</label>
    <input
      type="date"
      value={checkIn}
      onChange={(ev) => setCheckIn(ev.target.value)}
    />
  </div>
  <div className=" py-4 px-4 border-t ">
    <label>Check Out :</label>
    <input
      type="date"
      value={checkOut}
      onChange={(ev) => setCheckOut(ev.target.value)}
    />
  </div>
</div>
<div className=" py-4 px-4 border-t ">
  <label>Max Guests :</label>
  <input
    type="number"
    value={guests}
    onChange={(ev) => setGuests(ev.target.value)}
  />
</div>
{numberOfNights > 0 && (
 <div className=" py-4 px-4 border-t ">
 <label>Your full Name :</label>
 <input
   type="text"
   value={name}
   onChange={(ev) => setName(ev.target.value)}
  
 />
  <label>Your Phone Number :</label>
 <input
   type="tel"
   value={phoneNumber}
   onChange={(ev) => setPhoneNumber(ev.target.value)}
  
 />
</div>
)}
</div>

<button onClick={bookThePlace} className="primary">Book This Place
{numberOfNights > 0 && (
<span>
  $ {numberOfNights * singleplace.pricePerNight}
</span>
)}
</button>
    </div>
  );
}




