/**
 * Get the description/string of the current entity
 * @param  {string} entity 		The entity 'code'
 * @return {string}        		The entity description
 */

let entityDesc;
let errorEntity;

const getEntityDesc = (entity) => {
    switch (entity) {
        case 'USER':
            entityDesc = 'de votre compte ';
            break;
        case 'PROSPECT':
            entityDesc = 'du prospect ';
            break;
        case 'RESERV':
            entityDesc = 'de la réservation ';
            break;
        case 'MENU':
            entityDesc = 'du plat ';
            break;
        case 'ROLE':
            entityDesc = 'du role ';
            break;
        case 'STOCK':
            entityDesc = 'du produit ';
            break;
        case 'FRANCHISED':
            entityDesc = 'du franchisé ';
            break;
        default:
            entityDesc = '';
            break;
    }

    return entityDesc;
};

/** Errors list * */
const errorsList = {
    createError(entity) {
        errorEntity = getEntityDesc(entity);

        return `La création ${errorEntity}a échoué. Veuillez réessayer plus tard ou contacter l'assistance tehnique si l'erreur persiste.`;
    },

    updateError(entity) {
        errorEntity = getEntityDesc(entity);

        return `Une erreur est survenue lors de la modification ${errorEntity}. Veuillez réessayer plus tard.`;
    },

    deleteError(entity) {
        errorEntity = getEntityDesc(entity);

        return `Une erreur est survenue lors de la tentative de suppression ${errorEntity}.`;
    },

    emptyList: "Aucune données n'a été trouvé.",

    listError: "Impossible d'accéder à la liste demandée.",
};

module.exports = errorsList;
