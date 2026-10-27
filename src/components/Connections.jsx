import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const getConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/connection", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnection(res?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    getConnection();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="text-center text-2xl mt-10 text-base-content/60">
        No connections yet
      </h1>
    );

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <h1 className="text-2xl font-bold">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          connection;
        return (
          <div
            key={_id}
            className="card card-side bg-base-200 shadow-lg border border-base-300 w-[32rem] max-w-[95vw]"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
