import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeFeed } from "../utils/feedSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-300 fixed top-0 z-50 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          Dev Connect
        </Link>
      </div>
      {user && (
        <div className="flex gap-4 items-center pr-4">
          <p className="text-sm text-base-content/70 hidden sm:block">
            Welcome Back,{" "}
            {user.data.firstName.charAt(0).toUpperCase() +
              user.data.firstName.slice(1).toLowerCase()}
          </p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-base-300 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
            >
              <img
                alt="user photo"
                src={user.data.photoUrl}
                className="w-full h-full object-cover"
              />
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-200 rounded-lg z-1 mt-3 w-52 p-2 shadow-md border border-base-300"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
