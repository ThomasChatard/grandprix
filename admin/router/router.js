
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Connexion);
// pilotes
    app.get('/pilotes', PiloteController.ListerPilotes);
    app.get('/pilotes/ajouterpilote', PiloteController.AjouterPilote);
    app.get('/pilotes/modifierpilote/:pilnum', PiloteController.ListerPilotes);
    app.get('/pilotes/supprimerpilote/:pilnum', PiloteController.ListerPilotes);

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
