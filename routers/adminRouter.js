const express = require("express");
const router = express.Router();
const User = require("../models/homeSchema");

const auth = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.redirect("/adminlogin");
  }
};

router.get("/", auth, async (req, res) => {
  try {
    const userData = await User.find({});
    res.render("admin", { user: userData });
  } catch (error) {
    console.log("Error occur by fetching the data", error);
  }
});

router.get("/:search", auth, async (req, res) => {
  console.log(req.query);
  req.session.admin = true;
  try {
    const searchUser = await User.find({ name: req.query.search });
    if (searchUser) {
      res.render("admin", { user: searchUser });
    } else {
      res.render("admin", { user: "" });
    }
  } catch (err) {
    console.log("Error while performing a search of user", err);
  }
});

module.exports = router;

