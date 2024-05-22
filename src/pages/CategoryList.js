import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "../context/Firebase";
import { useParams } from "react-router-dom";
import { fetchForm, setForms } from "../store/actions/FormAction";
import { Button, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import CategoryCard from "../component/CategoryCard";
import * as XLSX from 'xlsx';

const CategoryList = () => {

    const dispatch = useDispatch();
    const firebase = useFirebase();
    const params = useParams();
    // const fetchedData = useSelector(state => state.formFetchReducer.fetchedData);
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
            const filteredStatusForms = formList.filter(form => form.status === "Approved");
            const filteredForms = filteredStatusForms.filter(form => form.category === params.category);
            setFilteredData(filteredForms);
            console.log("filtered Forms : ", filteredForms);
        }
    }, [formList, params]);

    const handleXlsxDownload = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "registrationForms.xlsx");
    }

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
                    <h2>{params.category} Registrations</h2>
                    <p>Total Registrations : {filteredData.length}</p><br />
                    {/* <Button variant="dark" onClick={handleXlsxDownload} className="ml-auto" >Download .xlsx File</Button> */}


                    <Row className="justify-content-end">
                        <Col xs="auto" className="ml-auto">
                            <Button variant="success" onClick={handleXlsxDownload}>
                                Download Exel
                            </Button>
                        </Col>
                    </Row>

                    <Table responsive="lg" className="mt-3" bordered hover>
                        <thead>
                            <tr>
                                <th>Sr. No</th>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>Recipt</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                filteredData && filteredData.map((form, i) => {
                                    return (

                                        <CategoryCard key={form.id} id={form.id} index={i} {...form} />

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
                </>
            )}
        </Container>
    );
}

export default CategoryList;