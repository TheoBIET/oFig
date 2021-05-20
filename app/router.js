const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const bookmarksController = require('./controllers/bookmarksController');

router.get('/', mainController.homePage);

router.get('/article/:id', mainController.articlePage);

router.get('/bookmarks', bookmarksController.bookmarksPage );

router.get('/bookmarks/add/:id', bookmarksController.addBookmark);

router.get('/bookmarks/delete/:id', bookmarksController.deleteBookmark);

module.exports = router;