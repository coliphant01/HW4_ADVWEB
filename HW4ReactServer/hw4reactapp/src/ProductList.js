import React from 'react';
import {Table} from "react-bootstrap";

function ProductList({products, title, handleDelete}) {
    console.log( products )
    return (
        <div>
            <h2> {title} </h2>
            <Table striped bordered hover>
                <tbody>
                {products.products.map((products) => (
                        <tr key={products.Product}>
                            <td> {products.ItemName}</td>
                            <td> {products.TotalSales}</td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
        </div>
    )
}

export default ProductList;