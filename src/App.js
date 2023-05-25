
// import { useEffect } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from "./pages/SignIn/SignIn";
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import SignUp from './pages/SignUp/SignUp';

const App = () => {

  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
