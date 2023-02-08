import express from "express";
import csrf from "csurf";
import cors from "cors";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import propiedadesRoutes from "./routes/propiedadesRoutes.js";
import db from "./config/db.js";

// App
const app = express();

// Cors
app.use(cors());

// body parser
app.use(express.json());

// Enable reading of form data
app.use(express.urlencoded({ extended: true }));

// Enable cookie parser
app.use(cookieParser());

// Enable CSRF
// app.use(csrf({ cookie: true }));

// Database conection
const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

// Routing
app.use("/auth", usuarioRoutes);
app.use("/", propiedadesRoutes);

// Pug
// app.set("view engine", "pug");
// app.set("views", "./views");

// Public folder
app.use(express.static("public"));

// try react
app.get("/api", (req, res) => {
  res.json({ message: "Hodddddsad dsa !" });
});



// Port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
