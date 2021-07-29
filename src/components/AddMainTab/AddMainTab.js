import "./AddMainTab.css"

import { Modal, Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import AuthContext from "context/auth";
import apiClient from "services/apiClient";

export default function AddMaintab(props) {

    const { setMaintabs, setErrors, setIsLoading } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: "",
    });


    // adds a new maintab to list of maintabs
    const addMaintab = (newMaintab) => {
        setMaintabs((oldMaintabs) => [newMaintab, ...oldMaintabs]);
    }


    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    }


    const handleOnSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);
        setErrors((e) => ({ ...e, form: null }));

        const { data, error } = await apiClient.createMaintab({ 
            name: form.name,
        });

        if (error) {
            setErrors((e) => ({ ...e, form: error }));
        } else {
            setErrors((e) => ({ ...e, form: null }));
            addMaintab(data.maintab);
            setForm({name: ""});
        } 

        setIsLoading(false);
    }


    return (
      <Modal
            {...props}
            size="lg"
            className="modal"
            aria-labelledby="Add-maintab-modal"
            centered
      >
        <Form onSubmit={handleOnSubmit} className="modal-area">
            <Modal.Header closeButton>
                <Modal.Title id="Add-maintab-modal">
                    Create a new main tab
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup>
                    <FormLabel className="form-label">Name of new main tab</FormLabel>
                    <Form.Control
                        type="text"
                        name="name"
                        className="input-field"
                        placeholder="Untitled"
                        onChange={handleOnInputChange}
                        value={form.name}
                        required
                    />
                </FormGroup>
                <div className="modal-button">
                    <Button type="submit" onClick={props.onHide} className="button">Add MainTab</Button>
                </div>
            </Modal.Body>
        </Form>

      </Modal>
    );
}