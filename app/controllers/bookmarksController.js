const { request } = require("express");
const dataMapper = require("../dataMapper");

const bookmarksController = {
    bookmarksPage: (req, res) => {
        res.render("favoris");
    },

    addBookmark: (req, res) => {
        const idFromUrl = parseInt(req.params.id, 10);
        const found = req.session.bookmarks.find(
            (figurine) => figurine.id === idFromUrl
        );
        if (!found) {
            dataMapper.getOneFigurine(req.params.id, (error, data) => {
                if (error) {
                    res.redirect("404");
                } else {
                    req.session.bookmarks.push(data);
                    res.redirect("/bookmarks");
                }
            });
        }else {
          res.redirect("/bookmarks");
        }
    },

    deleteBookmark: (req, res) => {
      const idFromUrl = parseInt(req.params.id, 10);

      // On va vouloir garder dans notre tableau de favoris tous les éléments SAUF celui dont l'id sera égal à idFromURL
      // La plus adaptée ici est d'utiliser la méthode filter des tableaux
      // Cette méthode va prendre en paramètre une fonction qui devra renvoyer :
      // - True si on veut conserver l'élément
      // - False si on veut s'en débarasser
      req.session.bookmarks = req.session.bookmarks.filter(figurine => figurine.id !== idFromUrl);
      res.redirect('/bookmarks');
    }
};

module.exports = bookmarksController;
