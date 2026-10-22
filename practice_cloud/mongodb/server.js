const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("."));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch(err => console.log(err));

const Student = mongoose.model("Student", {
    name: String,
    department: String
});
app.get("/", (req, res) => {
    res.send("CampusShare Server is Running Successfully!");
});

app.post("/add", async (req, res) => {
    await Student.create(req.body);
    res.send("Student saved successfully!");
});

app.listen(3030, () => {
    console.log("Server running at http://localhost:3030");
});
