import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import './App.css'; // Make sure this points to your CSS file

function Sales() {
    const [sales, setSales] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/sales')
            .then(response => {
                if (!response.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return response.json();
            })
            .then(data => {
                setIsPending(false);
                setError(null);
                setSales(data.sales);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            });
    }, []);

    return (
        <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
                <h1>Sales</h1>
                {error && <div>Error: {error}</div>}
                {isPending && <div>Loading...</div>}
                {sales && (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Customer</th>
                            <th>Item</th>
                            <th>Total Sales</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sales.map(sale => (
                            <tr key={sale.SalesID}>
                                <td>{new Date(sale.SalesDate).toLocaleDateString()}</td>
                                <td>{sale.Quantity}</td>
                                <td className="break-word">{sale.CustomerName}</td>
                                <td className="break-word">{sale.ItemName}</td>
                                <td>${sale.TotalSales}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </Col>
            <Col sm={1}></Col>
        </Row>
    );
}

export default Sales;

