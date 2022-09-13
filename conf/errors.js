let entityDesc;
let errorEntity;

/**
 * Get the description/string of the current entity
 * @param  {string} entity 		The entity 'code'
 * @return {string}        		The entity description
 */
const getEntityDesc = function (entity) {
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
        case 'REVIEW':
            entityDesc = "de l'avis ";
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

        return `La création ${errorEntity}a échoué. ` + this.contactIfPersist;
    },

    updateError:
        'Une erreur est survenue lors de la modification. Veuillez réessayer plus tard.',

    deleteError: 'Une erreur est survenue lors de la tentative de suppression.',

    emptyList: "Aucune données n'a été trouvé.",

    listError: "Impossible d'accéder à la liste demandée.",

    emptyData(entity) {
        errorEntity = getEntityDesc(entity);

        return `Aucune donnée ${errorEntity} n'a été trouvé.`;
    },

    errorOccured: 'Une erreur est apparue durant le traitenemnt de votre requête : ',

    alreadyDeleted(entity) {
        errorEntity = getEntityDesc(entity);

        return `La suppression ${errorEntity}a déjà été effectué.`;
    },

    itemNotFound: ' L\'élément n\'existe pas ou été supprimé.',

    contactIfPersist: "Veuillez réessayer plus tard ou contacter l'assistance tehnique si l'erreur persiste.",
};

module.exports = errorsList;
