const client = require('./database');

const dataMapper = {
    // Le callback sera une fonction fournie (et déclarée) par le contrôleur.
    // On nous dit qu'elle aura la signature suivante : function(error, data)
    // Concrétement pour nous, quand Postgres nous répondra avec un erreur, on transmettra l'info au contrôleur avec le callback en utilisant son 1er paramètre
    // Si nous n'avons pas d'erreur mais des data, on utilisera cette fois le 2ème argument du callback

    getAllFigurines: callback => {
        client.query('SELECT * FROM figurine', (error, result) => {
            error
                ? callback(error)
                : callback(null, result.rows);
        });
    },
    getOneFigurine: (id, callback) => {
        client.query('SELECT * FROM figurine WHERE id=$1', [id], (error, result) => {
            error
                ? callback(error)
                // On teste la longueur de result.rows pour être sûr qu'on a bien récupéré un résultat suite à la requête
                // Une requête avec un ID inexistant ne fera pas d'erreur puisque la syntaxe sera correcte
                // On doit donc, en programmation, vérifier le contenu de result.rows ant de l'envoyer au contrôleur
                : result.rows.length > 0 
                    ? callback(null, result.rows[0])  
                    : callback(error)
        });
    },
    getReviews: (figurineId, callback) => {
        // On prépare la requête pour se protéger d'une éventuelle injection SQL
        const preparedQuery = {
            text: 'SELECT * FROM review WHERE figurine_id=$1',
            values: [figurineId]
        }

        // On envoie la requête au serveur de BDD
        client.query(preparedQuery, (error, results) => {
            if(error) {
                // On prévient le contrôleur qu'une erreur s'est produite
                callback(error);
            }else {
                // On formate les datas de façon à ce qu'elles soient prête à l'emploi
                // On les renvoie au contrôleur
                const reviews = results.rows;
                callback(null, reviews)
            }
        });
    }
}

module.exports = dataMapper;