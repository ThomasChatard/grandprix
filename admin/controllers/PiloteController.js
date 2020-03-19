let model = require('../models/pilote.js');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.ListerPilotes = 	function(request, response){
  response.title = 'Lister les pilotes';

  model.getListe( function (err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    response.listePilotes = result;

    response.render('listePilotes', response);
  }) ;
}

module.exports.AjouterPilote = function(request, response){
  response.title = 'Ajout pilote';
  let async = require("async");
  async.parallel([
     function(callback)
     {
         model.getPays( function (err, resultPays) {callback(null,resultPays)})
     },

     function(callback)
     {
         model.getEcurie( function (err, resultEcurie) {callback(null, resultEcurie)})
     }
 ],
 function(err, result){
     if (err) {
         console.log(err);
         return;
     }
     response.resultPays = result[0];
     response.resultEcurie = result[1];
     console.log(result[0]);
     console.log(result[1]);
     response.render('ajouterPilotes', response);
 });
};

module.exports.ConfirmerAjoutPilote = 	function(request, response){
  let donnees = request.body;

  response.title = 'Ajouter un pilote';

  model.ajouterPilote(donnees, function (err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    response.ajouterPilote = result;

    response.render('ajouterPilote', response);
  }) ;
};
