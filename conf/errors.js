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
        case 'FRANCHISE_REQUEST':
            entityDesc = 'de votre demande de franchise ';
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
        case 'RESTAURANT':
            entityDesc = 'du restaurant ';
            break;
        case 'ING':
            entityDesc = "de l'ingrédient ";
            break;
        case 'EVENT':
            entityDesc = "de l'évènement";
            break;
        case 'SUPPLIER':
            entityDesc = 'du fournisseur';
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

        return `La création ${errorEntity}a échoué. ${this.contactIfPersist}`;
    },

    emptyData(entity) {
        errorEntity = getEntityDesc(entity);

        return `Aucune donnée ${errorEntity} n'a été trouvé.`;
    },

    errorOccured:
        'Une erreur est apparue durant le traitenemnt de votre requête : ',

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

    alreadyDeleted(entity) {
        errorEntity = getEntityDesc(entity);

        return `La suppression ${errorEntity}a déjà été effectué.`;
    },

    itemNotFound: " L'élément n'existe pas ou été supprimé.",

    contactIfPersist:
        "Veuillez réessayer plus tard ou contacter l'assistance tehnique si l'erreur persiste.",
};

module.exports = errorsList;
