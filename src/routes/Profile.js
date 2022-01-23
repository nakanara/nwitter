import { authService } from "fbase";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {

  const hitory = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    hitory('/');
  }

  return ( 
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}
export default Profile;