import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  console.log(user);

  return (
    <div>
      <h1>Bara de navigatie</h1>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>

      <div>
        {user && (
          <div >
            <p>Nume: {user?.displayName}</p>
            <img src={user?.photoURL} width="111" height="111" />
            <button onClick={signUserOut}>Iesi din cont</button>
          </div>
        )}
      </div>
    </div>
  );
};