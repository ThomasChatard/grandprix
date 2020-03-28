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
module.exports.getListeResultat = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT gpnum, payadrdrap, gpnom FROM grandprix gp ";
            sql += "INNER JOIN circuit c ON gp.cirnum = c.cirnum ";
            sql += "INNER JOIN pays p ON p.paynum=c.paynum ";
            sql += "ORDER BY gpnum";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getDetailResultat = function (numeroGp, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT @row_number:=@row_number+1 AS place, co.gpnum, p.pilnum, tempscourse, p.pilnom, p.pilprenom, "
						sql += "CASE @row_number "
						sql += "WHEN 1 THEN 25 "
						sql += "WHEN 2 THEN 18 "
						sql += "WHEN 3 THEN 15 "
						sql += "WHEN 4 THEN 12 "
						sql += "WHEN 5 THEN 10 "
						sql += "WHEN 6 THEN 8 "
						sql += "WHEN 7 THEN 6 "
						sql += "WHEN 8 THEN 4 "
						sql += "WHEN 9 THEN 2 "
						sql += "WHEN 10 THEN 1 "
						sql += "ELSE 0 "
						sql += "END as nombrePoints "
						sql += "FROM (SELECT @row_number:=0) AS t, course co ";
            sql += "JOIN pilote p ON p.pilnum = co.pilnum ";
            sql += "JOIN grandprix gp ON co.gpnum = gp.gpnum ";
            sql += "WHERE co.gpnum = "+ numeroGp +" ORDER BY tempscourse LIMIT 10";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getDetailGp = function (numeroGp, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT gpnom, gpdate, gpcommentaire FROM grandprix ";
            sql += "WHERE gpnum = "+ numeroGp;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPointsGp = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ptplace, ptnbpointsplace FROM points";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
