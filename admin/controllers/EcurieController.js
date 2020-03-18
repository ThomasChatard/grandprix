let model = require('../models/ecurie.js');

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
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
