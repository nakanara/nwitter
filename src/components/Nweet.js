import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbase";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {

  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async (event) => {
    event.preventDefault();

    const ok = window.confirm('삭제하시겠습니까?');
    if(ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      if(nweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(nweetObj.attachmentUrl).delete(); // 파일 삭제
      }
    }
  };

  const toggleEditing = (event) => {
    setEditing((prev) => !prev);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewNweet(value);

  };

  const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
    setEditing(false);
  };

  return (
    <div className="nweet">
      {editing? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input 
              value={newNweet} 
              onChange={onChange} 
              required 
              placeholder="Edit your nweet"
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn"/>
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            Cancle
          </button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="100px" height="100px" />
          )}
          {isOwner && (
            <div className="nweet_actions">
              <button onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          )}      
        </>
      )}
    </div>
  );
};

export default Nweet;