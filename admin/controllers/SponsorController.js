let model = require('../models/sponsor.js');

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerSponsors = function(request, response){
   response.title = 'Liste des sponsors';
    model.getListeSponsor( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeSponsor = result;
        //console.log(result);
response.render('listerSponsor', response);
});
}

module.exports.AjouterSponsor = function(request, response){
  response.title = 'Ajout sponsor';
  let async = require("async");
  async.parallel([

     function(callback)
     {
         model.getEcurie( function (err, result) {callback(null,result)})
     }

 ],
 function(err, result){
     if (err) {
         console.log(err);
         return;
     }
     response.resultEcurie = result[0];
     response.render('ajouterSponsor', response);
 });
};

module.exports.ConfirmerAjoutSponsor = 	function(request, response){
  let donnees = request.body;

  if(donnees["ecunum"]=="NULL"){
    delete donnees["ecunum"];
  }

  response.title = 'Ajouter un sponsor';

  model.ajouterSponsor(donnees, function (err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }


    response.status(301).redirect(request.baseUrl+'/sponsors');
  }) ;
};

module.exports.ModifierSponsor = function(request, response){
    response.title = 'Modifier sponsor';
    let num = request.params.sponum;

    let async = require("async");
    async.parallel([
            function(callback)
            {
                model.getEcurie( function (err, result) {callback(null,result)})
            },
            function(callback)
            {
                model.getDetailSponsor(num, function (err, result) {callback(null, result)})
            }
        ],

        function(err, result){
            if (err) {
                console.log(err);
                return;
            }
            response.resultEcurie = result[0];
            response.detailSponsor = result[1][0];

            response.render('modifierSponsor', response);
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
