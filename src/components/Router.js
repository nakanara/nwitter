import { useState } from "react";

// react-router-dom 6.0버전으로 변경 switch -> routes 
// import { HashRouter as Router, Routes,  Route } from "react-router-dom";
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
import { HashRouter as Router, Routes,  Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <Route exact path="/" element={<Home/>}>
          </Route>
        ): (
          <Route exac path="/" element={<Auth/>}>
          </Route>
        )}
      </Routes>
    </Router>
  );
};


export default AppRouter;

