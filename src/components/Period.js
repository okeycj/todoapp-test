import React from 'react';

function Period() {
    return (
        <div>
            1. Period: 
            <select>
                <option>AM</option>
                <option>PM</option>
            </select>
            Duration:
            <select>
                <option>30 minute</option>
                <option>60 minute</option>
            </select>
            Notes: <input type="text"/><button>-</button>
        </div>
    )
}

export default Period;