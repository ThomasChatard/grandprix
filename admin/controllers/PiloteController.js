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

  if(donnees["ecunum"]=="NULL"){
    delete donnees["ecunum"];
  }

  response.title = 'Ajouter un pilote';

  model.ajouterPilote(donnees, function (err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }


    response.status(301).redirect(request.baseUrl+'/pilotes');
  }) ;
};

module.exports.ModifierPilote = function(request, response){
    response.title = 'Modifier pilote';
    let pilnum = request.params.pilnum;

    let async = require("async");
    async.parallel([
            function(callback)
            {
                model.getPays( function (err, resultPays) {callback(null,resultPays)})
            },

            function(callback)
            {
                model.getEcurie( function (err, resultEcurie) {callback(null, resultEcurie)})
            },

            function (callback) {
                model.getInfoPilotes(pilnum,function  (err, infoPilote) {callback(null, infoPilote)})

            }
        ],

        function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            response.resultPays = result[0];
            response.resultEcurie = result[1];
            response.infoPilote = result[2][0];
            console.log(result[2]);
            response.render('modifierPilotes', response);
        });
};


module.exports.ConfirmerModifierPilote = 	function(request, response){
    let donnees = request.body;
    let num = request.params.pilnum;

    response.title = 'Modifier un pilote';

    model.modifierPilote(donnees,num, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }


        response.status(301).redirect(request.baseUrl+'/pilotes');
    }) ;
};



module.exports.SupprimerPilotes = 	function(request, response){
    let num = request.params.pilnum;

    response.title = 'Supprimer un pilote';

    model.supprimerPilote(num, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }


        response.status(301).redirect(request.baseUrl+'/pilotes');
    }) ;
};
