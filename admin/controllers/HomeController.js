let model = require('../models/home.js');
let modeladmin = require('../models/admin.js');
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

module.exports.Connexion = function (request, response) {
    response.title = "Page de connexion";

    let Cryptr = require('cryptr');
    let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF') ;

    let login = request.body.login;
    let password = request.body.password;
    let passwordCrypt = cryptr.encrypt(password);

    let encryptedString = cryptr.encrypt('TakeTheLongWayHome');
    let decryptedString = cryptr.decrypt(encryptedString);
    console.log(encryptedString);
    console.log(decryptedString);

    modeladmin.getInfoUser(function (err,result) {
        if(err){
            console.log(err);
            return;
        }
        let Logins =response.login=result[0].login;
        let passwd = response.password=result[0].passwd;

        if(Logins==login && passwordCrypt==passwd){
            request.session.admin = true;
        }else{
            request.session.admin = false;
        }
    })
}
