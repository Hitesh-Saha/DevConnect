import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import users from "./routes/api/users.js";
import profile from "./routes/api/profile.js";
import posts from "./routes/api/posts.js";
import auth from "./routes/api/auth.js";
dotenv.config();

const db = process.env.DB_URL;
const PORT = process.env.APP_PORT || 5000;
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express();

// Database Connnection
connectDB(db);

app.use(express.json({ extended: false }));
app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("API running"));

// Defining the routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(PORT, () => console.log(`Server is running at: ${PORT}`));
