let model = require('../models/home.js');
let modeladmin = require('../models/admin.js');
let Cryptr = require('cryptr');
  // ////////////////////////////////////////////// A C C U E I L
module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};

module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    if (request.session.admin)
    {
      request.session.admin=true;
    }
    else
    {
      request.session.admin=false;
    }

    response.render('home', response);

};

module.exports.Connexion = function (request, response) {
    response.title = "Page de connexion";



    let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF') ;

    let login = request.body.login;
    let password = request.body.password;



    model.getMotDePasse(function (err,result) {
        if(err){
            console.log(err);
            return;
        }

        let Logins = result[0].login;
        let passwd = result[0].passwd;
        let decryptedpasw = cryptr.decrypt(passwd);

        // console.log(login);
        // console.log(Logins);
        // console.log(decryptedpasw);
        // console.log(password);

        if(Logins==login && decryptedpasw==password){
            request.session.admin = true;
            console.log('cc');
        }else{
            request.session.admin = false;
            console.log('caezfeazr');
        }

        response.connexion = result;
        console.log(result);
        response.render('home',response);
    })
}
