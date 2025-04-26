// src/components/VenueFinder.js
import React from 'react';
import Astar from "./Astar.js"; // Reuse your existing Astar component

function VenueFinder() {
    return (
        <div className="venue-finder">
            <h2 style={{ textAlign: 'center', color: '#fff', marginTop: '20px' }}>
                Find Nearest Venues
            </h2>
            <Astar />
        </div>
    );
}

export default VenueFinder;
