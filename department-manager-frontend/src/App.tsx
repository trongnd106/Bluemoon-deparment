import HomePage from "./pages/home-page/HomePage";
import LoginSignUp from "./pages/login-signup/LoginSignUp";
import DashBoard from "./pages/dashboard/DashBoard";
import { AuthCallbackComponent } from "./services/AuthCallback";
import { GlobalStyles } from "./GlobalStyles";
import Notification from "./components/Notification";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/auth/google/callback" element={<AuthCallbackComponent />} />
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signin" element={<LoginSignUp />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<DashBoard />}></Route>
          </Route>
        </Routes>
      </Router>
      <Notification />
    </>
  );
};

export default App;
