import { useEffect, useState } from "react";
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
      dispatch(addFeed(res.data));
      setLoader(false);
    } catch (err) {
      setError(err?.response?.data || "something went wrong ");
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loader === true) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="card bg-base-200 w-96 shadow-lg border border-base-300">
          <div className="h-72 bg-base-300 animate-pulse" />
          <div className="card-body gap-3">
            <div className="h-5 w-3/4 bg-base-300 rounded animate-pulse" />
            <div className="h-4 w-full bg-base-300 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-base-300 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
  return feedData ? (
    <div className="flex items-center justify-center py-10">
      <UserCard feed={feedData?.data[0]} />
    </div>
  ) : (
    <div className="flex items-center justify-center py-20">
      <p className="text-error">{error}</p>
    </div>
  );
};

export default Feed;
