import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import './error.scss';

const style = {
    height: '60%',
    width: '30%',
    margin: '10% 35%',
    textAlign: 'center',
    display: 'inline-block',
    position: 'absolute'
};
const btnstyle = {
  margin: 12,
};

class ErrorPaper extends React.Component {
    render() {
        return (
            <div className="error-paper">
                <Paper style={style} zDepth={3} >
                    <span>This is an Error Page</span>
                    <Link to="/login">
                        <RaisedButton label="Go back to Home" primary={true} style={btnstyle} />
                    </Link>
                </Paper>
            </div>
        );
    }
}

export default ErrorPaper;