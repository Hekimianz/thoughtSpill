import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Post from "./pages/Post";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(false);
  return (
    <Router>
      <Header
        search={search}
        setSearch={setSearch}
        setPosts={setPosts}
        setLoadingPosts={setLoadingPosts}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={posts}
              setPosts={setPosts}
              loadingPosts={loadingPosts}
            />
          }
        />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
