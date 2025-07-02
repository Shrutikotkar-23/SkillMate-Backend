// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import sessionRoutes from "./routes/sessionRoutes.js";
// import userRoutes from "./routes/userRoutes.js"; // import userRoutes
// import notesRoutes from "./routes/notesRoutes.js";
// import cookieParser from "cookie-parser";

// app.use(cookieParser()); // ✅ this is required to read req.cookies.token


// // Load environment variables
// dotenv.config();

// // Check for MONGO_URI
// if (!process.env.MONGO_URI) {
//   console.error("Error: MongoDB URI is missing in environment variables.");
//   process.exit(1); // Exit the process with an error
// }

// // Connect to the database
// connectDb();

// const app = express();

// // Middleware for parsing JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //For signup, login
// app.use('/auth', authRoutes);

// app.use("/api/users", userRoutes); 

// app.use("/session", sessionRoutes);

// app.use("/notes", notesRoutes);

// // Root route

// app.get("/", (req, res) => {
//   res.status(200).send("Hello World!");
// });


// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.statusCode || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// export default app; // to use for testing

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // ✅ Import cookie-parser
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Check for MONGO_URI
if (!process.env.MONGO_URI) {
  console.error("Error: MongoDB URI is missing in environment variables.");
  process.exit(1); // Exit the process with an error
}

// Connect to MongoDB
connectDb();

const app = express();

// ✅ Use cors
app.use(cors({
  origin: "http://localhost:3000", // React frontend
  credentials: true,              // Needed for cookies
}));


// ✅ Middleware: body parsing and cookie parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ Add cookie-parser middleware AFTER express.json()

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/session", sessionRoutes);
app.use("/notes", notesRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
