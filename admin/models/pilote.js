/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListe = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT pilnum, pilnom, pilprenom, pildatenais FROM pilote ";
						sql += "ORDER BY pilnom ASC";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPays = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT paynom, paynum FROM pays";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunom, ecunum FROM ecurie";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.ajouterPilote = function (donnees, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO pilote SET ? ";
						//console.log (sql);
            connexion.query(sql, donnees, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.getInfoPilotes = function(pilnum, callback) {
    db.getConnection(function (err,connexion) {
        if(!err){
            let sql ="SELECT pi.pilnum, pilnom, pilprenom, pildatenais,pilpoids,piltaille,piltexte,phoadresse,paynat, ecunom, sponom,sposectactivite FROM pilote pi "
            sql = sql + "left outer JOIN photo ph ON pi.pilnum = ph.pilnum "
            sql = sql + "left outer JOIN ecurie e ON pi.ecunum = e.ecunum "
            sql = sql + "left outer JOIN pays pa ON pi.paynum = pa.paynum "
            sql = sql + "left outer JOIN sponsorise sp ON pi.pilnum = sp.pilnum "
            sql = sql + "left outer JOIN sponsor spo ON sp.sponum = spo.sponum "
            sql = sql + "WHERE pi.PILNUM = "+pilnum+" ";
            console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
