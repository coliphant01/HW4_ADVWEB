import React, {useState, useEffect} from 'react';
import {Row, Col, Table, Button, Modal, Form} from 'react-bootstrap';

function Items() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({name: '', price: ''});
    const [showModal, setShowModal] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const [currentItem, setCurrentItem] = useState({id: '', name: '', price: ''});
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const fetchItems = () => {
        setIsPending(true);
        fetch('http://localhost:8000/items')
            .then(response => response.json())
            .then(data => {
                setIsPending(false);
                setError(null);
                setItems(data.items);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        setNewItem({...newItem, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/items', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newItem)
        })
            .then(() => {
                setShowModal(false);
                fetchItems(); // Re-fetch items after adding
            })
            .catch(err => console.error('Error:', err));
    };
    const handleShowUpdateModal = (item) => {
        setCurrentItem({id: item.ItemID, name: item.ItemName, price: item.ItemPrice});
        setShowUpdateModal(true);
    };
    const handleCloseUpdateModal = () => setShowUpdateModal(false);

    const handleUpdateInputChange = (e) => {
        setCurrentItem({...currentItem, [e.target.name]: e.target.value});
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/items/${currentItem.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(currentItem)
        })
            .then(() => {
                setShowUpdateModal(false);
                fetchItems(); // Re-fetch items after updating
            })
            .catch(err => console.error('Error:', err));
    };

    const handleDelete = (item) => {
        fetch(`http://localhost:8000/items/${item.ItemID}`, {
            method: 'DELETE'
        })
            .then(() => {
                fetchItems(); // Re-fetch items after deleting
            })
            .catch(err => console.error('Error:', err));
    };

    return (
        <Row>
            <Col sm = {1}></Col>
            <Col sm = {10}>
                <h1>Items</h1>
                {error && <div>Error: {error}</div>}
                {isPending && <div>Loading...</div>}
                {items && (
                    <>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map(item => (
                                <tr key = {item.ItemID}>
                                    <td className = "break-word">{item.ItemName}</td>
                                    <td>${item.ItemPrice}</td>
                                    <td>
                                        <Button variant = "primary" onClick = {() => handleShowUpdateModal(item)}>
                                            Update
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant = "danger" onClick = {() => handleDelete(item)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </Table>
                        <Button variant = "success" onClick = {handleShowModal} style = {{marginTop: '20px'}}>
                            Insert New Product
                        </Button>
                    </>
                )}
            </Col>
            <Col sm = {1}></Col>

            <Modal show = {showModal} onHide = {handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group className = "mb-3">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type = "text"
                                name = "name"
                                required
                                onChange = {handleInputChange} />
                        </Form.Group>
                        <Form.Group className = "mb-3">
                            <Form.Label>Item Price</Form.Label>
                            <Form.Control
                                type = "text"
                                name = "price"
                                required
                                onChange = {handleInputChange} />
                        </Form.Group>
                        <Button variant = "primary" type = "submit">
                            Add Item
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show = {showUpdateModal} onHide = {handleCloseUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = {handleUpdateSubmit}>
                        <Form.Group className = "mb-3">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type = "text"
                                name = "name"
                                required
                                value = {currentItem.name}
                                onChange = {handleUpdateInputChange} />
                        </Form.Group>
                        <Form.Group className = "mb-3">
                            <Form.Label>Item Price</Form.Label>
                            <Form.Control
                                type = "text"
                                name = "price"
                                required
                                value = {currentItem.price}
                                onChange = {handleUpdateInputChange} />
                        </Form.Group>
                        <Button variant = "primary" type = "submit">
                            Update Item
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Row>
    );
}

export default Items;




