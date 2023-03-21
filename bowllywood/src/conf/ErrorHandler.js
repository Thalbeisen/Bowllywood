import {useState} from 'react';

// import { Toast, Popup} from 'react';
// import { redirection } from 'react-router-dom';

/**
 * @param {string} errType 		REDIRECT | POPUP | TOAST
 * @param {number} errCode 		http code (ex 404, 401, 500, ...) from request response
 * @param {string} subjectName 	for dynamic message
 * @param {string} catchedMsg 	error message from req. response
 */
const ErrorHandler = ({errType, errCode, subjectName='élément', catchedMsg=''}) => {

	const [title, setTitle] = useState(''),
		  [errMessage, setErrMessage] = useState('');

	// define error message to display
	const serverCodeRx = new RegExp('/^(5[0-9]{2})$/s'); // matches 500, 501, etc...

	// check passed elements 
	subjectName = (typeof subjectName !== 'string') ? 'élément' : subjectName ;
	catchedMsg = (typeof catchedMsg !== 'string') ? '' : catchedMsg ;
	subjectName = subjectName.toLowerCase();

	switch (errCode)
	{
		case 404:
			setErrMessage(`Aucun.e ${subjectName} n'a été trouvé.e lors de la recherche.`);
			break;
		case 401:
			setErrMessage(`Vous devez être connecté pour accéder à cette page. Vous n'avez pas les droits ou avez été déconnecté.`);
			break;
		case 403:
			setErrMessage(`Vous n'avez pas les droits pour accéder à ces informations.`);
			break;
		default:
			// [EVOLUTION] : send the error to the service for analysis.
			if (serverCodeRx.test(errCode)) {
			setErrMessage(`Une erreur technique est survenue. Veuillez recommencer plus tard. ${catchedMsg}`);
			} else {
			setErrMessage(`Une erreur est survenue durant le traitenemnt. Veuillez recommencer plus tard.`);
			}
			break;
	}

	// return object or redirect
	switch (errType)
	{
		case 'REDIRECT':
			setTitle(`Erreur ${errCode}`);

// ?? redirect to page depending of the errCode or pass title/msg.
			location('.../...', {errMessage, title})
			break;
		case 'POPUP':
			return (<Popup option={errMessage} />)
			break;
		case 'TOAST':
			return (<Toast option={errMessage} />)
			break;
		default:
			return (<Toast option={errMessage} />)
			break;
	}
}

export default ErrorHandler;