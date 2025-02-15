const base_url = import.meta.env.VITE_API_BASE_URL;
export const getPosts = async (searchTerm = "") => {
  try {
    let url = `${base_url}/api/posts`;
    if (searchTerm) {
      url += `?title=${encodeURIComponent(searchTerm)}`;
    }
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status ${response.status}`
      );
    }
    const { posts } = await response.json();

    return posts.reverse();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await fetch(`${base_url}/api/posts/${id}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status ${response.status}`
      );
    }
    const { post } = await response.json();
    return post;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const updatePost = async (id, post) => {
  try {
    const response = await fetch(`${base_url}/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // VERY IMPORTANT for JSON
      },
      credentials: "include",
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status ${response.status}`
      );
    }
    const book = await response.json();
    return book.book;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(`${base_url}/api/posts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP ERROR! status ${response.status}`
      );
    }
  } catch (err) {
    console.error("Error deleting book:", err);
    throw err;
  }
};

export const addPost = async (post) => {
  try {
    const response = await fetch(`${base_url}/api/posts`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error cretaing post:", err);
    throw err;
  }
};
