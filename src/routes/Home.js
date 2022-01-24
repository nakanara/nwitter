import Nweet from "components/Nweet";
import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = ({ userObj } ) => {
    const [nweet, setNweet] = useState("");
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

    const onSubmit = async (event) => {
        event.preventDefault();

        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });

        setNweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNweet(value);
    };

    
    return (
        <>
            <form onSubmit={onSubmit}>
                
                <input 
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    />
                <input type="submit" value="Nweet" />
                
            </form>

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