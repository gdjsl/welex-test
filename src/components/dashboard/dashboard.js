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
            error: null,
            isLoaded: false,
            items: [],
            tableattr: {
                users:{
                    namefilter:""
                }
            }
        };
    }
    // ChangeNameFilter(event){
    //     this.setState({
    //         tableattr:{
    //             users:{
    //                 namefilter:event.target.value
    //             }
    //         }
    //     })
    // }
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(map(result,function(f){f.visible=true;return f;}));
                    this.setState({
                        isLoaded: true,
                        items: map(result,function(f){f.visible=true;return f;})
                    });
                },
                (error) => {
                    console.log("error in getting data", error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        return (
            <div className="dashboard-container">
                <LoaderOverlay show={this.state.isLoaded} />
                <CardList dataset={this.state.items} cols={["id","name","visible"]} filterables={["name","username"]}/>
            </div>
        );
    }
}

export default Dashboard;