let model = require('../models/circuit.js');

   // //////////////////////// L I S T E R  C I R C U I T

module.exports.ListerCircuit = function(request, response){
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
