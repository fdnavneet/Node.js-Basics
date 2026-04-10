import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";
import CreateAccount from "./pages/CreateAccount";
import LogIn from "./pages/logIn";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { Authprovider } from "./context/Authcontext";
function app() {
  return (
    <div>
      {/* <h1>Image gallery</h1> */}
      <Authprovider>
      <Router>
        <Routes>
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/" element={<LogIn />} />
          <Route
            path="/CreatePost"
            element={
              <ProtectedRoutes>
                <CreatePost />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/allpost"
            element={
              <ProtectedRoutes>
                <Feed />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
      </Authprovider>
    </div>
  );
}
export default app;
