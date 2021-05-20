const dataMapper = require('../dataMapper');

const mainController = {

  // méthode pour la page d'accueil
  homePage: (req, res) => {
    dataMapper.getAllFigurines((error, data) => {
      error
          ? res.redirect('404')
          : res.render('accueil', {figurines: data});
    })
  },

  // méthode pour la page article
  articlePage: (req, res) => {
    dataMapper.getOneFigurine(parseInt(req.params.id, 10), (error, data) => {
      error
          ? res.redirect('404')
          : res.render('article', {figurine: data});
    })
  }

};

module.exports = mainController;
