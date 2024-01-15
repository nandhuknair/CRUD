const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const session = require("express-session");

const homeRouter = require("./routers/homeRouter");
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");
const logoutRouter = require("./routers/logoutRouter");
const adminRouter = require("./routers/adminRouter");
const adminLogin = require("./routers/adminLogin");
const editRouter = require("./routers/editRouter");
const adduserRoute = require("./routers/add");

mongoose
  .connect("mongodb://localhost:27017/crudData")
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.log("ERROR due to : ", err));

app.use((req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/home", homeRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);
app.use("/admin", adminRouter);
app.use("/adminlogin", adminLogin);
app.use("/edit", editRouter);
app.use("/add", adduserRoute);
app.get("/", (req, res) => res.render("index"));
app.get("*", (req, res) => res.status(400).send("Error found 404"));

const PORT = process.env.port || 9000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server running successfully on the port ${PORT}`);
});

