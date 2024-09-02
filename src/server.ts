import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import studentRoutes from "./routes/studentRoutes";
import dotenv from "dotenv";
import connectToDatabase from "./db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
connectToDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(studentRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

app.get("/", async (req: Request, res: Response) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Connect to MongoDB (if not already connected in another file)
