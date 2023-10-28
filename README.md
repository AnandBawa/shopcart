# Shopping App

ShopCart is a full-stack shopping application based on MERN stack. It is designed to be responsive and interactive and has most of the functionality you expect from a shopping website.

**Features**

1. Dynamic Search of Product Catalog with Pagination
2. Interactive Cart
3. Easy Checkout
4. Order History
5. Add/Edit/Delete and view other Reviews
6. Add/Edit/Delete Addresses and Payment Methods
7. Update Personal Info and add an Avatar
8. Toggle Light/Dark Mode
9. Responsive Design to work on most screens

> [Deployed App](https://shopcart-2hr3.onrender.com/)

**Front-End**

- uses React v18+ and is built around React Router v6.4+ framework along with React Query v4+ for caching. Tailwind is used heavily for CSS.

**Back-End**

- built on Express framework for Node. Passport-Local along with Argon2 is used for user authentication and password hashing. Mongoose is used to model and query MongoDB. Joi for Schema validation and Express Session for session management.

---

#### Setup

1. Clone the repo and navigate to "server" folder
2. `npm run setup-project` to set up both the server and client (short for below command which installs pnpm which is then used for package installations)

   ```sh
   npm install -g pnpm && pnpm install && cd .. && cd app && pnpm install
   ```

3. `pnpm run dev` to spin up both the server and client (short for below command)

   ```sh
   concurrently --kill-others-on-fail \"pnpm run server\" \"pnpm run app\"
   ```

4. `http://localhost:5173/` to open the app

**Environment Variables:** these need to be saved in an ".env" file inside "server" folder

1. MONGO_DB_URL
2. SECRET
3. CLOUDINARY_NAME
4. CLOUDINARY_API_KEY
5. CLOUDINARY_API_SECRET
6. NODE_ENV

The products database JSON file can be downloaded here:
[products.json](https://drive.google.com/file/d/1ACLt0boVY9EyIKsnO5WS7jUaZ2FGQeJt/view?usp=sharing). Add as a collection in your database.

With the above database and environment variables, the app can be deployed on your server.

---

**Features to be added later**

- Save logged-in user's cart on server
- Pagination for Orders and Reviews
- Admin Role & Test User
- Add/Edit/Remove Products
- Add an image carousel for product with multiple images
