import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

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


  function inputHeader(text){
    return (
      <h2 className="text-2xl mt-4 ">{text}</h2>
    );
  }

  function inputDescription(text){
    return(
      <p className="text-gray-500 text-sm">
        {text}
    </p>
    );
  }

  function preInput(header,description){
    return(
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
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
            {preInput('title','Title for your place?location . need to be short')}
            <input
              type="text"
              placeholder="title , for example : My new villa"
            />
            {preInput('address','Address of your PLace/Location')}
            <input type="text" placeholder="Address" />
            {preInput('photos','Add your place/location photos')}
          
            <div className="flex gap-2">
              <input type="text" placeholder="Add photos using a Link ...." />
              <button className="bg-gray-300 px-4 rounded-2xl">
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-3 grid grid-cols-3 md:grid-cols4 lg:grid-cols-6">
              <button className="border bg-transparent rounded-2xl p-8 text-xl text-gray-600 flex justify-center gap-2">
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
              </button>
            </div>
            {preInput('Description','Description about your Place/Location')}
            
            <textarea
              className="w-full h-32"
              placeholder="Description"
            ></textarea>
            {preInput('Perks','Select All the perks of your Place/Location')}
           
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer" >
                <input type="checkbox" />
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
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>

                <span>Free Parking</span>
              </label >
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer"  >
                <input type="checkbox" />
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
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>

                <span>Free Wi-fi</span>
              </label >
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer"  >
                <input type="checkbox" />
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
                    d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                  />
                </svg>

                <span>Pets</span>
              </label >
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer"  >
                <input type="checkbox" />
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
                    d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>

                <span>TV</span>
              </label >
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer"  >
                <input type="checkbox" />
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
                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                  />
                </svg>

                <span>AC</span>
              </label >
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer"  >
                <input type="checkbox" />
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
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>

                <span>Private Entrance</span>
              </label >
            </div>
            {preInput('Extra Info','If have any extra info/rules')}
            
            <textarea
              className="w-full h-32"
              placeholder="Extra Info"
            ></textarea>
            {preInput('Check in&out times','add check in and out times , and cleaning time and etc.')}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in Time</h3>
                <input type="text" placeholder="08:00" />
              </div>
              <div>
              <h3 className="mt-2 -mb-1">Check Out Time</h3>
              <input type="text" placeholder="22:00" />
              </div>
              <div>
              <h3 className="mt-2 -mb-1">Max NUmber of guests</h3>
              <input type="text" placeholder="10" />
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
