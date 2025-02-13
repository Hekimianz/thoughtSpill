import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Post from "./pages/Post";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
