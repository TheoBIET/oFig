require("dotenv").config();

const express = require("express");
const router = require("./app/router");
const session = require("express-session");
const PORT = process.env.PORT || 5000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./app/public"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

// Middlewarer Utilitaire pour rendre dispo le tableau des bookmarks à toute les vues
// On en profite pour initialiser ce tableau s'il n'existe pas encore
app.use((req, res, next) => {
    if (!req.session.bookmarks) {
        req.session.bookmarks = [];
    }
    res.locals.bookmarks = req.session.bookmarks
    next();
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Server Listening at http://localhost:${PORT}`);
});
