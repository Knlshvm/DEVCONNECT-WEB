import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequets } from "../utils/requestSlice";
import useToast from "../utils/useToast";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const { showToast, ToastComponent } = useToast();
  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (error) {}
  };

  const handleRequests = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequets(requestId));
      showToast(
        status === "accepted" ? "Request accepted!" : "Request rejected",
        status === "accepted" ? "success" : "error",
      );
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <>
      {!requests ? null : requests.length === 0 ? (
        <h1 className="text-center text-2xl mt-10 text-base-content/60">
          No requests yet
        </h1>
      ) : (
        <div className="flex flex-col items-center gap-6 py-10">
          <h1 className="text-2xl font-bold">Requests</h1>
          {requests.map((request) => {
            const { _id, firstName, lastName, age, gender, about, photoUrl } =
              request.fromUserId;
            return (
              <div
                key={_id}
                className="card card-side bg-base-200 shadow-lg border border-base-300 w-lg max-w-[95vw]"
              >
                <figure className="w-28 shrink-0">
                  <img
                    src={photoUrl}
                    alt={firstName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body py-4">
                  <h2 className="card-title text-lg">
                    {firstName} {lastName}
                  </h2>
                  <div className="flex gap-2 text-sm text-base-content/60">
                    {age && <span>{age}</span>}
                    {gender && <span>{gender}</span>}
                  </div>
                  {about && (
                    <p className="text-sm text-base-content/60 max-h-20 overflow-y-auto whitespace-pre-wrap">
                      {about}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-2 pr-4">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleRequests("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-outline btn-error btn-sm"
                    onClick={() => handleRequests("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {ToastComponent}
    </>
  );
};

export default Requests;
