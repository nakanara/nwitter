import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj } ) => {
    const [nweets, setNweets] = useState([]);
    
    // useEffect, 인자로 []를 넘겨주는 것은 두 번 실행하는 것을 방지하기 위함
    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id, 
                ...document.data(),
            }));

            setNweets(newArray);
        })
    }, []);

    
    return (
        <>
            
            <NweetFactory userObj={userObj} />

            <div>
            {nweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} 
                    isOwner={nweet.creatorId === userObj.uid }
                />
            ))}
            </div>
        </>
    );
};

export default Home;