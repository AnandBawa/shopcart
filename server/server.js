import "express-async-errors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import {
  localAuthStrategy,
  githubAuthStrategy,
} from "./utils/passportConfig.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Routers
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import orderRouter from "./routes/orderRouter.js";
import userRouter from "./routes/userRouter.js";

// Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { isLoggedIn } from "./middleware/authMiddleware.js";

// Models
import User from "./models/userModel.js";

dotenv.config();
const app = express();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB connection
const port = process.env.PORT || 3000;
try {
  await mongoose.connect(process.env.MONGO_DB_URL);
  app.listen(port, () => {
    console.log(`MongoDB Server connected on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

// Express Session config
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_DB_URL,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.SECRET,
  },
});
store.on("error", (e) => console.log("MongoDB Session Store Error", e));

const sessionConfig = {
  store,
  name: "sesh",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: Date.now() + 1000 * 60 * 60 * 24,
    maxAge: 1000 * 60 * 60 * 24,
  },
};

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../app/dist")));

app.set("trust proxy", 1);
app.use(express.json());
app.use(session(sessionConfig));

// Configuring Passport.js
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: "phone" }, localAuthStrategy));
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    githubAuthStrategy
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "blob:", "data:", "https://res.cloudinary.com"],
      },
    },
  })
);
app.use(mongoSanitize());

// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/products/:id/reviews", reviewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", isLoggedIn, orderRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../app/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not found" });
});

app.use(errorHandlerMiddleware);
