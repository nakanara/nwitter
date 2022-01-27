import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {


  const hitory = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState("");

  const onLogOutClick = () => {
    authService.signOut();
    hitory('/');
  }

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewDisplayName(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  }

  // 컴포넌트 로딩 후 실행
  /*
  useEffect(() => {
    getMyNweets();
  }, []);

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "asc")
      .get();

      console.log(nweets.docs.map((doc) => doc.data()));
  };
  */
  return ( 
    <>
      <form onSubmit={onSubmit}>

        <input 
          onChange={onChange} 
          type="text" 
          placeholder="Display name" 
          value={newDisplayName}
          />
          
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}
export default Profile;