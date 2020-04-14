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
module.exports.getListeSponsor = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT sponum, sponom, sposectactivite FROM sponsor ";
						sql += "ORDER BY sponom ASC";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getDetailSponsor = function (sponum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT sponom, sposectactivite FROM sponsor s ";
						sql += "where sponum = "+ sponum;
						console.log (sql);
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

module.exports.ajouterSponsor = function (donnees, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO sponsor SET ? ";
						//console.log (sql);
            connexion.query(sql, donnees, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.supprimerSponsor = function(num, callbackspo, callbackfin, callbackspo2){

    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sqlspo ="DELETE FROM sponsor where sponum=" + num;
						let sqlfin ="DELETE FROM finance where sponum=" + num;
						let sqlspo2 ="DELETE FROM sponsorise where sponum=" + num;
						connexion.query(sqlspo2, callbackspo2);
						connexion.query(sqlfin, callbackfin);
						connexion.query(sqlspo, callbackspo);

            //console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};



module.exports.modifierSponsor = function (donnees,num, callback) {
    // connection à la base

    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="UPDATE sponsor SET sponom = '" + donnees["sponom"]+ "', sposectactivite =";
             sql+=" '"+  donnees["sposectactivite"] +"'" ;
             sql += " where sponum="+num;
            //console.log (sql);
            connexion.query(sql, donnees, callback);

            console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
