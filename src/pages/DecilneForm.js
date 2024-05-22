import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../context/Firebase";
import { fetchForm, setForms } from "../store/actions/FormAction";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import CategoryCard from "../component/CategoryCard";

const DeclineFormsPage = () => {

    const dispatch = useDispatch();
    const firebase = useFirebase();
    // const formList = useSelector(state => state.formFetchReducer.fetchedData);
    // const formList = fetchedData.map(doc => ({ id: doc.id, ...doc.data() }));

    const formList = useSelector(state => state.formFetchReducer.forms);
    console.log("formList : ", formList);

    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchForm(firebase, dispatch));
            await dispatch(setForms());
            setLoading(false);
        }
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (formList) {
            const filteredForms = formList.filter(form => form.status === "Decline");
            setFilteredData(filteredForms);
            console.log("filtered Forms : ", filteredForms);
        }
    }, [formList]);


    return (
        <Container className="mt-5 mb-5 text-center">
            {
                loading &&

                <>
                    <Button variant="dark">
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        {"  Loading"}
                    </Button>
                </>
            }
            {!loading && (
                <>
                    <h2>Declined Registrations</h2>
                    <p>Total Registrations : {filteredData.length}</p><br />
                    <div className="table-responsive">
                        <Table className="mt-3" bordered hover>
                            <thead>
                                <tr>
                                    <th>Sr. No</th>
                                    <th>Category</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>City</th>
                                    <th>Recipt</th>
                                    <th>Status</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    filteredData && filteredData.map((form, i) => {
                                        return (

                                            <CategoryCard key={form.id} id={form.id} delete={true} index={i} button={true} {...form} />

                                        );
                                    })
                                }
                                {
                                    filteredData.length === 0 ? (

                                        <tr>
                                            <td colSpan={9} >Form Not Found</td>
                                        </tr>

                                    ) : null
                                }
                            </tbody>
                        </Table>
                    </div>
                </>
            )}
        </Container>
    );
}

export default DeclineFormsPage;