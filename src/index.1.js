import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {
    BrowserRouter as Router,
    Route,
    Link,Switch,
    Redirect,
    withRouter} from 'react-router-dom';
import Master from './components/master/master';
import Error from './components/error/error';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.scss';
const styles={
    paper:{
        height: '60%',
        width: '30%',
        margin: '10% 35%',
        textAlign: 'center',
        display: 'inline-block',
        position: 'absolute'
    },
    button:{
        display:'block',
        margin: '10% 35%',
    }
}
const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100) // fake async
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100) // fake async
    }
  }

/*
    Sample Login Component
*/
class Login extends React.Component {
    state={
        redirectToReferrer:false,
        username:'',
        password:'',
        error:false,
    }
    login = (event) => {
        event.preventDefault();
        if(this.state.username=="admin" && this.state.password=="admin"){
            this.state.error=false;
            fakeAuth.authenticate(() => {
                this.setState(() => ({
                redirectToReferrer: true
                }))
                this.props.history.push('/');
            })
        }else{
            this.setState(() => ({error: true}))
        }
    }
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state
        if (redirectToReferrer === true) {
          <Redirect to='from' />
        }
        return (
            <div>
                <div className="login-paper">
                    <Paper style={styles.paper} zDepth={3} >
                        <h1>Welex</h1>
                        <h2>Admin Dashboard</h2>
                        <form onSubmit={this.login}>
                            <TextField
                                value={this.state.username}
                                errorText={this.state.error?' ':''}
                                floatingLabelText="Username" 
                                onChange={(event) => this.setState({username:event.target.value})}
                            />
                            <TextField
                                value={this.state.password}
                                floatingLabelText="Password"
                                errorText={this.state.error?' ':''}
                                type="password"
                                onChange={(event) => this.setState({password:event.target.value})}
                            />
                            <RaisedButton type="submit" style={styles.button} label="Login" primary={true} onClick={this.login}/>
                            <span className="error-msg">{this.state.error?'Invalid Credentials':' '}</span>
                        </form>
                    </Paper>
                </div>
            </div>
        )
    }
}

const PrivateRoute =({component:Component, path:path})=>(
    <Route path={path} render={(props)=>(
        fakeAuth.isAuthenticated === true
          ? <Component />
        //   ? <Component history={props.history} location={props.location} match={props.match} />
          : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
            }} />
      )} />
);

/*
    Main StartPoint of App
*/
class AuthExample extends React.Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <PrivateRoute path='/' component={Master} />
                    <Route component={Error}/>
                </Switch>
            </Router>
        )
    }
}


/*
    For Sign Out and Message if User has signed out.
*/
const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p>
        Welcome! <button onClick={() => {
            fakeAuth.signout(() => history.push('/'))
        }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
))

class App extends React.Component{
    render(){
        return (
            <MuiThemeProvider>
                <AuthExample />
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));