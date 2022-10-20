import './AddEditMeal.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createMeal, updateMeal, getOneMeal } from '../../service/meal';

import * as yup from 'yup';
import { useFormik } from 'formik';

import HeaderTitle from '../../components/HeaderTitle';
import { Col, Row, Container } from 'react-bootstrap';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useChecklist } from 'react-checklist';

// Get ingredient & allergenes data from ddb
// const ingData = getAllIngredients();
// const alrData = getAllAllergenes();

const ingData = [
   { _id: 'ID456485415d548', label : 'Chou'},
   { _id: 'ID456485415d549', label : 'Wakame'},
   { _id: 'ID456485415d550', label : 'Champignon'},
   { _id: 'ID4564854456388', label : 'Shiisake'},
   { _id: 'ID456j54ry6t455', label : 'Oignon Rouge'},
   { _id: 'IDfreg48trs5hgt', label : 'Oignon Blanc'},
   { _id: 'ID454f4r54g5r44', label : 'Algue Nori'},
   { _id: 'ID0000000000000', label : 'Feta'},
   { _id: 'ID1111111111111', label : 'Carotte'},
   { _id: 'ID2222222222222', label : 'Tomates'},
   { _id: 'ID3333333333333', label : 'Salade'},
   { _id: 'ID4444444444444', label : 'Riz'}
]

const alrData = [
    { _id: 'ID5555555555555', label : 'Arachide'},
    { _id: 'ID6666666666666', label : 'Lactose'},
    { _id: 'ID7777777777777', label : 'autre ?'}
]

// constantes
const catData = [
    {_id: 'SALE', label: 'Salé'},
    {_id: 'SUCRE', label: 'Sucré'}
]
const emptyField = 'Ce champ est obligatoire';
const emptyArray = 'Veuillez sélectionner au moins un élément.';
const descToShort = "Une description trop petite n'est pas très attrayant...";
const desToLong = "Oups ! La description est trop longue... Raccoucissez un peu."


const AddEditMeal = () => {
    const { id } = useParams();
    const isCreateMode = !id;

    const [meal, setMeal] = useState({});
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
    
            createMeal(values).then((oData)=>{
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
            
        }
    }

    ///////////////////
    // Formik config //
    ///////////////////
    const validationSchema = yup.object(
    {
        name: yup
            .string()
            .required(emptyField),
    
        category: yup
            .string()
            .required(emptyField),
    
        price: yup
            .string()
            .required(emptyField),
    
        description: yup
            .string()
            .required(emptyField)
            .min(10, descToShort)
            .max(255, desToLong),
    
        ingredients: yup
            .array()
            .nullable(true)
            .required(emptyArray),
    
        allergenes: yup
            .array()
            .nullable(true),
    
        image: yup
            .string()
            .required(emptyField)
    });

    const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik(
    {
        initialValues: {
            name: '',
            category: 'SALE',
            price: '',
            description: '',
            ingredients: [],
            allergenes: [],
            image: ''
        },
        validationSchema,
        onSubmit
    });
    
    ////////////////////////////
    // Handlers for checklist //
    ////////////////////////////
    const ingChecklist = useChecklist(ingData, {
        key: '_id',
        keyType: 'string'
    });
    const handleReset = () => ingChecklist.setCheckedItems(new Set());
    
    const alrChecklist = useChecklist(alrData, {
        key: '_id',
        keyType: 'string'
    });

    useEffect(()=>{

        setFieldValue('ingredients', ingChecklist.checkedItems);
        setFieldValue('allergenes', alrChecklist.checkedItems);

        if (!isCreateMode) {

            getOneMeal(id).then((res) =>
            {
                debugger;
                // récupérer et stocker les éléments des arrays ing & alr pour les pousser dans les chekedItems correspondante.
                // Une fois toutes les données récupérés, prcéder à l'update dans le onSubmit. Puis attaquer le delete.
                const values = ['name', 'category', 'price', 'description', 'ingredients', 'allergenes', 'image'];
                
                values.forEach((value) => {
                    setFieldValue(value, res.data[value], false);
                });

                setMeal(res.data);
                
            }).catch((err)=>{
                // appeler fragment erreur et lui passer err ?
                console.log(err);

                // creation failed
                switch (err.response.status)
                {
                    default:
                        setErrMsg({
                            title: `Erreur ${err.code} !`,
                            message: err.response.data
                        })
                }
            });
        }
    }, [ingChecklist.checkedItems,
        alrChecklist.checkedItems,
        isCreateMode,
        id,
        setFieldValue])

    console.log(values);

    /////////////////////
    // return the view //
    /////////////////////
    return (
    <Container className="pb-5">
        <Row className="flex-center">
            <Col lg="12">
                <HeaderTitle>Creation d'un nouveau bowl</HeaderTitle>
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
                            lg="4"
                            className="d-flex justify-content-center px-4">
                            <Input
                                type="text"
                                name="image"
                                value={values.image}
                                onChange={handleChange}
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
                            lg="4">

                            <p>Sélectionnez les ingrédients</p>
                            <p className="error">{errors.ingredients && touched.ingredients && errors.ingredients}</p>
                            <ul>
                                <li className="my-3">
                                    <button onClick={handleReset} className="border rounded px-4 py-1">Réinitialier la sélection</button>
                                </li>
                                {
                                    ingData.map((item, index)=>(
                                        <li key={index} className=" d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                data-key={item._id}
                                                onChange={ingChecklist.handleCheck}
                                                checked={ingChecklist.checkedItems.has(item._id)}
                                                className="pointer me-2"/>
                                            <label>{item.label}</label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>
                        <Col
                            lg="4">

                            <p>Sélectionnez les allergènes présents</p>
                            <p className="error">{errors.allergenes && touched.allergenes && errors.allergenes}</p>
                            {
                                <ul>
                                    {
                                        alrData.map((item, index)=>(
                                            <li key={index} className=" d-flex align-items-center">
                                                <input
                                                    type="checkbox"
                                                    data-key={item._id}
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
                    <div className="d-flex justify-content-center">
                        <Button type="submit">Soumettre</Button>
                    </div>
                </form>
            </Col>
        </Row>
    </Container>
  )
}

export default AddEditMeal;