import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import UsersIcon from 'material-ui/svg-icons/social/group';
import ProjectsIcon from 'material-ui/svg-icons/action/assessment';
import POIcon from 'material-ui/svg-icons/action/assignment';
import DRIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import SearchIcon from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';
import Snackbar from 'material-ui/Snackbar';
import {
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Users from '../users/users';
import Projects from '../projects/projects';
import './master.scss';

const PurchaseOrders =()=>(<span>Purchase Orders</span>);
const DeliveryReceipts =()=>(<span>Delivery Receipts</span>);

const dataset =[
    "Daniel Mejia",
    "Skinner Little",
    "Rosalinda Ruiz",
    "Sonia Salas",
    "Turner Burns",
    "Dixon Meyers",
    "Kayla Morris",
    "Lillian Nelson",
    "Brooks Livingston",
    "Gaines Baker",
    "Genevieve Aguilar",
    "Carlene Bowman",
    "Harrington Hammond",
    "Benjamin Finch",
    "Green Beard",
    "Foley Fry",
    "Lynda Larsen",
    "Suzette Hernandez",
    "Cristina Valenzuela",
    "Ines Roth"
];

class Master extends React.Component {
    constructor(){
        super();
        this.state={
            snackbar:{
                state:false,
                message:""
            }
        }
    }
    autocompleteFilter=(text,i)=>{
        this.setState({
            snackbar:{
                state:true,
                message:"You have selected: "+text
            }
        })
        setTimeout(() => {
            this.state.snackbar={
                state:false,
                message:""
            }
        }, 1);
    }
    checkActive=(path)=>{
        if(this.props.location.pathname.indexOf(path)!=-1)
            return "active";
        else
            return "asd ";
    }
    render() {
        return (
            <div className="main-container">
                <Snackbar
                    open={this.state.snackbar.state}
                    message={this.state.snackbar.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    />
                <Drawer width={'17%'} docked={true} open={true} className="sidebar">
                    <AppBar title="Welex" showMenuIconButton={false} className="appbar"  />
                    <MenuItem className={this.checkActive("/dashboard")} onClick={() => {this.props.history.push('/dashboard');}} leftIcon={<DashboardIcon />}>Dashboard</MenuItem>
                    <MenuItem className={this.checkActive("/users")} onClick={() => {this.props.history.push('/users');}} leftIcon={<UsersIcon />}>Users</MenuItem>
                    <MenuItem className={this.checkActive("/projects")} onClick={() => {this.props.history.push('/projects');}} leftIcon={<ProjectsIcon />}>Projects</MenuItem>
                    <MenuItem className={this.checkActive("/po")} onClick={() => {this.props.history.push('/po');}} leftIcon={<POIcon />}>Purchase Orders</MenuItem>
                    <MenuItem className={this.checkActive("/dr")} onClick={() => {this.props.history.push('/dr');}} leftIcon={<DRIcon />}>Delivery Reports</MenuItem>
                    <Divider />
                </Drawer>
                <div className="content">
                    <AppBar 
                        className="appbar"
                        showMenuIconButton={false}
                        iconElementRight={
                            <div className="menu-bar">
                                <div className="border"></div>
                                <SearchIcon className="text-icon"/>
                                <AutoComplete className="main-search-input"
                                    floatingLabelText=""
                                    hintText="Search"
                                    underlineShow={false}
                                    filter={AutoComplete.fuzzyFilter }
                                    dataSource={dataset}
                                    maxSearchResults={5}
                                    onNewRequest={this.autocompleteFilter}
                                />
                            </div>
                        }>
                        
                    </AppBar>
                    <div className="content-detail">
                        {/* <Redirect from="/" to="/dashboard"/> */}
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route path="/users" component={Users}/>
                        <Route path="/projects" component={Projects}/>
                        <Route path="/po" component={PurchaseOrders}/>
                        <Route path="/dr" component={DeliveryReceipts}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Master);