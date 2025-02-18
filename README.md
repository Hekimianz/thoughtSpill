## ThoughtSpill - A Book Blog with a Split Personality

This project is a book blog called ThoughtSpill, built with a separate backend and two distinct frontends. One frontend is for public consumption of blog posts, while the other is a private interface for the author to manage the blog. This structure demonstrates the power and flexibility of decoupling frontend and backend development.

### Features

* **Backend (API)**
    * RESTful API built with Express.js and Prisma
    * PostgreSQL database for storing blog posts, comments, and user data
    * JWT-based authentication for securing author-specific routes
    * Endpoints for:
        * Creating, reading, updating, and deleting blog posts
        * Publishing and unpublishing posts
        * Managing comments

* **Public Frontend**
    * Built with React and React Router
    * Displays blog posts and comments
    * Allows users to read and comment on posts

* **Private Frontend (Admin)**
    * Built with React and React Router
    * Secure access for the author using JWT authentication
    * Features:
        * List of all posts with publication status
        * Publish/unpublish posts
        * Create new posts (with optional rich text editor)
        * Manage comments (edit/delete)

### Project Structure

The project is organized into three main parts:

* `backend`: Contains the Express.js API and Prisma schema.
* `frontend-pub`: Contains the React app for the public-facing blog.
* `frontend-priv`: Contains the React app for the admin interface.

### Deployment

* The backend is deployed on Render.
* The public frontend is deployed on Netlify and accessible at: https://thoughtspill.netlify.app/
* The admin frontend is deployed on Netlify.
* The PostgreSQL database is hosted on Neon.

### About ThoughtSpill

ThoughtSpill is a book blog run by Aram Hekimian Guerrero, a software engineer with a passion for reading. The blog features Aram's personal thoughts and opinions on books and movies, without any ratings or scores.

### Disclaimer

This project was created as a learning exercise and may not be suitable for production use without further development and security considerations.
