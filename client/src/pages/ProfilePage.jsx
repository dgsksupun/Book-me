import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [tohome, setTohome] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setTohome("/");
  }

  //check if user data is ready or not and show loading if not ready
  if (!ready) {
    return "Loading...";
  }

  //check if user is logged in or not and redirect to login page if not logged in
  if (ready && !user && !tohome) {
    return <Navigate to={"/login"} />;
  }


  if (tohome) {
    return <Navigate to={tohome} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-5">
            Log out
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
