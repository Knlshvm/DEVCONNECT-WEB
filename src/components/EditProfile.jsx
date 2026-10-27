import React, { use, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const userProfile = true;

  const hasChanges =
    firstName !== user.firstName ||
    lastName !== user.lastName ||
    Number(age) !== Number(user.age) ||
    gender !== user.gender ||
    about !== user.about ||
    photoUrl !== user.photoUrl;

  if (!user) return null;

  const dispatch = useDispatch();

  const handleProfileEdit = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit/details",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
      console.log(error);
    }
  };
  const handleGenderSelectItem = (item, event) => {
    setGender(item);
    event.currentTarget.closest("details").open = false;
  };
  return (
    <div className="flex justify-center my-5 gap-8 ">
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="card bg-base-200 w-96 shadow-lg border border-base-300">
          <div className="card-body gap-5">
            <h2 className="card-title text-2xl justify-center">Edit Profile</h2>

            <div>
              <label className="label text-sm">First Name</label>
              <input
                type="input"
                className="input input-bordered w-full bg-base-100"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label className="label text-sm">Last Name</label>
              <input
                type="input"
                className="input input-bordered w-full bg-base-100"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="label text-sm">Age</label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="label text-sm">Gender</label>

              <details className="dropdown">
                <summary className="btn m-1">
                  {gender || "Select Gender"}
                </summary>

                <ul className="menu dropdown-content bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm">
                  {["male", "female", "others"].map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={(e) => handleGenderSelectItem(item, e)}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            <div>
              <label className="label text-sm">About</label>
              <textarea
                className="textarea"
                type="input"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              >
                {about}
              </textarea>
            </div>
            <div>
              <label className="label text-sm">Profile Image URL</label>

              <label className="input input-bordered validator flex items-center gap-2 w-full bg-base-100">
                <svg
                  className="h-4 w-4 opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>

                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="grow"
                />
              </label>

              <p className="validator-hint">Please enter a valid image URL.</p>
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button
              className="btn btn-primary w-full mt-2"
              onClick={handleProfileEdit}
              disabled={!hasChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <UserCard
        feed={{ firstName, lastName, age, gender, age, about, photoUrl }}
        userProfile={userProfile}
      />

      {toast && (
        <div className="toast toast-top toast-center z-9999">
          <div className="alert alert-success">
            <span>Profile updated Suceessfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
