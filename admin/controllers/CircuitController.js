let model = require('../models/circuit.js');

   // //////////////////////// L I S T E R  C I R C U I T

module.exports.ListerCircuits = function(request, response){
   response.title = 'Liste des circuits';
    model.getListeCircuit( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeCircuit = result;
        //console.log(result);
response.render('listerCircuit', response);
});
}

module.exports.DetailCircuit = 	function(request, response){
  let numero = request.params.numero;
  let async = require("async");
  response.title = 'Détail du circuit';

  async.parallel ([
    function (callback){
      model.getListeCircuit(function (err,result) {callback(null,result)});
      //afficher les premières lettres des pilotes
    },

    function (callback){
      model.getDetailCircuit(numero,(function(err,result){callback(null,result)}));
    }//aficher les nom, prenoms et photos des pilotes

  ],
  function(err,result){
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    response.listeCircuit = result[0];
    response.detailCircuit = result[1];
    response.render('detailCircuit',response);
  });
};

module.exports.AjouterCircuit = function(request, response){
  response.title = 'Ajout circuit';
  let async = require("async");
  async.parallel([

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
     response.resultPays = result[0];
     response.render('ajouterCircuit', response);
 });
};

module.exports.ConfirmerAjoutCircuit = 	function(request, response){
  let donnees = request.body;

  response.title = 'Ajouter un circuit';

  model.ajouterCircuit(donnees, function (err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }


    response.status(301).redirect(request.baseUrl+'/circuits');
  }) ;
};

module.exports.ModifierCircuit = function(request, response){
    response.title = 'Modifier circuit';
    let num = request.params.cirnum;

    let async = require("async");
    async.parallel([
            function(callback)
            {
                model.getPays( function (err, result) {callback(null,result)})
            },
            function(callback)
            {
                model.getCircuit(num, function (err, result) {callback(null,result)})
            }
        ],

        function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            response.resultPays = result[0];
            response.detailCircuit = result[1][0];

            response.render('modifierCircuit', response);
        });
};


module.exports.ConfirmerModifierCircuit = 	function(request, response){
    let donnees = request.body;
    let num = request.params.cirnum;

    response.title = 'Modifier un circuit';

    model.modifierCircuit(donnees,num, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }


        response.status(301).redirect(request.baseUrl+'/circuits');
    }) ;
};



module.exports.SupprimerCircuit = 	function(request, response){
    let num = request.params.cirnum;

    response.title = 'Supprimer un circuit';

    model.supprimerCircuit(num, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }


        response.status(301).redirect(request.baseUrl+'/circuits');
    }) ;
};
