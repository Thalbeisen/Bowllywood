// console.log(event.target.files[0])
// let file = event.target.files[0];
// if (!FORMATS.includes(file?.type)) {
//     setErrors({
//         ...errors
//     }) 
// }
// if (file?.size <= 1024 * 1024) {
//     setErrors({...errors})
// }isTSS

// hooks
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// data
import { createMeal, updateMeal, getOneMeal } from '../../services/meal';
import { getAllStocks } from '../../services/stock';
import { useFormik } from 'formik';
import { errorHandler } from '../../utils/errorHandler';
import * as yup from 'yup';
// front
import { Col, Row, Container } from 'react-bootstrap';
import Multiselect from 'react-widgets/Multiselect'
import LoadingSpinner from '../../components/LoadingSpinner';
import HeaderTitle from '../../components/HeaderTitle';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './AddEditMeal.scss';

const categories = [{_id: 'SALE', label: 'Salé'}, {_id: 'SUCRE', label: 'Sucré'}],
      FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];

const AddEditMeal = ({action='ADD'}) => {
// [selectedIngredients, setSelectedIngredients] = useState([]),
    const [ingredients, setIngredients] = useState([]),
          [bowl, setBowl] = useState({}),
          [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate(),
          { id } = useParams(), 
          bowlID = id; // bowlID = useParams().id
    const editMode = (bowlID || action === 'EDIT') ? true : false;

    // formik
    const onSubmit = (values) => {
        debugger
        /*const handlePromise = (promise) => {
            promise.then((res)=>{
                navigate(`/menus/${res.data._id}`, {replace: true})
            }).catch((err) => {
                errorHandler('TOAST', err)
            })
        }*/

        // add the currency caractere
        values.price = values.price.trim();
        let priceCurr = values.price.charAt(values.price.length -1);
        values.price = (priceCurr !== '€') ? values.price + '€' : values.price;

        if (editMode)
        {
            // handlePromise(updateMeal(id, values));
            updateMeal(id, values).then((res)=>{
                navigate(`/menus/${res.data._id}`, {replace: true})
            }).catch((err) => {
                errorHandler('TOAST', err)
            })
        }
        else
        {
            // handlePromise(createMeal.(values));
            createMeal(values).then((res)=>{
                navigate.navigation(`/menus/${res.data._id}`, {replace: true})
            }).catch((err) => {
                errorHandler('TOAST', err)
            })
        }
    }

    const validationSchema = yup.object({
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
            .required('Veuillez sélectionner au moins un élément.'),
    
        image: yup
        /* .mixed()
            .test("fileSize", "The file is too large", (value) => {
                debugger
               if (!value.length) return true // attachment is optional
               return value[0].size <= 2000000
            })*/

            .mixed()
             .nullable()
             .test(
                 "type",
                 "Le format d'image est invalide.",
                 (value) => {
                   debugger
                   return FORMATS.includes(value[0]?.type)
                }
             )
             .test(
                "fileSize",
                "Le fichier est trop lourd. 5MB maximum.",
                (value) => {
                   debugger
                   return value[0]?.size <= (1024 * 1024) // 5MB 
                }
             )
             .required('Ce champ est obligatoire')
    })

    const { values, errors, handleSubmit, handleChange, setTouched, touched/*, setErrors, setFieldValue*/ } = useFormik({
        initialValues: {
            name: ingredients.name ?? '',
            category: ingredients.category ?? 'SALE',
            price: ingredients.price ?? '',
            description: ingredients.description ?? '',
            ingredients: ingredients.ingredients ?? [],
            image: ingredients.image ?? ''
        },
        validationSchema,
        onSubmit
    })

    // get data
    useEffect(()=>{
        let cleaning = false;

        if (editMode)
        {
            getOneMeal(bowlID).then((res)=>{
                if (cleaning) return; 

                // let stockIDs = [];
                // res.data.ingredientsmap((stockID)=>{debugger; stockIDs.push(stockID) })
                // setSelectedIngredients(stockIDs)

                setBowl(res.data)

            }).catch((err)=>{
                errorHandler('TOAST', err)
            })
        }

        getAllStocks().then((res)=>{
            if (cleaning) return; 

            let stockArr = []
            res.data.forEach((stock)=>{
                debugger;
                stockArr.push({
                    id: stock._id, 
                    label: stock.name
                })
            })

            console.log(stockArr)
            setIngredients(stockArr);

        }).catch((err)=>{
            errorHandler('TOAST', err)
        }).finally(()=>{
            setIsLoaded(true)
        })

        return () => {
            cleaning = true;
        }
    }, [editMode, bowlID])

    return (
    <Container className="pb-5">
        <Row className="flex-center">
            <Col lg={12}>
                <HeaderTitle>{(!editMode) ? 'Creation d\'un nouveau bowl' : `Modifier le bowl ${values.name}` }</HeaderTitle>
            </Col>
        </Row>
        <Row>
            <Col> {(!editMode || isLoaded) ?
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="container">
                    <Row className="justify-content-evenly">
                        <Col md={8} lg={4} className="d-flex justify-content-center px-4">
                            <Input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                desc="Nom du bowl"
                                placeholder="Bâptisez-le..."
                                error={errors.name}
                            />
                        </Col>
                        <Col md={8} lg={4} className="d-flex justify-content-center px-4">

                            <div className="inputCtnr w-100 px-0 my-3">
                                <label htmlFor="category" className="w-100">Catégorie</label>
                                <select 
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    className="selectField pointer no-border w-100 py-2 ps-3"
                                    error={errors.category}>
                                    { 
                                        categories.map((item, index)=> (
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
                        <Col md={8} lg={4} className="d-flex justify-content-center px-4">
                            <Input
                                type="text"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                desc="Prix du bowl"
                                placeholder="17,5€"
                                error={errors.price}
                            />
                        </Col>
                         <Col md={8} lg={4} className="d-flex justify-content-center px-4">
                            <input
                                type="file"
                                name="image"
                                value={values.image}
                                onChange={(event) => {
                                    setTouched({
                                      ...touched,
                                      image: true,
                                    })
                                    // setFieldValue(
                                    //   "image",
                                    //   event.target.files[0]
                                    // );
                                  }}
                                desc="Image de présentation : upload."
                                error={errors.image}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-evenly">
                        <Col md={8} lg={4}>
                            <p>Sélectionnez les ingrédients</p>
                            {(ingredients.length > 0) ?
                            <>
                            <Multiselect
                              dataKey="id"
                              textField="label"
                              // defaultValue={bowl.ingredients}
                              data={ingredients}
                            />
                            <p className="error">{errors.ingredients}</p>
                            </>
                            : <p>Aucun ingrédient n'a pu être retrouvés</p>}
                        </Col>
                        <Col md={8} lg={4}>
                            <p>Sélectionnez les allergènes présents</p>
                            <p>La section allergène sera bientôt disponible.</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-4">
                        <Col lg={5}>

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
                                <p className="error">{errors.description}</p>
                            </div>

                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center gap-5">
                        <Button type="submit" onClick={()=>{onSubmit(values)}}>Soumettre</Button>
                    </div>
                </form>
                : <LoadingSpinner />}
            </Col>
        </Row>
    </Container>
  )
}

export default AddEditMeal;