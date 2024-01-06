import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function () {
  const { id } = useParams();
  const [singleplace, setSinglePlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setSinglePlace(response.data);
    });
  }, [id]);
  if (!singleplace) return "";


  if(showAllPhotos){
    return(
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
       <div>
        <h2 className="text-3xl">Photos of {singleplace.title}</h2>
        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex py-2 px-4 shadow shadow-gray-500 text-black rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

          Close Photos
        </button>
       </div>
        {singleplace?.photos?.length > 0 && singleplace.photos.map(photo => (
          <div>
            <img src={'http://localhost:4000/uploads/'+ photo} alt="" />
          </div>
        ))} 
        </div>
        
      </div>
    );
  }
  return (

    <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8 ">
        <h2 className="text-3xl">{singleplace.title}</h2>
      <a className="flex gap-2 my-3 font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+ singleplace.address}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>

        {singleplace.address}
      </a>
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
            <div>
            {singleplace.photos?.[0] && (
                <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/'+ singleplace.photos[0]} alt="" />
            )}
            </div>
            
        </div>
        <div className="grid ">
        {singleplace.photos?.[1] && (
                <img  className="aspect-square object-cover" src={'http://localhost:4000/uploads/'+ singleplace.photos[1]} alt="" />
            )}
            <div className="overflow-hidden">
            {singleplace.photos?.[2] && (
                <img  className="aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/'+ singleplace.photos[2]} alt="" />
                
            )}
          
            </div>
       
            
        </div>
        
      </div>
      <div className="">
      <button onClick={() => setShowAllPhotos(true)} className="flex mt-4 bottom-2 gap-2 right-10 py-2 px-4 bg-primary text-white rounded-2xl shadow-md shadow-gray-500  ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

        show more photos</button>
      </div>

      <div className="my-4">
        <h2 className="font-semibold text-2xl" > Description</h2>
        {singleplace.description}
      </div>
      <div className="grid grid-cols-3">
              <div>
                <b>Check in : </b> {singleplace.checkInTime} <br/>
              </div>
              <div>
                <b>Check out : </b> {singleplace.checkOutTime} <br/>
              </div>
      </div>
     
    </div>
  );
}
