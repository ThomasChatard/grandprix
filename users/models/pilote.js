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
module.exports.getInitiales = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT DISTINCT SUBSTR(pilnom, 1, 1) AS initiale FROM pilote ";
						sql += "ORDER BY initiale ASC";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPilotes = function (initiale, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT pi.pilnum, pilnom, pilprenom, phoadresse FROM pilote pi ";
            sql += "JOIN photo ph ON pi.pilnum = ph.pilnum ";
            sql += "WHERE pi.pilnom LIKE '"+ initiale +"%' AND ph.phonum = 1";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.getInfoPilotes = function(pilnum, callback) {
    db.getConnection(function (err,connexion) {
        if(!err){
            let sql ="SELECT pi.pilnum, pilnom, pilprenom, pildatenais, pilpoids, piltaille, piltexte, phoadresse, paynat, ecunom FROM pilote pi "
            sql = sql + "left outer JOIN photo ph ON pi.pilnum = ph.pilnum "
            sql = sql + "left outer JOIN ecurie e ON pi.ecunum = e.ecunum "
            sql = sql + "left outer JOIN pays pa ON pi.paynum = pa.paynum "
            sql = sql + "WHERE pi.pilnum = "+pilnum+" AND ph.phonum = 1";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getSponsors = function(pilnum, callback) {
    db.getConnection(function (err,connexion) {
        if(!err){
            let sql ="SELECT pi.pilnum, sponom, sposectactivite FROM pilote pi "
            sql = sql + "JOIN sponsorise sp ON sp.pilnum = pi.pilnum "
						sql = sql + "JOIN sponsor s ON s.sponum = sp.sponum "
            sql = sql + "WHERE pi.pilnum = "+pilnum + " ";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
