import { useState } from "react";
import axios from "axios";
import useToast from "../utils/useToast";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ feed, userProfile }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { showToast, ToastComponent } = useToast();
  const dispatch = useDispatch();


  const handleSelectStatus = async (status, _id) => {
    console.log(status, _id, "api");
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      console.log(res, "res");
      dispatch(removeFeed(_id));
      showToast(
        status === "intrested"
          ? "connection request sent successfully"
          : "rejected the profile",
        status === "intrested" ? "sucess" : "error",
      );
    } catch (error) {
      showToast(`${error.response}|| something went wrong`, "error");
      console.log(error);
    }
  };
  if (!feed) return null;
  const { _id, firstName, lastName, photoUrl, about, age, gender } = feed;
  return (
    <>
      <div className="card bg-base-200 w-96 shadow-lg border border-base-300">
        <figure className="h-72 relative overflow-hidden bg-base-300">
          {!imgLoaded && (
            <div className="w-full h-full absolute inset-0 bg-base-300 animate-pulse" />
          )}
          <img
            src={photoUrl}
            alt="photo"
            className={`w-full h-full object-contain transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImgLoaded(true)}
          />
        </figure>
        <div className="card-body gap-3">
          <h2 className="card-title text-lg">{firstName + " " + lastName}</h2>
          {age && <span>{age}</span>}
          {gender && <span>{gender}</span>}
          <p className="text-sm text-base-content/60 max-h-24 overflow-y-auto whitespace-pre-wrap">
            {about}
          </p>
          {userProfile ? (
            <></>
          ) : (
            <div className="card-actions justify-center gap-4 mt-3">
              <button
                className="btn btn-outline btn-error btn-sm"
                onClick={() => handleSelectStatus("ignored", _id)}
              >
                Reject
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleSelectStatus("intrested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
      {ToastComponent}
    </>
  );
};

export default UserCard;
