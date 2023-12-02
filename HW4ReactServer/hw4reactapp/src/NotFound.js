import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div>
                <h2 className='text-center'> Sorry Not found </h2>
                <p> That page cannot be found </p>
                <Link to="/"> Back to homepage </Link>
        </div>
    );
}
export default NotFound;