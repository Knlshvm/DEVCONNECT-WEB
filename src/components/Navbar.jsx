import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="navbar shadow-sm bg-base-300 fixed top-0">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl"> 💻 Dev Connect </a>
      </div>
      {user && (
        <div className="flex gap-2 items-center">
          <p>
            Welcome back,{" "}
            {user.data.firstName.charAt(0).toUpperCase() +
              user.data.firstName.slice(1).toLowerCase()}
          </p>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.data.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
