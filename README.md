# Blog Management Task

## Project Requirements
### User Authentication
1. Sign Up:
    - Users must sign up using an email, password, and name.
    - Email: Must follow standard email format.
    - Password: Must meet complex requirements (e.g., minimum 8 characters, including letters and numbers).
  
2. Sign In:
  - Users can log in using their email and password.
  - Ensure validation for credentials.
### Blog Management
1. Create a Blog:
    - Users can create a blog with the following attributes:
        - Title: Required.
        - Content: Required.
        - Category: A string to categorize the blog (e.g., Technology, Health, Travel).
2. View Blogs:
    - Users can view all blogs in the system.
    - Provide a filter feature to filter blogs by category.
    - Users can edit or delete only their own blogs.

### API Requirements
## Authentication APIs
1. POST /signup
    - Input: Email, password, name.
    - Output: Success or error message.
2. POST /login
    - Input: Email, password.
    - Output: JWT token or error message.
## Blog APIs
1. POST /blogs
    - Input: Title, content, category.
    - Output: Success or error message.
2. GET /blogs
    - Input: Optional category filter.
    - Output: List of blogs.
3. PUT /blogs/:id
    - Input: Blog ID, updated title/content/category.
    - Output: Success or error message.
4. DELETE /blogs/:id
    - Input: Blog ID.
    - Output: Success or error message.

