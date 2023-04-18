import { Col } from 'react-bootstrap';

const ReservationListStat = ({number, title, subNumber, subTitle, isPercent}) => {

	var fontColor = '';
	if (isPercent)
	{
		if (number >= 70 )
			fontColor = 'negativeColor';
		else if	(number >= 50 && number < 70 )
			fontColor = 'warningColor';
		else if	(number < 50 )
			fontColor = 'positiveColor';

		number += '%';
	}

    return (
        <Col xs={6} md={4} lg={3} xxl={2} className="text-center">
			<span className={`headerNbr ${fontColor}`}>{number}</span>
			<p className="m-0">{title}</p>
			{
			 	(subNumber || subTitle) 
			 	? <p className="smallText">
			 		{(subNumber) ? <span className="me-2">{subNumber}</span> : ''}
			 		{(subTitle) ? <span>{subTitle}</span> : ''}
				  </p>
				: ''
			}
        </Col>
    )
}

export default ReservationListStat;