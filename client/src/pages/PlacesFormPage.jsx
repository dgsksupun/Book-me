import AccountNav from "../AccountNav";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
export default function PlacesFormPage(){
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]); 
    const [extraInfo, setExtraInfo] = useState("");    
    const [checkInTime, setCheckInTime] = useState("");
    const [checkOutTime, setCheckOutTime] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [pricePerNight, setPricePerNight] = useState(100);
    useEffect(() => {
      if(!id){
        return;
      }
    axios.get('/places/'+id).then(response => {
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckInTime(data.checkInTime);
      setCheckOutTime(data.checkOutTime);
      setMaxGuests(data.maxGuests);
      setPricePerNight(data.pricePerNight);

    });
    },[id])


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
    
      async function savePlace(ev){
        const placeData = {title,address,addedPhotos,description,
          perks,extraInfo,checkInTime,
          checkOutTime,maxGuests,pricePerNight}
        ev.preventDefault();

        if(id){
          //update
          await axios.put('/places',{
            id,...placeData
            } 
           );
            setRedirect(true);
        } else {
          //create
          await axios.post('/places',placeData);
            setRedirect(true);
        }
         
       
      }
      
      if(redirect){
        return <Navigate to={"/account/places"} />;
      }

    return (
        <div>
        <AccountNav/>
        <form onSubmit={savePlace}>
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
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 ">
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

            <div>
              <h3 className="mt-2 -mb-1">Price per Night</h3>
              <input type="number" 
              value={pricePerNight}
              onChange={(ev) => setPricePerNight(ev.target.value)}
              placeholder="10" />
            </div>
          </div>
         
          <div>
            <button className="primary my-4">Add Place</button>
          </div>
        </form>
      </div>
    );
}