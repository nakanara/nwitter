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
    <div>
      {editing? (
        <>
          <form onSubmit={onSubmit}>
            <input value={newNweet} onChange={onChange} required />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="100px" height="100px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}      
        </>
      )}
    </div>
  );
};

export default Nweet;