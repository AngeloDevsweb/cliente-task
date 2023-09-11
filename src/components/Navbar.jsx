import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold">Task manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>welcome {user.username}</li>
            <li>
              <Link to="/tasks/new">Add task</Link>
            </li>
            <li>
              <Link to="/login" onClick={()=>logout()}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
