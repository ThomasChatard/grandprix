let model = require('../models/pilote.js');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
  response.title = 'Répertoire des pilotes';

  model.getInitiales( function (err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    response.listeInitiales = result;

    response.render('repertoirePilotes', response);
  }) ;
}


module.exports.AfficherPilote = 	function(request, response){
  let pilnum = request.params.pilnum;
  let async = require("async");

  response.title = 'Afficher le pilote' + pilnum;

  async.parallel([
        function (callback) {
          model.getInitiales(function (err,result) {callback(null,result)});
        },
        function (callback){
          model.getInfoPilotes(pilnum,(function(err,result){callback(null,result)}));
        },
        function (callback) {
          model.getSponsors(pilnum,(function (err,result) {callback(null,result)}));
        }
      ],
      function(err,result) {
        if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
        }
        response.listeInitiales = result[0];
        response.afficherPilote = result[1];
        response.afficherSponsor = result[2];
        response.render('afficherPilote', response);
      });
};

module.exports.ListerPilotes = 	function(request, response){
  let initiale = request.params.initiale;
  let async = require("async");
  response.title = 'Liste des pilotes dont le nom commence par' + initiale;

  async.parallel ([
    function (callback){
      model.getInitiales(function (err,result) {callback(null,result)});
      //afficher les premières lettres des pilotes
    },

    function (callback){
      model.getPilotes(initiale,(function(err,result){callback(null,result)}));
    }//aficher les nom, prenoms et photos des pilotes

  ],
  function(err,result){
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    response.listeInitiales = result[0];
    response.listePilotes = result[1];
    response.render('listePilotes',response);
  });
};
