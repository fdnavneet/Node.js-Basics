import { BrowserRouter as Router , Routes,Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";
function app(){
  return (

    <div>
      <h1>Image gallery</h1>
      <Router>
        <Routes>
          <Route path="/" element={<CreatePost />}/>
          <Route path="/allpost" element={<Feed />}/>
        </Routes>
      </Router>
    </div>
  )
}
export default app;