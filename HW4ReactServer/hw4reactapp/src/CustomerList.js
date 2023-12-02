//mport React from 'react';
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function CustomerList({customers, title, handleDelete}) {
    console.log(customers);
    return (
        <div>
            <h2> {title} </h2>
            <Table striped bordered hover>
                <tbody>
                {customers.customers.map((customers) => (
                        <tr key = {customers.Customer}>
                            <td> {customers.CustomerName}</td>
                            <td> {customers.TotalSales}</td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
        </div>
    );
}

export default CustomerList;