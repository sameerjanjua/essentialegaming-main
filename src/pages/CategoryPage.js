import React, { useEffect, useState } from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Category from "../images/Category.jpg"
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { fetchForm, setForms } from "../store/actions/FormAction";

const CategoryPage = () => {

    const firebase = useFirebase();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    // const fetchedData = useSelector(state => state.formFetchReducer.fetchedData) || [];
    // const formList = fetchedData.map(doc => ({ id: doc.id, ...doc.data() }));
    const formList = useSelector(state => state.formFetchReducer.forms) || [];
    const uniqueCategories = new Set();
    const formComponents = [];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchForm(firebase, dispatch));
            await dispatch(setForms());
            setLoading(false);
        }
        fetchData();
    }, [dispatch]);

    formList.forEach((form) => {
        if (!uniqueCategories.has(form.category)) {
            const categoryStatusLength = formList.filter((data) => data.status === "Approved")
            const categoryLength = categoryStatusLength.filter((data) => data.category === form.category)
            uniqueCategories.add(form.category);
            formComponents.push(
                <Card style={{ width: '14rem' }} key={form.id} >
                    <Card.Img variant="top" src={Category} />
                    <Card.Body className="d-grid text-center">
                        <Card.Title>{form.category}</Card.Title><br />
                        <Card.Text>
                            Total Registrations : {categoryLength.length}
                        </Card.Text>
                        <Button variant="dark" onClick={() => { navigate(`/category/${form.category}`) }}>View</Button>
                    </Card.Body>
                </Card>
            );
        }
    });



    return (
        <Container className="d-flex mt-5 mb-5 gap-5 flex-column flex-lg-row align-items-center" >
            {
                loading &&

                (
                    <Button variant="dark" className="mx-auto">
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        {"  Loading"}
                    </Button>
                )
            }
            {!loading && formComponents}
        </Container>
    );
}

export default CategoryPage;