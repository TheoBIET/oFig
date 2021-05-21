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
    const figurineId = parseInt(req.params.id, 10);
    dataMapper.getOneFigurine(figurineId, (error, figurine) => {
      if(error) {
        res.redirect('404');
      }else {
        dataMapper.getReviews(figurineId, (error, reviews) => {
          if(error) {
            res.redirect('404');
          }else {
            res.render('article', {figurine, reviews})
          }
        })
      }
    })
  }

};

module.exports = mainController;
