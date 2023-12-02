import React from 'react';
import {Table} from "react-bootstrap";

function SalesList({sales, title, handleDelete}) {
    console.log( sales )
    return (
        <div>
            <h2> {title} </h2>
            <Table striped bordered hover>
                <tbody>
                {sales.sales.map((sales) => (
                        <tr key={sales.Sale}>
                            <td> {sales.Date}</td>
                            <td> {sales.TotalSales}</td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
        </div>
    )
}

export default SalesList;