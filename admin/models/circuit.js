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
module.exports.getListeCircuit = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT cirnom, cirnum, cirlongueur, cirnbspectateurs FROM circuit ";
						sql += "ORDER BY cirnom ASC";
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
						let sql ="SELECT paynom, paynum FROM pays ORDER BY paynom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.ajouterCircuit = function (donnees, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO circuit SET ? ";
						//console.log (sql);
            connexion.query(sql, donnees, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getCircuit = function (num, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT cirnom, cirnum, paynum, cirlongueur, cirnbspectateurs, cirtext FROM circuit ";
						sql += "where cirnum="+num;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.supprimerCircuit = function(num, callbackess, callbackcou, callbackgp, callbackcir){

    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sqlcir ="DELETE FROM circuit where cirnum=" + num;
						let sqlgp ="DELETE FROM grandprix where cirnum=" + num;
						let sqlcou ="DELETE c.* FROM course AS c LEFT JOIN grandprix AS gp on c.gpnum = gp.gpnum where cirnum=" + num;
						let sqless ="DELETE e.* FROM essais AS e LEFT JOIN grandprix AS gp on e.gpnum = gp.gpnum where cirnum=" + num;
						connexion.query(sqless, callbackess);
						connexion.query(sqlcou, callbackcou);
						connexion.query(sqlgp, callbackgp);
						connexion.query(sqlcir, callbackcir);

            //console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};



module.exports.modifierCircuit = function (donnees,num, callback) {
    // connection à la base

    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="UPDATE circuit SET cirnom = '" + donnees["cirnom"]+ "', cirlongueur =";
             sql+=" '"+  donnees["cirlongueur"] + "', paynum = '"+ donnees["paynum"]+"'" ;
             sql += ", cirnbspectateurs = "+ donnees["cirnbspectateurs"]+", cirtext = \""+ donnees["cirtext"] +"\"";
             sql+= " where cirnum="+num;
            //console.log (sql);
            connexion.query(sql, donnees, callback);

            console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
