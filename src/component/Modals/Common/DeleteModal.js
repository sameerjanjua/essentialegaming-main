import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useFirebase } from "../../../context/Firebase";
import { deleteEvent } from "../../../store/actions/ManageEventAction";
import { toast } from "react-toastify";


const DeleteModal = ({ modal, toggle, event }) => {

    const [spinner, setSpinner] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const dispatch = useDispatch();
    const firebase = useFirebase();

    const eventId = event?.id;
    const eventImage = event?.eventImage;

    console.log(eventId);
    console.log(eventImage);

    const handleDelete = () => {
        setSpinner(true);
        setIsDeleting(true);
        dispatch(deleteEvent(firebase, eventId, eventImage))
            .then(() => {
                toast.success("Delete Successful");
                setSpinner(false);
                setIsDeleting(false);
                toggle();
            })
            .catch((error) => {
                toast.error(error.message);
                setSpinner(false);
                setIsDeleting(false);
            })
    }

    return (
        <Modal
            show={modal}
            onHide={toggle}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="border-0">
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to Delete?</p>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button
                    variant="danger"
                    type="submit"
                    disabled={isDeleting}
                    onClick={handleDelete}
                >
                    {
                        spinner ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {"  Deleting..."}
                            </>
                        ) : (
                            'Delete'
                        )
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;