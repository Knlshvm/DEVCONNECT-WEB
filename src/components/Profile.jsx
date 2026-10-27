import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((state) => state.user);

  return (
    <>
      {userData?.data && (
        <div>
          <EditProfile user={userData.data} />
        </div>
      )}
    </>
  );
};

export default Profile;
