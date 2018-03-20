import React from 'react';
import ReactDOM from 'react-dom';

class PO extends React.Component{
    render(){
        return(
            <div className="route-container">
                <div className="head">
                    <div className="title">
                        <span>Purchase Orders</span>
                    </div>
                </div>
                <div className="body"></div>
            </div>
        );
    }
}

export default PO;