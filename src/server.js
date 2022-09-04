"use strict";
const express = require("express");
const app = express();
const path = require("path");
const userRoute = require("./Routes/Users");
const quizzesRoute = require("./Routes/Quizzes");


app.use(express.static(path.join(__dirname, "/public/")));

// Middleware
app.use(express.json());
app.use("/API/users", userRoute);
app.use("/API/quizzes", quizzesRoute);

app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static('build')));

app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/client/build'))
    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Listening to APIs
app.listen(process.env.PORT || 8000, () =>
    console.log("Listening on Port 8000")
);
