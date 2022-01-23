
// react-router-dom 6.0버전으로 변경 switch -> routes 
// import { HashRouter as Router, Routes,  Route } from "react-router-dom";
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
//import { HashRouter as Router, Routes,  Route } from "react-router-dom";
import { HashRouter as Router, Routes,  Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn }) => {
  
  return (
    <Router>
      {isLoggedIn && <Navigation />}

      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/profile" element={<Profile/>} />  
          </>
          
        ): (
          <Route exact path="/" element={<Auth/>} />
        )}

      </Routes>
    </Router>
  );
};

export default AppRouter;

