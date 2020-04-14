let model = require('../models/ecurie.js');

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcuries = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        //console.log(result);
response.render('listerEcurie', response);
});
}

module.exports.DetailEcurie = 	function(request, response){
  let numeroEcurie = request.params.numeroEcurie;
  let async = require("async");
  response.title = "Détail de l'écurie";

  async.parallel ([
    function (callback){
      model.getListeEcurie(function (err,result) {callback(null,result)});
      //afficher les premières lettres des pilotes
    },

    function (callback){
      model.getDetailEcurie(numeroEcurie,(function(err,result){callback(null,result)}));
    },//aficher les nom, prenoms et photos des pilotes

    function (callback){
      model.getPiloteEcurie(numeroEcurie,(function(err,result){callback(null,result)}));
    },//aficher les nom, prenoms et photos des pilotes

    function (callback){
      model.getVoitureEcurie(numeroEcurie,(function(err,result){callback(null,result)}));
    }//aficher les nom, prenoms et photos des pilotes

  ],
  function(err,result){
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    response.listeEcurie = result[0];
    response.detailEcurie = result[1];
    response.piloteEcurie = result[2];
    response.voitureEcurie = result[3];
    response.render('detailEcurie',response);
  });
};

module.exports.AjouterEcurie = function(request, response){
  response.title = 'Ajout ecurie';
  let async = require("async");
  async.parallel([
     function(callback)
     {
         model.getFournisseur( function (err, result) {callback(null,result)})
     },

     function(callback)
     {
         model.getPays( function (err, result) {callback(null,result)})
     }

 ],
 function(err, result){
     if (err) {
         console.log(err);
         return;
     }
     response.resultFournisseur = result[0];
     response.resultPays = result[1];
     console.log(result[0]);
     response.render('ajouterEcurie', response);
 });
};

module.exports.ConfirmerAjoutEcurie = 	function(request, response){
  let donnees = request.body;

  response.title = 'Ajouter une écurie';

  model.ajouterEcurie(donnees, function (err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }


    response.status(301).redirect(request.baseUrl+'/ecuries');
  }) ;
};

module.exports.ModifierEcurie = function(request, response){
    response.title = 'Modifier écurie';
    let num = request.params.ecunum;

    let async = require("async");
    async.parallel([
            function(callback)
            {
                model.getPays( function (err, result) {callback(null,result)})
            },
            function(callback)
            {
                model.getFournisseur( function (err, result) {callback(null, result)})
            },
            function(callback)
            {
                model.getDetailEcurie(num, function (err, result) {callback(null, result)})
            },
        ],

        function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            response.resultPays = result[0];
            response.resultFournisseur = result[1];
            response.detailEcurie = result[2][0];
            console.log(result[2]);
            response.render('modifierEcurie', response);
        });
};


module.exports.ConfirmerModifierEcurie = 	function(request, response){
    let donnees = request.body;
    let num = request.params.ecunum;

    response.title = 'Modifier une écurie';

    model.modifierEcurie(donnees,num, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }


        response.status(301).redirect(request.baseUrl+'/ecuries');
    }) ;
};



module.exports.SupprimerEcurie = 	function(request, response){
    let num = request.params.ecunum;

    response.title = 'Supprimer une écurie';

    model.supprimerEcurie(num, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }


        response.status(301).redirect(request.baseUrl+'/ecuries');
    }) ;
};
