# ShopCart

ShopCart is a full-stack shopping application based on MERN stack. It is designed to be responsive and interactive and has most of the functionality you expect from a shopping website.

> [Deployed App](https://shopcart-2hr3.onrender.com/)  
> (Render's free-tier instances spin down with inactivity. So first load of the app can take a few minutes as the render server spins up)

**Features**

1. Dynamic Search of Product Catalog with Pagination
2. Interactive Cart
3. Easy Checkout
4. Order History
5. Add/Edit/Delete a Review of product ordered before and view other user Reviews
6. Add/Edit/Delete Addresses and Payment Methods
7. Update Personal Info and add an Avatar
8. Toggle Light/Dark Mode
9. Responsive Design to work on most screens
10. GitHub Login option

**Front-End**

- uses React v18+ and is built around React Router v6.4+ framework along with React Query v4+ for caching. Tailwind is used heavily for CSS.

**Back-End**

- built on Express framework for Node.js. Express Session for session management. MongoDB is the NoSQL database that is used. Mongoose is used for data modeling and manipulation. Joi is used for data validation. Passport-Local along with Argon2 is used for user authentication and password hashing. Passport-Github strategy allows users to use a social login option of Github.

---

**Features to be added later**

- Save logged-in user's cart on server
- Pagination for Orders and Reviews
- Admin Role & Test User
- Add/Edit/Remove Products
- Add an image carousel for product with multiple images
