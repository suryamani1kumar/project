import { useContext } from "react";
import { AuthContext } from "../App";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container mt-3">
      <h2>Welcome {user?.user?.fullname}</h2>
      <p>Email: {user?.user?.email}</p>
    </div>
  );
};

export default Profile;
