
import { useEffect, useState } from "react";
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button, Form } from "reactstrap";

let personalItemModel = {
    Id: 0,
    Name: "",
    Description: "",
    IsCompleted: false,
};

const StudentModal = ({ showModal, setShowModal, savePersonalItem, edit, setEdit, updatePersonalItem }) => {
    if (edit === null) {
        personalItemModel = {
            Id: 0,
            Name: "",
            Description: "",
            IsCompleted: false,
        };
    }
    const [personalItem, setPersonalItem] = useState(personalItemModel);
    console.log('item', personalItem);
    const updateForm = (e) => {
        setPersonalItem({
            ...personalItem,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (edit != null) {
            setPersonalItem(edit);
        } else {
            setPersonalItem(personalItemModel);
        }

    }, [edit]);

    const closeModal = () => {
        setShowModal(!showModal);
        setEdit(null);
    };

    return (
        <Modal isOpen={showModal}>
            <ModalHeader>
                {personalItem.Id === 0 ? "Nuevo" : "Editar"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input
                            name="Name"
                            type="text"
                            placeholder="Nombre"
                            onChange={(e) => updateForm(e)}
                            value={personalItem.Name}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input
                            name="Description"
                            type="text"
                            placeholder="Descripción"
                            onChange={(e) => updateForm(e)}
                            value={personalItem.Description}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Completar tarea</Label>
                        <Input type="select" name="IsCompleted" onChange={(e) => updateForm(e)} value={personalItem.IsCompleted}>
                            <option value="true">Completado</option>
                            <option value="false">Incompleto</option>
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" className="me-2" onClick={personalItem.Id === 0 ? (e) => savePersonalItem(personalItem) : (e) => updatePersonalItem(personalItem)}>{personalItem.Id === 0 ? 'Guardar' : 'Actualizar'}</Button>
                <Button color="danger" size="sm" className="me-2" onClick={closeModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );
};

export default StudentModal;
