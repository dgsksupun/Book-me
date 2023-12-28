import axios from "axios";
import { useState } from "react";

export default function({addedPhotos,onChange}){
    
    const [photoLink, setPhotoLink] = useState("");

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
        onChange(prev => {
          return [...prev, filename];
        });
        setPhotoLink('');
      }
    
      function uploadPhoto(evn) {
        const files = evn.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
          headers: {'Content-type':'multipart/form-data'}
        }).then(resp => {
          const {data:filenames} = resp;
          onChange(priv => {
            return [...priv, ...filenames];
          });
        })
      }
    return(
        <>
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
                <div className="h-32 flex" key={link}>
                <img className="rounded-2xl w-full object-cover " src={'http://localhost:4000/uploads/'+ link} alt="" />
              </div>
              ))}
              <label className="h-32 cursor-pointer items-center border bg-transparent rounded-2xl p-2 text-xl text-gray-600 flex justify-center gap-2">
              <input type="file" multiple className="hidden" onChange={uploadPhoto} />
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
        </>
    );
}