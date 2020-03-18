
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
    app.get('/listePilotes/:initiale', PiloteController.ListerPilotes);
    app.get('/afficherPilote/:pilnum', PiloteController.AfficherPilote);

 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
   app.get('/detailCircuit/:numero', CircuitController.DetailCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   app.get('/detailEcurie/:numeroEcurie', EcurieController.DetailEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);
   app.get('/detailResultat/:numeroGp', ResultatController.DetailResultat);


// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
