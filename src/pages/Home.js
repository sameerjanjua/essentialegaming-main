import React, { useEffect, useState } from "react";
import CategoryCard from "../component/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchForm, setForms } from "../store/actions/FormAction";
import { useFirebase } from "../context/Firebase";
import { Button, Form, Spinner, Table } from "react-bootstrap";


const HomePage = () => {

    const dispatch = useDispatch();
    const firebase = useFirebase();
    
    const fetchedData = useSelector(state => state.formFetchReducer.forms);

    const [filterCategory, setFilterCategory] = useState("");
    const [findCategory, setFindCategory] = useState("");
    const [filteredData, setFilteredData] = useState(fetchedData);
    const [pendingFilteredData, setPendingFilteredData] = useState([]);
    const [approvedFilteredData, setApprovedFilteredData] = useState([]);
    const [declineFilteredData, setDeclinedFilteredData] = useState([]);
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
    }, [dispatch, firebase]);

    useEffect(() => {
        if (filterCategory) {
            const filteredForms = fetchedData.filter(form => form.category === filterCategory);
            const approvedFilteredForms = filteredForms.filter(form => form.status === "Approved");
            console.log("Approved", approvedFilteredForms);
            const declinedFilteredForms = filteredForms.filter(form => form.status === "Decline");
            setFilteredData(filteredForms);
            setApprovedFilteredData(approvedFilteredForms);
            setDeclinedFilteredData(declinedFilteredForms);
        } else {
            setFilteredData(fetchedData);
        }
    }, [fetchedData, filterCategory]);

    useEffect(() => {
        if (fetchedData) {
            const pendingFilteredForms = fetchedData.filter(form => form.status === "Pending");
            const approvedFilteredForms = fetchedData.filter(form => form.status === "Approved");
            const declinedFilteredForms = fetchedData.filter(form => form.status === "Decline");
            setPendingFilteredData(pendingFilteredForms);
            setApprovedFilteredData(approvedFilteredForms);
            setDeclinedFilteredData(declinedFilteredForms);
        }
    }, [fetchedData])

    const handleCategoryFilterChange = (event) => {
        setFilterCategory(event.target.value);
    };

    useEffect(() => {
        if (findCategory) {
            const foundForm = fetchedData.find(
                (form) => form.data().category === findCategory
            );
            setFilteredData([foundForm]);
        } else {
            setFilteredData(fetchedData);
        }
    }, [fetchedData, findCategory]);

    const handleCategoryFindChange = (event) => {
        setFindCategory(event.target.value);
    };

    console.log(pendingFilteredData);


    return (
            <div className="container mt-5 mb-5 text-center">
                {/* <SidebarCmp /> */}
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
                        <h3>Registration Forms</h3>
                        <p>Total Registrations : {fetchedData && fetchedData.length} | Pending Registrations : {pendingFilteredData.length} | Approved Registrations : {approvedFilteredData.length} | Declined Registrations : {declineFilteredData.length}</p><br />

                        <h5>Pending Registration Forms</h5>
                        <div className="table-responsive">
                        <Table responsive="x-lg" className="mt-2 mb-5" bordered hover>
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
                            <tbody>
                                {
                                    pendingFilteredData && pendingFilteredData.map((form, i) => {
                                        return (

                                            <CategoryCard key={form.id} id={form.id} index={i} button={true} {...form} />

                                        );
                                    })
                                }
                                {
                                    pendingFilteredData.length === 0 ? (

                                        <tr>
                                            <td colSpan={9} >Form Not Found</td>
                                        </tr>

                                    ) : null
                                }
                            </tbody>
                        </Table>
                        </div>

                        <Form className="mb-3">
                            <Form.Group controlId="formCategoryFilter">
                                <Form.Label>Filter by Category :</Form.Label>
                                <Form.Control className="mx-auto w-50" as="select" onChange={handleCategoryFilterChange} >
                                    <option value="">All</option>
                                    <option value="Valorant">Valorant</option>
                                    <option value="Fortnite">Fortnite</option>
                                    <option value="Need For Speed Heat">Need For Speed Heat</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>

                        <p> {filterCategory ? <p>Total {filterCategory} Registrations : {filteredData.length}</p> : ""} </p>

                        <Form className="mb-3">
                            <Form.Group controlId="formCategoryFind">
                                <Form.Label>Find by Category :</Form.Label>
                                <Form.Control
                                    className="mx-auto w-50"
                                    as="select"
                                    onChange={handleCategoryFindChange}
                                >
                                    <option value="">All</option>
                                    <option value="Valorant">Valorant</option>
                                    <option value="Fortnite">Fortnite</option>
                                    <option value="Need For Speed Heat">Need For Speed Heat</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>

                        <h5>All Registration Forms</h5>

                                <div className="table-responsive">
                        <Table responsive="lg" className="mt-5" bordered hover>
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
                            <tbody>
                                {
                                    filteredData && filteredData.map((form, i) => {
                                        return (

                                            <CategoryCard key={form.id} id={form.id} index={i} button={true} {...form} />

                                        );
                                    })
                                }
                                {
                                    filteredData && filteredData.length === 0 ? (

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
            </div>
        // </SidebarCmp>
    );

}

export default HomePage;

