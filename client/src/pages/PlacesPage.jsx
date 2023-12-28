import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";


export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState('');

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4 ">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  async function addNewPlace(ev){
    ev.preventDefault();
   await axios.post('/places',{
    title,address,addedPhotos,description,
    perks,extraInfo,checkInTime,
    checkOutTime,maxGuests} 
   );
    setRedirect('/account/places');
  }

  if(redirect){
    return <Navigate to ={redirect} />
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full"
            to="/account/places/new"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new Place{" "}
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            {preInput(
              "title",
              "Title for your place?location . need to be short"
            )}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="title , for example : My new villa"
            />
            {preInput("address", "Address of your PLace/Location")}
            <input type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
             placeholder="Address" />
            {preInput("photos", "Add your place/location photos")}
              <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
              
            {preInput("Description", "Description about your Place/Location")}

            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Description"
            ></textarea>
            {preInput("Perks", "Select All the perks of your Place/Location")}

            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <Perks selected={perks} onChanged={setPerks} />
            </div>
            {preInput("Extra Info", "If have any extra info/rules")}

            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            ></textarea>
            {preInput(
              "Check in&out times",
              "add check in and out times , and cleaning time and etc."
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in Time</h3>
                <input type="text"
                value={checkInTime}
                onChange={(ev) => setCheckInTime(ev.target.value)}
                 placeholder="08:00" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                <input type="text" 
                value={checkOutTime}
                onChange={(ev) => setCheckOutTime(ev.target.value)}
                placeholder="22:00" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max NUmber of guests</h3>
                <input type="number" 
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
                placeholder="10" />
              </div>
            </div>
            <div>
              <button className="primary my-4">Add Place</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
