import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feed);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const fetchData = async () => {
    if (feedData) return;
    try {
      setLoader(true);
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res.data, "res");
      dispatch(addFeed(res.data));
      setLoader(false);
    } catch (err) {
      setError(err?.response?.data || "something went wrong ");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loader === true) {
    return (
      <div className="flex items-center justify-center py-20 font-extrabold text-blue-600">
        {" "}
        loading feed ...
      </div>
    );
  }
  return feedData ? (
    <div className="flex items-center justify-center py-10">
      <UserCard feed={feedData.data[0]} />
    </div>
  ) : (
    <p className="text-red-500 font-semibold">{error}</p>
  );
};

export default Feed;
