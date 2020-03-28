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
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT ecunum, payadrdrap, ecunom FROM ecurie e ";
						sql += "INNER JOIN pays p ";
						sql += "ON p.paynum=e.paynum ORDER BY ecunom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getDetailEcurie = function (numeroEcurie, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT ecunom, ecunomdir, ecuadrsiege, paynom, fpnom, ecuadresseimage FROM ecurie e ";
            sql += "JOIN pays p ON p.paynum = e.paynum ";
						sql += "LEFT OUTER JOIN fourn_pneu fp ON fp.fpnum = e.fpnum ";
            sql += "WHERE e.ecunum = " + numeroEcurie;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPiloteEcurie = function (numeroEcurie, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT pi.pilnum, pilnom, pilprenom, phoadresse, SUBSTRING(piltexte, 1, 100) as piltexte FROM pilote pi ";
						sql += "JOIN photo ph ON pi.pilnum = ph.pilnum ";
            sql += "WHERE ph.phonum = 1 AND pi.ecunum = " + numeroEcurie;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getVoitureEcurie = function (numeroEcurie, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT voinom, voiadresseimage, typelibelle FROM ecurie e ";
						sql += "LEFT OUTER JOIN voiture v ON v.ecunum = e.ecunum ";
						sql += "JOIN type_voiture t ON t.typnum = v.typnum ";
            sql += "WHERE e.ecunum = "+numeroEcurie;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
