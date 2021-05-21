const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const bookmarksController = require('./controllers/bookmarksController');

router.get('/', mainController.getTotalByCategories, mainController.homePage);

router.get('/article/:id', mainController.getTotalByCategories, mainController.articlePage);

router.get('/bookmarks', bookmarksController.bookmarksPage );

router.get('/bookmarks/add/:id', bookmarksController.addBookmark);

router.get('/bookmarks/delete/:id', bookmarksController.deleteBookmark);

router.get('/figurines/:category', mainController.getTotalByCategories, mainController.getFigurinesByCategory);

module.exports = router;