const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/config/.env" });
const app = express();
const User = require("./models/UserModel");

//MiddleWares
app.use(express.json()); //body parser

//Get method
app.get("/", (req, res) => {
  res.send("this is home page were we gonna show all users");
});

//Posting a new user
app.post("/", async (req, res) => {
  const user = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    dateOfBirth: req.body.dateOfBirth,
    Email: req.body.Email,
  });
  console.log(user);
  try {
    const saved = await user.save();
    res.json(saved);
  } catch (error) {
    res.json({ message: error });
  }
});

//Updating user's Last Name
app.patch("/:usersId", async (req, res) => {
  try {
    const updatepost = await User.updateOne(
      { _id: req.params.usersId },
      { $set: { LastName: req.body.LastName } }
    );
    console.log(req.body.LastName);
    res.json(updatepost);
  } catch (error) {
    res.json({ message: error });
  }
});

//Deleting user
app.delete("/:usersId", async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.usersId });
    res.json(removedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

//Connecting to DB
mongoose.connect(
  process.env.DATA_BASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("connected to Data Base");
  }
);

app.listen(process.env.PORT);
