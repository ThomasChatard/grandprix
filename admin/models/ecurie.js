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
						let sql = "SELECT ecunum, ecunom, ecunomdir, ecupoints FROM ecurie e ";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getDetailEcurie = function (ecunum, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT ecunom, ecunomdir, ecuadrsiege, ecupoints, paynum, fpnum, ecuadresseimage FROM ecurie e ";
            sql += "WHERE e.ecunum = " + ecunum;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getFournisseur = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT fpnum, fpnom FROM fourn_pneu";
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


module.exports.ajouterEcurie = function (donnees, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO ecurie SET ? ";
						//console.log (sql);
            connexion.query(sql, donnees, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.supprimerEcurie = function(num, callbackpil, callbackfin, callbackvoi, callbackecu){

    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sqlecu ="DELETE FROM ecurie where ecunum=" + num;
						let sqlvoi ="DELETE FROM voiture where ecunum=" + num;
						let sqlfin ="DELETE FROM finance where ecunum=" + num;
						let sqlpil ="UPDATE pilote SET ecunum = NULL where ecunum=" + num;
						connexion.query(sqlpil, callbackpil);
						connexion.query(sqlfin, callbackfin);
						connexion.query(sqlvoi, callbackvoi);
            connexion.query(sqlecu, callbackecu);

            //console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};



module.exports.modifierEcurie = function (donnees,num, callback) {
    // connection à la base

    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="UPDATE ecurie SET fpnum = '" + donnees["fpnum"]+ "', ecunomdir =";
             sql+=" '"+  donnees["ecunomdir"] + "', ecuadrsiege = '"+ donnees["ecuadrsiege"]+"'" ;
             sql += ", ecupoints = "+ donnees["ecupoints"]+", paynum = " + donnees["paynum"]+" where ecunum="+num;
            //console.log (sql);
            connexion.query(sql, donnees, callback);

            console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};
