import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Home from "./pages/Home";
import useAuthCheck from "./hooks/useAuthCheck";
import { attendeePrivateRoutes, organizerPrivateRoutes } from "./routes/routes";
import AttendeeOutlet from "./components/outlets/AttendeeOutlet";
import OrganizerOutlet from "./components/outlets/OrganizerOutlet";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "./pages/AboutUs";

function App() {
  const authCheck = useAuthCheck();

  return !authCheck ? (
    <p>Checking Authentication...</p>
  ) : (
    <div className="App">
      <ToastContainer
        position="top-right" // Ensures toast shows at the top-right of the screen
        autoClose={5000} // Auto-close after 5 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendee/*" element={<AttendeeOutlet />}>
            {attendeePrivateRoutes.map((atRoute) => (
              <Route
                path={atRoute.path}
                key={name}
                element={<atRoute.component />}
              />
            ))}
          </Route>
          <Route path="/organizer" element={<Home />} />
          <Route path="/organizer/*" element={<OrganizerOutlet />}>
            {organizerPrivateRoutes.map((orgRoute) => (
              <Route
                path={orgRoute.path}
                key={name}
                element={<orgRoute.component />}
              />
            ))}
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
