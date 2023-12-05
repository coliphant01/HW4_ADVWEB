import React, {useState, useEffect} from 'react';
import {Row, Col, Table, Button, Modal, Form} from 'react-bootstrap';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({name: '', email: ''});
    const [showModal, setShowModal] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const [currentCustomer, setCurrentCustomer] = useState({id: '', name: '', email: ''});
    const [showUpdateModal, setShowUpdateModal] = useState(false);


    const fetchCustomers = () => {
        setIsPending(true);
        fetch('http://localhost:8000/customers')
            .then(response => response.json())
            .then(data => {
                setIsPending(false);
                setError(null);
                setCustomers(data.customers);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            });
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        setNewCustomer({...newCustomer, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/customers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })
            .then(() => {
                setShowModal(false);
                setNewCustomer({name: '', email: ''}); // Reset form state
                fetchCustomers(); // Re-fetch customers after adding
            })
            .catch(err => console.error('Error:', err));
    };


    const handleShowUpdateModal = (customer) => {
        setCurrentCustomer({id: customer.CustomerID, name: customer.CustomerName, email: customer.CustomerEmail});
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setCurrentCustomer({id: '', name: '', email: ''}); // Reset current customer data
    };


    const handleUpdateChange = (e) => {
        setCurrentCustomer({...currentCustomer, [e.target.name]: e.target.value});
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/customers/${currentCustomer.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: currentCustomer.id,
                name: currentCustomer.name,
                email: currentCustomer.email
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                handleCloseUpdateModal();
                fetchCustomers(); // Re-fetch customers after updating
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <Row>
            <Col sm = {1}></Col>
            <Col sm = {10}>
                <h1>Customers</h1>
                {error && <div>Error: {error}</div>}
                {isPending && <div>Loading...</div>}
                {customers && (
                    <>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Total Sales</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers.map(customer => (
                                <tr key = {customer.CustomerID}>
                                    <td>{customer.CustomerName}</td>
                                    <td>{customer.CustomerEmail}</td>
                                    <td>{customer.TotalSales}</td>
                                    <td>
                                        <Button variant = "primary" onClick = {() => handleShowUpdateModal(customer)}>
                                            Update
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Button variant = "success" onClick = {handleShowModal} style = {{marginTop: '20px'}}>
                            Insert New Customer
                        </Button>
                    </>
                )}
            </Col>
            <Col sm = {1}></Col>

            {/* Modal for Adding New Customer */}
            <Modal show = {showModal} onHide = {handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group className = "mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type = "text"
                                name = "name"
                                required
                                value = {newCustomer.name}
                                onChange = {handleInputChange} />
                        </Form.Group>
                        <Form.Group className = "mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type = "email"
                                name = "email"
                                required
                                value = {newCustomer.email}
                                onChange = {handleInputChange} />
                        </Form.Group>
                        <Button variant = "primary" type = "submit">
                            Add Customer
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/*Modal for updating a customer*/}
            <Modal show = {showUpdateModal} onHide = {handleCloseUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = {handleUpdateSubmit}>
                        <Form.Group className = "mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type = "text"
                                name = "name"
                                required
                                value = {currentCustomer.name}
                                onChange = {handleUpdateChange}
                            />
                        </Form.Group>
                        <Form.Group className = "mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type = "email"
                                name = "email"
                                required
                                value = {currentCustomer.email}
                                onChange = {handleUpdateChange}
                            />
                        </Form.Group>
                        <Button variant = "primary" type = "submit">
                            Update Customer
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </Row>
    );
}

export default Customers;