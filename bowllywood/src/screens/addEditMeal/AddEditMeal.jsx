// console.log(event.target.files[0])
// let file = event.target.files[0];
// if (!FORMATS.includes(file?.type)) {
//     setErrors({
//         ...errors
//     }) 
// }
// if (file?.size <= 1024 * 1024) {
//     setErrors({...errors})
// }

import './AddEditMeal.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMeal, updateMeal, getOneMeal, deleteMeal } from '../../services/meal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Col, Row, Container } from 'react-bootstrap';
import { Oval } from 'react-loader-spinner';
import HeaderTitle from '../../components/HeaderTitle';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useChecklist } from 'react-checklist';
import { getAllIngredients } from '../../services/ingredients';

// allergens data from ddb
const alrData = [
    { _id: 'ID456485415d550', label : 'Arachide'},
    { _id: 'ID454f4r54g5r44', label : 'Lactose'}
]
const catData = [
    {_id: 'SALE', label: 'Salé'},
    {_id: 'SUCRE', label: 'Sucré'}
]
const FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];

const AddEditMeal = () => {
    const { id } = useParams();
    const isCreateMode = !id;
    const [ingredients, setIngredients] = useState([]);
    const [ingLoaded, setIngLoaded] = useState(false);
    const [bowlID, setBowlID] = useState('');
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState({
        title: 'Erreur !',
        message: 'Une erreur est survenue. Le plat a été supprimé ou s\'est enfuit du restaurant...'
    });

    /////////////////////
    // submit function //
    /////////////////////
    const onSubmit = (values) => {
        if (isCreateMode) 
        {
            // add the currency caractere
            values.price = values.price.trim();
            let priceCurr = values.price.charAt(values.price.length -1);
            values.price = (priceCurr !== '€') ? values.price + '€' : values.price;

            createMeal(values).then((res)=>{
                // rediriger ?
                console.log('Le bowl a bien été créé. Se rendre sur sa page');
            }).catch((err) => {

                // appeler fragment erreur et lui passer err ?
                console.log(err);

                // creation failed
                switch (err.response.status)
                {
                    case 401:
                        setErrMsg({
                            title: `Erreur ${err.response.status} !`,
                            message: "appeler fragment \"vous n'êtes pas authorisé à faire cette action, vous allez être redirigé vers la page d'accueil.\""
                        })

                    break;
                    case 400:
                        setErrMsg({
                            title: `Erreur ${err.response.status} !`,
                            message: err.response.data
                        })

                    break;
                    default:
                        setErrMsg({
                            title: `Erreur ${err.code} !`,
                            message: 'Une erreur inconnue est survenue.'
                        })
                }
            });
        }
        else
        {
            updateMeal(id, values).then((res)=>{
                if (res.status === 200) {
                    console.log('Bowl updated');
                    navigate(`/menus/${res.data._id}`, {replace: true})
                }
            }).catch((err) => {
                debugger;
                console.log(err);
            })
        }
    }

    const archiveBowl = (bowlID) => {
        deleteMeal(bowlID).then((res)=>{
            navigate('/menus', {replace: true})
        }).catch((err)=>{
            console.log(err);
            // deletion failed
            setErrMsg({
                title: `Erreur ${err.code} !`,
                message: err.response.data
            })
        })
    }

    ///////////////////
    // Formik config //
    ///////////////////
    const validationSchema = yup.object(
    {
        name: yup
            .string()
            .required('Ce champ est obligatoire'),
    
        category: yup
            .string()
            .required('Ce champ est obligatoire'),
    
        price: yup
            .string()
            .required('Ce champ est obligatoire'),
    
        description: yup
            .string()
            .required('Ce champ est obligatoire')
            .min(10, "Une description trop petite n'est pas très attrayant... Minimum 10 caractères.")
            .max(255, "Oups ! La description est trop longue... Raccoucissez un peu. Maximum 255 caractères."),
    
        ingredients: yup
            .array()
            .nullable(true)
            .required('Veuillez sélectionner au moins un élément.'),
    
        allergens: yup
            .array()
            .nullable(true),
    
        image: yup
            .mixed()
            .nullable()
            .test(
                "type",
                "Le format d'image est invalide.",
                (value) => !value || (value && FORMATS.includes(value?.type))
            )
            .test(
                "size",
                "Le fichier est trop lourd. 5MB maximum.",
                (value) => value && value.size <= 1024 * 1024 // 5MB
            )
            .required('Ce champ est obligatoire')
    });

    const { values, errors, handleSubmit, handleChange, touched, setFieldValue, setTouched, setErrors } =
    useFormik(
    {
        initialValues: {
            name: '',
            category: 'SALE',
            price: '',
            description: '',
            ingredients: [],
            allergens: [],
            image: null
        },
        validationSchema,
        onSubmit
    });
    
    ////////////////////////////
    // Handlers for checklist //
    ////////////////////////////
    const ingChecklist = useChecklist(ingredients, {
        key: '_id',
        keyType: 'string'
    });
    const handleReset = () => ingChecklist.setCheckedItems(new Set());
    
    const alrChecklist = useChecklist(alrData, {
        key: '_id',
        keyType: 'string'
    });

    /////////////////////
    // values handlers //
    /////////////////////
    useEffect(()=>{
        getAllIngredients().then((res)=>{
            setIngredients(res.data)    
        }).catch((err)=>{
            // appeler fragment erreur et lui passer err ?
            console.log(err);
            // creation failed
            setErrMsg({
                title: `Erreur ${err.code} !`,
                message: err.response.data
            })
        }).finally(()=>{
            setIngLoaded(true)
        })
    }, [])

    // If it is the update mode, get the current bowl 
    useEffect(()=>{
        if (!isCreateMode) {

            getOneMeal(id).then((res) =>
            {
                const values = ['name', 'category', 'price', 'description'/*, 'image'*/];
                
                res.data.ingredients.forEach((item, index)=>{
                    ingChecklist.checkedItems.add(item);
                });

                res.data.allergens.forEach((item, index)=>{
                    alrChecklist.checkedItems.add(item);
                });

                values.forEach((value) => {
                    setFieldValue(value, res.data[value], false);
                });

                setBowlID(res.data._id);
                
            }).catch((err)=>{
                // appeler fragment erreur et lui passer err ?
                console.log(err);

                // creation failed
                setErrMsg({
                    title: `Erreur ${err.code} !`,
                    message: err.response.data
                })
            });
        }
    }, [isCreateMode, id, errMsg, ingChecklist.checkedItems, alrChecklist.checkedItems, setFieldValue])

    // When a checkbow is clicked, change the values of the both arrays ingredients[] & allergens[]
    useEffect(()=>{

        setFieldValue('ingredients', Array.from(ingChecklist.checkedItems));
        setFieldValue('allergens', Array.from(alrChecklist.checkedItems));

    }, [ingChecklist.checkedItems,
        alrChecklist.checkedItems,
        setFieldValue])

    /////////////////////
    // return the view //
    /////////////////////
    return (
    <Container className="pb-5">
        <Row className="flex-center">
            <Col lg="12">
                <HeaderTitle>{(isCreateMode) ? 'Creation d\'un nouveau bowl' : `Modifier le bowl ${values.name}` }</HeaderTitle>
            </Col>
        </Row>
        <Row>
            <Col>
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="container">
                    <Row className="justify-content-evenly">
                        <Col 
                            md="8"
                            lg="4"
                            className="d-flex justify-content-center px-4">
                            <Input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                desc="Nom du bowl"
                                placeholder="Bâtisez-le..."
                                error={
                                    errors.name &&
                                    touched.name &&
                                    errors.name
                                }
                            />
                        </Col>
                        <Col 
                            md="8"
                            lg="4"
                            className="d-flex justify-content-center px-4">

                            <div className="inputCtnr w-100 px-0 my-3">
                                <label htmlFor="category" className="w-100">Catégorie</label>
                                <select 
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    className="selectField pointer no-border w-100 py-2 ps-3"
                                    error={
                                        errors.category &&
                                        touched.category &&
                                        errors.category
                                    }>
                                    { 
                                        catData.map((item, index)=> (
                                            <option 
                                                key={index} 
                                                value={item._id}
                                                defaultValue='SALE'>{item.label}</option>  
                                        ))
                                    }
                                </select>
                                <p className="error"></p>
                            </div>

                        </Col>
                    </Row>
                    <Row className="justify-content-evenly">
                        <Col 
                            md="8"
                            lg="4"
                            className="d-flex justify-content-center px-4">
                            <Input
                                type="text"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                desc="Prix du bowl"
                                placeholder="17,5€"
                                error={
                                    errors.price &&
                                    touched.price &&
                                    errors.price
                                }
                            />
                        </Col>
                         <Col 
                            md="8"
                            lg="4"
                            className="d-flex justify-content-center px-4">
                            <input
                                type="file"
                                name="image"
                                value={values.image}
                                onChange={(event) => {

                                    
                                    setTouched({
                                      ...touched,
                                      image: true,
                                    });
                                    // setFieldValue(
                                    //   "image",
                                    //   event.target.files[0]
                                    // );
                                  }}
                                desc="Image de présentation : upload."
                                error={
                                    errors.image &&
                                    touched.image &&
                                    errors.image
                                }
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-evenly">
                        <Col 
                            md="8"
                            lg="4">

                            <p>Sélectionnez les ingrédients</p>
                            <p className="error">{errors.ingredients && touched.ingredients && errors.ingredients}</p>
                            <ul>
                                <li className="my-3">
                                    <button onClick={handleReset} className="border rounded px-4 py-1">Réinitialier la sélection</button>
                                </li>
                                {
                                    (ingLoaded === true)
                                    ? ingredients.map((item, index)=>(
                                        <li key={index} className="d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                data-key={item._id}
                                                name="ingredients[]"
                                                onChange={ingChecklist.handleCheck}
                                                checked={ingChecklist.checkedItems.has(item._id)}
                                                className="pointer me-2"/>
                                            <label>{item.text}</label>
                                        </li>
                                    ))
                                    : <span className='col-1 mt-5'>
                                        <Oval
                                            strokeWidth="5"
                                            strokeWidthSecondary="5"
                                            secondaryColor="#000"
                                            height="25"
                                            width="25"
                                            radius="9"
                                            color="#CECECE"
                                            ariaLabel="loading"
                                            wrapperStyle
                                            wrapperClass
                                        />
                                    </span>
                                }
                            </ul>
                        </Col>
                        <Col md="8"
                            lg="4">

                            <p>Sélectionnez les allergènes présents</p>
                            <p className="error">{errors.allergens && touched.allergens && errors.allergens}</p>
                            {
                                <ul>
                                    {
                                        alrData.map((item, index)=>(
                                            <li key={index} className=" d-flex align-items-center">
                                                <input
                                                    type="checkbox"
                                                    data-key={item._id}
                                                    name="allergens[]"
                                                    onChange={alrChecklist.handleCheck}
                                                    checked={alrChecklist.checkedItems.has(item._id)}
                                                    className="pointer me-2"
                                                    />
                                                <label>{item.label}</label>
                                            </li>
                                        ))
                                    }
                                </ul>
                            }
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-4">
                        <Col
                            lg="5">

                            <div className="inputCtnr w-100 px-0 my-3">
                                <label htmlFor="Description" className="w-100">Description</label>
                                <textarea
                                    rows="10"
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    placeholder="Donnez une description clair et captivante"
                                    className="textMeal rounded p-3"
                                />
                                <p className="error">{
                                        errors.description &&
                                        touched.description &&
                                        errors.description
                                    }</p>
                            </div>

                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center gap-5">
                        {
                            (!isCreateMode && bowlID) ?
                                <Button bsType="secondary" onClick={()=>{archiveBowl(bowlID)}}>Supprimer le bowl</Button>
                            : ''
                        }
                        <Button type="submit" onClick={()=>{onSubmit(values)}}>Soumettre</Button>
                    </div>
                </form>
            </Col>
        </Row>
    </Container>
  )
}

export default AddEditMeal;