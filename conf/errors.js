/**
 * Get the description/string of the current entity
 * @param  {string} entity 		The entity 'code'
 * @return {string}        		The entity description
 */

let entityDesc;
let errorEntity;

exports.getEntityDesc = (entity) => {
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
        default:
            entityDesc = '';
            break;
    }

    return entityDesc;
};

/** Errors list * */
exports.updateError =
    'Une erreur est survenue lors de la modification. Veuillez réessayer plus tard.';

exports.createError = (entity) => {
    errorEntity = module.getEntityDesc(entity);

    return `La création ${errorEntity}a échoué. Veuillez réessayer plus tard ou contacter l'assistance tehnique si l'erreur persiste.`;
};
