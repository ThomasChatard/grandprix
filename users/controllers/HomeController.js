let model = require('../models/home.js');

  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    model.getDernierResultat( function (err, result) {
      if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
      }
      response.dernierResultat = result;

      response.render('home', response);
    }) ;
  }

module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};
