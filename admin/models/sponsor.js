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

module.exports.supprimerPilote = function(num, callbackcou, callbackess, callbackspo, callbackpho, callbackpil){

    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sqlpil ="DELETE FROM pilote where pilnum=" + num;
						let sqlpho ="DELETE FROM photo where pilnum=" + num;
						let sqlspo ="DELETE FROM sponsorise where pilnum=" + num;
						let sqless ="DELETE FROM essais where pilnum=" + num;
						let sqlcou ="DELETE FROM course where pilnum=" + num;
						connexion.query(sqlcou, callbackcou);
						connexion.query(sqless, callbackess);
						connexion.query(sqlspo, callbackspo);
						connexion.query(sqlpho, callbackpho);
            connexion.query(sqlpil, callbackpil);

            //console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};



module.exports.modifierPilote = function (donnees,num, callback) {
    // connection à la base

    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="UPDATE sponsor SET sponom = '" + donnees["sponom"]+ "', sposectactivite =";
             sql+=" '"+  donnees["sposectactivite"] + "', ecunum = '"+ donnees["ecunum"]+"'" ;
             sql += " where sponum="+num;
            //console.log (sql);
            connexion.query(sql, donnees, callback);

            console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};


module.exports.getInfoPilotes = function(pilnum, callback) {
    db.getConnection(function (err,connexion) {
        if(!err){
            let sql ="SELECT pi.ecunum, pi.paynum, pi.pilnum, pilnom, pilprenom, pildatenais,pilpoids,pilpoints,piltaille,piltexte,phoadresse,paynat, ecunom, sponom,sposectactivite FROM pilote pi "
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
