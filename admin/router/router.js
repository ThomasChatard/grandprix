
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let SponsorController = require('./../controllers/SponsorController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Connexion);
// pilotes
    app.get('/pilotes', PiloteController.ListerPilotes);
    app.get('/pilotes/ajouterpilote', PiloteController.AjouterPilote);
    app.get('/pilotes/modifierpilote/:pilnum', PiloteController.ModifierPilote);
    app.get('/pilotes/supprimerpilote/:pilnum', PiloteController.SupprimerPilotes);
    app.post('/pilotes/ajouterpilote', PiloteController.ConfirmerAjoutPilote);
    app.post('/pilotes/modifierpilote/:pilnum', PiloteController.ConfirmerModifierPilote);

    // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
   app.get('/detailCircuit/:numero', CircuitController.DetailCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcuries);
   app.get('/ecuries/ajouterecurie', EcurieController.AjouterEcurie);
   app.get('/ecuries/modifierecurie/:ecunum', EcurieController.ModifierEcurie);
   app.get('/ecuries/supprimerecurie/:ecunum', EcurieController.SupprimerEcurie);
   app.post('/ecuries/ajouterecurie', EcurieController.ConfirmerAjoutEcurie);
   app.post('/ecuries/modifierecurie/:ecunum', EcurieController.ConfirmerModifierEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);
   app.get('/detailResultat/:numeroGp', ResultatController.DetailResultat);

   //SPONSORS
   app.get('/sponsors', SponsorController.ListerSponsors);
   app.get('/sponsors/ajoutersponsor', SponsorController.AjouterSponsor);
   app.get('/sponsors/modifiersponsor/:sponum', SponsorController.ModifierSponsor);
   // app.get('/sponsors/supprimersponsor/:ecunum', SponsorController.SupprimerSponsor);
   app.post('/sponsors/ajoutersponsor', SponsorController.ConfirmerAjoutSponsor);
   // app.post('/sponsors/modifiersponsor/:ecunum', SponsorController.ConfirmerModifierSponsor);

   //Retour au site
   //app.get('/RetourAuSite', HomeController.RetourAuSite);

// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
