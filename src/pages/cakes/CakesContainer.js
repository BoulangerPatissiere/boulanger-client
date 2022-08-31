import * as React from 'react';
import { useState, useEffect } from "react";
import CakeCard from '../../components/CakeCard/CakeCard';
import { api } from '../../constants';
import './CakesContainer.css';

function CakesContainer() {
    const [cakes, setCakes] = useState([]);

    useEffect(() => {
        fetch(`${api}/cakes`)
            .then(response => response.json())
            .then(data => setCakes(data.filter(cake => cake.isAvailable)));
    }, []);

    return (
        <React.Fragment>
            {cakes && cakes.length > 0 &&
                <div className="cakes-container">{cakes.map(cake => <CakeCard key={cake.id} cake={cake} />)}</div>
            }
        </React.Fragment>
    );
}

export default CakesContainer;
