import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  // useEffect 2번째 인자가 []가 아닐 경우 2번 실행 
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      if(user) {
        console.log('true');
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>  
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializaing..."}      
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
