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
a. Users can create a blog with the following attributes:
i. Title: Required.
ii. Content: Required.
iii. Category: A string to categorize the blog (e.g., Technology, Health, Travel).
2. View Blogs:
a. b. 3. Ownership:
a. Users can view all blogs in the system.
Provide a filter feature to filter blogs by category.
Users can edit or delete only their own blogs.
Database
• The choice of the database (e.g., MongoDB, PostgreSQL, MySQL) is up to the implementer.
C2 General
• Tables/collections should include:
o Users: To store user data (email, hashed password, name).
o Blogs: To store blog data (title, content, category, owner ID).
API Requirements
Authentication APIs
1. POST /signup
a. Input: Email, password, name.
b. Output: Success or error message.
2. POST /login
a. Input: Email, password.
b. Output: JWT token or error message.
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

