import React from 'react';
import Paper from 'material-ui/Paper';
import UsersIcon from 'material-ui/svg-icons/social/group';
import ProjectsIcon from 'material-ui/svg-icons/action/assessment';
import POIcon from 'material-ui/svg-icons/action/assignment';
import SearchIcon from 'material-ui/svg-icons/action/search';
import DRIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import { Scrollbars } from 'react-custom-scrollbars';
import LoaderOverlay from '../loader/loader';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import map from 'lodash/map';
import './dashboard.scss';
import CardList from './card-list';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: null,
            selectedProject: null,
            selectedPO: null,
            prefilterProj: null,
            prefilterPO: null,
            prefilterDR: null,
        }
        this.chooseUser = this.chooseUser.bind(this);
        this.chooseProject = this.chooseProject.bind(this);
        this.choosePO = this.choosePO.bind(this);
    }
    chooseUser(o) {
        // console.log("this is from dashboard.js",o);
        if (o !== this.state.selectedUser)
            this.setState({
                selectedUser: o,
                prefilterProj: o,
                selectedProject: null,
                prefilterPO: null,
                selectedPO: null,
                prefilterDR: null
            });
        else {
            this.setState({
                selectedUser: null,
                prefilterProj: null,
                selectedProject: null,
                prefilterPO: null,
                selectedPO: null,
                prefilterDR: null
            });
        }
    }
    chooseProject(o) {
        // console.log("this is from dashboard.js",o);
        if (o !== this.state.selectedProject)
            this.setState({
                selectedProject: o,
                prefilterPO: o,
                selectedPO: null,
                prefilterDR: null
            });
        else {
            this.setState({
                selectedProject: null,
                prefilterPO: null,
                selectedPO: null,
                prefilterDR: null
            });
        }
    }
    choosePO(o) {
        // console.log("this is from dashboard.js",o);
        if (o !== this.state.selectedPO)
            this.setState({
                selectedPO: o,
                prefilterDR: o
            });
        else {
            this.setState({
                selectedPO: null,
                prefilterDR: null
            });
        }
    }
    render() {
        // console.log("this is from dashboard.js render()",this.state);
        return (
            <div className="dashboard-container">
                <CardList
                    url="https://jsonplaceholder.typicode.com/users"
                    icon={<UsersIcon />}
                    clickevent={this.chooseUser}
                    selected={this.state.selectedUser}
                    title="Users"
                    activedata={false}
                    cols={["id", "name"]}
                    filterables={["name"]} />
                <CardList
                    url="https://jsonplaceholder.typicode.com/users"
                    icon={<ProjectsIcon />}
                    clickevent={this.chooseProject}
                    selected={this.state.selectedProject}
                    prefilter={this.state.prefilterProj}
                    title="Projects"
                    activedata={true}
                    cols={["id", "email"]}
                    filterables={["email"]} />
                <CardList
                    url="https://jsonplaceholder.typicode.com/users"
                    icon={<POIcon />}
                    clickevent={this.choosePO}
                    selected={this.state.selectedPO}
                    prefilter={this.state.prefilterPO}
                    title="Purchase Orders"
                    activedata={true}
                    cols={["id", "website"]}
                    filterables={["website"]} />
                <CardList
                    url="https://jsonplaceholder.typicode.com/users"
                    icon={<DRIcon />}
                    prefilter={this.state.prefilterDR}
                    title="Delivery Reports"
                    activedata={false}
                    cols={["id", "phone"]}
                    filterables={["phone"]} />
            </div>
        );
    }
}

export default Dashboard;