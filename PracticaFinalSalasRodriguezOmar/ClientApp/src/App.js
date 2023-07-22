import { Container, Row, Col, Card, CardHeader, CardBody, Button, Input } from "reactstrap";
import { useEffect, useState } from 'react';
import PersonalItemTable from "./components/PersonalItemTable";
import PersonalItemModal from "./components/PersonalItemModal";

const App = () => {
    const [personalItems, setPersonalItems] = useState([]);
    const [countStudents, setCountStudents] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(null);
    const [search, setSearch] = useState("");
    const [interval, setInterval] = useState(null);

    // GET
    const getPersonalItems = async () => {
        const response = await fetch("http://localhost:5213/api/PersonalItem?" + new URLSearchParams({ search }));

        if (!response.ok) {
            setPersonalItems([]);
            return;
        }

        const data = await response.json();
        setPersonalItems(data);
        setEdit(null);
    }

    // DELETE
    const deletePersonalItem = async (id) => {
        var confirm = window.confirm("¿Deseas eliminar el elemento?");
        if (!confirm) return;

        const response = await fetch("http://localhost:5213/api/PersonalItem/" + id, {
            method: "DELETE",
        });

        if (!response.ok) return window.alert("No se ha podido eliminar el elemento");

        getPersonalItems();
    };

    // POST
    const savePersonalItem = async (personalItem) => {
        const itemTemp = { ...personalItem };
        if (itemTemp.hasOwnProperty('Id')) {
            delete itemTemp.Id;
        }
        itemTemp.IsCompleted = Boolean(itemTemp.IsCompleted);
        const response = await fetch("http://localhost:5213/api/PersonalItem?", {
            method: "POST",
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify(itemTemp),
        });

        if (!response.ok) {
            window.alert("No se ha podido registrar el elemento");
            return;
        }
        setShowModal(!showModal);
        getPersonalItems();
    };

    // PATCH
    const updatePersonalItem = async (personalItem) => {
        personalItem.IsCompleted = Boolean(personalItem.IsCompleted);
        const response = await fetch("http://localhost:5213/api/PersonalItem/" + personalItem.Id, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify(personalItem),
        });

        if (!response.ok) {
            window.alert("No se ha podido actualizar el elemento");
            return;
        }


        setShowModal(!showModal);
        getPersonalItems();
    };

    // HANDLE INPUT SEARCH
    const handleChange = () => {
        if (interval) {
            clearInterval(interval);
        }

        const timeout = setTimeout(() => {
            getPersonalItems();
        }, 500);

        setInterval(timeout);
    };


    useEffect(() => {
        handleChange();
    }, [search]);


    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <div className="d-flex justify-content-between">
                                <h5>Mis tareas</h5>
                                <div className="d-flex gap-3">
                                    <Button size="sm" color="success" style={{ 'whiteSpace': 'nowrap'  }} onClick={() => setShowModal(!showModal)}>Agregar tarea</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>

                            <PersonalItemTable
                                personalItems={personalItems}
                                deletePersonalItem={deletePersonalItem}
                                setEdit={setEdit}
                                setShowModal={setShowModal}
                                showModal={showModal}
                            />

                        </CardBody>
                    </Card>

                </Col>
            </Row>

            <PersonalItemModal
                showModal={showModal}
                setShowModal={setShowModal}
                savePersonalItem={savePersonalItem}
                edit={edit}
                setEdit={setEdit}
                updatePersonalItem={updatePersonalItem}
            />
        </Container>
    );
}

export default App;