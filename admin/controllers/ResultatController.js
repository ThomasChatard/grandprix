let model = require('../models/resultat.js');

  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){
   response.title = 'Liste des résulats des grands prix';
    model.getListeResultat( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeResultat = result;
        //console.log(result);
response.render('listerResultat', response);
});
}

module.exports.DetailResultat = function(request, response){
  let numeroGp = request.params.numeroGp;
  let async = require("async");
  response.title = 'Résultat du Grand Prix';

  async.parallel ([
    function (callback){
      model.getListeResultat(function (err,result) {callback(null,result)});
      //afficher les premières lettres des pilotes
    },

    function (callback){
      model.getDetailResultat(numeroGp,(function(err,result){callback(null,result)}));
    },//aficher les nom, prenoms et photos des pilotes

		function (callback){
			model.getDetailGp(numeroGp,(function(err,result){callback(null,result)}));
		},//aficher les nom, prenoms et photos des pilotes

		function (callback){
			model.getPointsGp(function(err,result){callback(null,result)});
		}//aficher les nom, prenoms et photos des pilotes

  ],
  function(err,result){
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    response.listeResultat = result[0];
    response.detailResultat = result[1];
		response.detailGp = result[2];
		response.pointsGp = result[3];
    response.render('detailsResultat',response);
  });
};
