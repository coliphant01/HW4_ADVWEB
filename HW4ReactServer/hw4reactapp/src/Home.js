import React from 'react';
import useFetch from "./useFetch";
import { Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import CustomerList from "./CustomerList";
import ProductList from "./ProductList";
import SalesList from "./SalesList";

function Home(props) {
    let url = "http://localhost:8000/home";
    const { data, isPending, error } = useFetch(url);

    const tCustomers = "Top Customers";
    const tProducts = "Top Products";
    const sByMonth = "Sales By Month";

    return (
        <Row>
            <Col sm={1}>
            </Col>
            <Col sm={3}>
                {error && <div> Error: {error} </div>}
                {isPending && <div> Loading ...</div>}
                {data && <CustomerList customers={data} title={tCustomers} />}
                <Link to="/customers" className="btn btn-primary">Show All</Link>
            </Col>
            <Col sm={3}>
                {error && <div> Error: {error} </div>}
                {isPending && <div> Loading ...</div>}
                {data && <ProductList products={data} title={tProducts} />}
                <Link to="/items" className="btn btn-primary">Show All</Link>
            </Col>
            <Col sm={3}>
                {error && <div> Error: {error} </div>}
                {isPending && <div> Loading ...</div>}
                {data && <SalesList sales={data} title={sByMonth} />}
                <Link to="/sales" className="btn btn-primary">Show All</Link>
            </Col>
        </Row>
    );
}

export default Home;
