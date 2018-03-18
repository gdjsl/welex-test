import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import './loader.scss';

class LoaderOverlay extends React.Component {
    constructor(){
        super();
    }
    render() {
        if(!this.props.show)
            return (
                <div className="loader-overlay" >
                    <CircularProgress size={80} thickness={5} />
                </div>
            );
        else{
            return null;
        }
    }
}

export default LoaderOverlay;