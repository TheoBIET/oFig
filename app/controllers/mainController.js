const dataMapper = require("../dataMapper");
const pluralize = require('pluralize-fr');

const mainController = {
    getTotalByCategories: (req, res, next) => {
        dataMapper.getTotalFigurinesByCategory((error, cumuls) => {
            if (error) {
                console.error(error);
            } else {
              const cumulsModifies = cumuls.map(cumul => {
                cumul.categoryLabel = 'Les ' + pluralize(cumul.category);
                return cumul
              });
                res.locals.cumuls = cumulsModifies;
                next();
            }
        });
    },

    getFigurinesByCategory: (req, res, next) => {
      const category = req.params.category;
      dataMapper.getAllFigurinesByCategory(category, (error, figurines) => {
        error
          ? console.error(error)
          : res.render('accueil', {figurines})
      })
    },

    // méthode pour la page d'accueil
    homePage: (req, res) => {
        dataMapper.getAllFigurines((error, figurines) => {
            error
                ? console.log(error)
                : res.render("accueil", { figurines });
        });
    },

    // méthode pour la page article
    articlePage: (req, res) => {
        const figurineId = parseInt(req.params.id, 10);
        dataMapper.getOneFigurine(figurineId, (error, figurine) => {
            if (error) {
                console.error(error);
            } else {
                dataMapper.getReviews(figurineId, (error, reviews) => {
                    if (error) {
                        console.error(error);
                    } else {
                        res.render("article", { figurine, reviews });
                    }
                });
            }
        });
    },
};

module.exports = mainController;
