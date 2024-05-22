import React, { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { addFormConfig, addValueConfig, deleteFormConfig, deleteValueConfig, getFormConfig, updateFormConfig, updateValueConfig } from "../store/actions/RegFormConfigAction";

const FormEditing = () => {

    const [nestedTodo, setNestedTodo] = useState([
        {
            id: 1,
            value: "",
            subTodo: [{
                id: 1,
                value: "",
            }]
        },
    ]);

    const addTodo = () => {
        const newTodo = { id: nestedTodo.length + 1, value: "", subTodo: [] };
        setNestedTodo([...nestedTodo, newTodo]);
    }

    const addSubTodo = (parentTodoID) => {
        const newSubTodo = nestedTodo.map((todo) =>
            todo.id === parentTodoID.id ?
                {
                    ...todo,
                    subTodo: [...todo.subTodo, { id: todo.subTodo.length + 1, value: "" }],
                }
                : todo

        );
        setNestedTodo(newSubTodo);
    }

    const removeTodo = (todoID) => {
        const updatedTodo = nestedTodo.filter((todo) => todo.id !== todoID);
        console.log(updatedTodo);
        setNestedTodo(updatedTodo);
    }


    const removeSubTodo = (todoID, subTodoID) => {
        const updatedSubTodo = nestedTodo.map((todo) =>
            todo.id === todoID ?
                {
                    ...todo,
                    subTodo: todo.subTodo.filter((subTodo) => subTodo.id !== subTodoID),
                }
                : todo

        );
        setNestedTodo(updatedSubTodo);
    }

    const handleInputChange = (todoID, value) => {
        const updatedInput = nestedTodo.map((todo) =>
            todo.id === todoID ?
                {
                    ...todo,
                    value: value,
                }
                : todo
        );
        setNestedTodo(updatedInput);
    }

    const handleSubInputChange = (todoID, subTodoID, value) => {
        const updatedSubInput = nestedTodo.map((todo) =>
            todo.id === todoID ?
                {
                    ...todo,
                    subTodo: todo.subTodo.map((subTodo) =>
                        subTodo.id === subTodoID ?
                            {
                                ...subTodo,
                                value: value,
                            }
                            : subTodo
                    )
                }
                : todo
        );
        setNestedTodo(updatedSubInput);
    }


























    // const addInput = () => {
    //     if (label && inputType) {
    //         setFormConfig([...formConfig, { label, type: inputType }]);
    //         setLabel('');
    //         setInputType('text');
    //     }
    // };

    // const removeInput = (index) => {
    //     const updatedConfig = [...formConfig];
    //     updatedConfig.splice(index, 1);
    //     setFormConfig(updatedConfig);
    // };

    // const handleFormConfigChange = () => {
    //     // onFormConfigChange(formConfig);
    //     console.log("form config : ", formConfig);
    //     dispatch(addFormConfig(firebase, formConfig));
    // };


    // const [formConfig, setFormConfig] = useState([]);





    const [label, setLabel] = useState('');
    const [inputType, setInputType] = useState('');
    const [value, setValue] = useState('');
    const [updatedValue, setUpdatedValue] = useState('');
    const [formID, setFormID] = useState('');
    const [loading, setLoading] = useState(false);


    console.log("[label, inputType]", label, inputType);


    const firebase = useFirebase();
    const dispatch = useDispatch();

    const fetchConfig = useSelector(doc => doc.formConfigReducer.formConfig);
    console.log(fetchConfig);

    useEffect(() => {
        dispatch(getFormConfig(firebase));
    }, [dispatch, firebase])

    const addField = () => {
        dispatch(addFormConfig(firebase));
        setLabel("");
        setInputType("");
    }
    useEffect(() => {
        const updateField = async () => {
            await dispatch(updateFormConfig(firebase, formID, label, inputType));
            setLabel("");
            setInputType("");
        }

        updateField();


    }, [label, inputType])


    const deleteField = async (formID) => {
        setLoading(true);
        await dispatch(deleteFormConfig(firebase, formID));
        setLoading(false);
    }

    const addValue = (formID) => {
        console.log(formID);
        dispatch(addValueConfig(firebase, formID));
    }

    useEffect(() => {

        const updateValue = async () => {
            await dispatch(updateValueConfig(firebase, formID, value, updatedValue));
            setValue("");
            setUpdatedValue("");
        }
        updateValue();

    }, [updatedValue])

    const deleteValue = async (formID, valueToDelete) => {
        setLoading(true);
        console.log("function delete value", valueToDelete);
        await dispatch(deleteValueConfig(firebase, formID, valueToDelete));
        setLoading(false);
    }

    return (
        <Container className="mt-5">

            <div>
                {
                    fetchConfig && fetchConfig.map((form) => {
                        return (
                            <div key={form.id}>
                                <label>Label:</label>
                                <input
                                    type="text"
                                    defaultValue={form.label}
                                    placeholder={"Enter title here"}
                                    onChange={(e) => {
                                        setFormID(form.id);
                                        setLabel(e.target.value);
                                    }}
                                />
                                <lable>Type:</lable>
                                <select
                                    defaultValue={form.type}
                                    onChange={(e) => {
                                        setFormID(form.id);
                                        setInputType(e.target.value);
                                    }}
                                >
                                    <option>-----Select-----</option>
                                    <option value="text">Text</option>
                                    <option value="email">Email</option>
                                    <option value="file">File</option>
                                    <option value="dropdown">Dropdown</option>
                                </select>
                                {
                                    form.type === "dropdown" ?
                                        <>
                                            <br /><br />
                                            {
                                                loading &&

                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                    {"  Loading"}
                                                </>
                                            }
                                            {!loading && (
                                                <>
                                                    {
                                                        form && form.value.map((val, i) => {
                                                            return (
                                                                <div key={i}>

                                                                    <input
                                                                        type="text"
                                                                        placeholder="Enter value"
                                                                        defaultValue={val.subvalue || `Option ${i + 1}`}
                                                                        onChange={(e) => {
                                                                            setFormID(form.id);
                                                                            setValue(val.subvalue);
                                                                            setUpdatedValue(e.target.value);
                                                                        }}
                                                                    />
                                                                    <Button onClick={() => deleteValue(form.id, val.subvalue)}>
                                                                        Delete Value
                                                                    </Button>
                                                                    {/* <Button onClick={() => updateValue(form.id)}>Update Value</Button> */}

                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </>
                                            )}
                                            <br /><br />
                                            <Button onClick={() => addValue(form.id)}
                                            >Add Value Field</Button>
                                            <br /><br />
                                        </>
                                        : null
                                }
                                {/* <Button onClick={() => updateField(form.id)}>Save</Button> */}
                                <Button onClick={() => deleteField(form.id)}>Delete</Button>
                                <br /><br /><br />
                            </div>
                        );
                    })
                }
                <Button onClick={addField}>Add Field</Button>
            </div> <br /><br />

            <div>
                {
                    fetchConfig && fetchConfig.map((form) => {

                        if (form.label && form.type && (form.type === "text" || form.type === "email")) {
                            return (
                                <div key={form.id}>
                                    <label>{form.label}</label><br />
                                    <input type={form.type} />
                                    <br /><br /><br />
                                </div>
                            )
                        }

                        if (form.label && form.type && form.type === "file") {
                            return (
                                <div key={form.id}>
                                    <label>{form.label}</label><br />
                                    <input type={form.type} />
                                    <br /><br /><br />
                                </div>
                            )
                        }

                        if (form.label && form.type && (form.type === "dropdown")) {
                            return (
                                <div key={form.id}>
                                    <label>{form.label}</label>
                                    <select>
                                        <option>-----Select-----</option>
                                        {
                                            form && form.value.map((val, i) => {
                                                console.log(val.subvalue);
                                                return (
                                                    <option key={i} value={val.subvalue}>{val.subvalue}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <br /><br /><br />
                                </div>
                            )
                        }

                        return null;
                    })
                }
            </div>

            <br /><br /><br /><br /><br /><br /><br />



























































            {/* <div>
                <h2>Form Configurator</h2>
                <div>
                    <label>Label:</label>
                    <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
                    <label>Type:</label>
                    <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        Add more input types as needed
                    </select>
                    <button onClick={addInput}>Add Input</button>
                </div>
                <div>
                    <h3>Form Configuration:</h3>
                    {formConfig.map((input, index) => (
                        <div key={index}>
                            <span>{input.label} ({input.type})</span>
                            <button onClick={() => removeInput(index)}>Remove</button>
                        </div>
                    ))}
                </div>
                <button onClick={handleFormConfigChange}>Apply Form Configuration</button>
            </div> */}

            <br /><br /><br /><br /><br /><br />





































            <Form className="d-grid gap-4">
                <Button className="mb-5" variant="dark" onClick={addTodo}>Add Field</Button>
                {
                    nestedTodo.map((todo) => (
                        <div key={todo.id} className="d-flex flex-column justify-content-center text-center">
                            <Form.Label>Todo {todo.id}</Form.Label>
                            <Form.Control
                                type="text"
                                value={todo.value}
                                onChange={(e) => handleInputChange(todo.id, e.target.value)}
                            /> <br />
                            <Button variant="danger" onClick={() => removeTodo(todo.id)}>Remove</Button><br />
                            <Button variant="secondary" onClick={() => addSubTodo(todo)}>Add SubTodo</Button> <br />
                            {
                                todo.subTodo.map((subTodo) => (
                                    <div key={subTodo.id + 1} className="d-flex flex-column align-items-center">
                                        <Form.Label>SubTodo {subTodo.id}</Form.Label>
                                        <Form.Control
                                            className="w-50"
                                            type="text"
                                            value={subTodo.value}
                                            onChange={(e) => handleSubInputChange(todo.id, subTodo.id, e.target.value)}
                                        /><br />
                                        <Button variant="success" onClick={() => removeSubTodo(todo.id, subTodo.id)}>Remove</Button> <br />
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </Form>

        </Container>
    );
}

export default FormEditing;