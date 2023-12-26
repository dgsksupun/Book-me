import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";


export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

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

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
    setAddedPhotos(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }

   function uploadPhoto(ev){
    const files = ev.target.files;
    const data = new FormData();
    data.set('photos', files);
    axios.post('/upload', data,{
      headers: {'Content-Type':'multipart/form-data'}
    }).then(response => {
      const {data:filename} = response;
      setAddedPhotos(prev => {
        return [...prev, filename];
      });
    })

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
          <form>
            {preInput(
              "title",
              "Title for your place?location . need to be short"
            )}
            <input
              type="text"
              value={title}
              onAbort={(ev) => setTitle(ev.target.value)}
              placeholder="title , for example : My new villa"
            />
            {preInput("address", "Address of your PLace/Location")}
            <input type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
             placeholder="Address" />
            {preInput("photos", "Add your place/location photos")}

            <div className="flex gap-2">
              <input type="text"
               value={photoLink}
                onChange={ev => setPhotoLink(ev.target.value)}
                 placeholder="Add photos using a Link ...." />
              <button onClick={addPhotoByLink} className="bg-gray-300 px-4 rounded-2xl">
                Add&nbsp;photo
              </button>
            </div>
            
            <div className="mt-3 grid grid-cols-3 md:grid-cols4 lg:grid-cols-6 gap-2">
              {addedPhotos.length > 0 && addedPhotos.map(link => (
                <div>
                <img className="rounded-2xl" src={'http://localhost:4000/uploads/'+ link} alt="" />
              </div>
              ))}
              <label className=" cursor-pointer items-center border bg-transparent rounded-2xl p-2 text-xl text-gray-600 flex justify-center gap-2">
              <input type="file" className="hidden" onChange={uploadPhoto}/>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </label>
            </div>
            {preInput("Description", "Description about your Place/Location")}

            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Description"
            ></textarea>
            {preInput("Perks", "Select All the perks of your Place/Location")}

            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <Perks selected={Perks} onChanged={setPerks} />
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
