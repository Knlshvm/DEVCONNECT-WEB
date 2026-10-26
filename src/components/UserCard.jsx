import React from "react";

const UserCard = (props) => {
  const { firstName, lastName, photoUrl, about } = props.feed;
  return (
    <div className="card bg-base-300 w-96 shadow-2xl">
      <figure>
        <img src={photoUrl} alt="photo" className="py-10" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <div className="card-actions justify-center gap-5 mt-5">
          <button className="btn btn-primary">Interested</button>
          <button className="btn btn-secondary">Reject</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
