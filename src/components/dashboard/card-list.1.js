import React from 'react';
import ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import Paper from 'material-ui/Paper';
import './dashboard.scss';
import UsersIcon from 'material-ui/svg-icons/social/group';
import map from 'lodash/map';
import sortby from 'lodash/sortBy';
import find from 'lodash/find';
import reverse from 'lodash/reverse';
import SortIcon from 'material-ui/svg-icons/navigation/menu';
import SortUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import SortDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import SearchIcon from 'material-ui/svg-icons/action/search';


class CardList extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        var arr = map(this.props.filterables, function (f, i) {
            return {
                curr: 0,
                name: f
            }
        })
        this.state = {
            filters: arr
        }
    }
    namefilter="";
    clickHeader(o, i) {
        var arr = map(this.state.filters, function (oo, ii) {
            if (i == ii) {
                return {
                    name: oo.name,
                    curr: (oo.curr + 1) == 3 ? 1 : oo.curr + 1
                }
            } else {
                return {
                    name: oo.name,
                    curr: 0
                }
            }
        });
        this.setState({
            filters: arr
        });
    }
    reorderList(arr) {
        var tofilter = find(this.state.filters, function (f) {
            return f.curr != 0;
        })
        if (tofilter == undefined)
            return arr;
        else {
            var sorted = tofilter.curr == 1 ? sortby(arr, function (f) { return f[tofilter.name] }) : reverse(sortby(arr, function (f) { return f[tofilter.name] }));
            return sorted;
        }
    }
    nameFilterChange(ev,props) {
        this.namefilter=ev.target.value;
    }
    render() {
        // console.log(this.state);
        return (
            <Paper zDepth={2} className="card-item">
                <div className="title-bar">
                    <UsersIcon />
                    <h3>Users</h3>
                    <div className="filler"></div>
                    <div className="table-filter">
                        <SearchIcon className="search-icon" />
                        <input placeholder="Search" type="text" onChange={(event) => { this.nameFilterChange(event,this.props) }} />
                    </div>
                </div>
                <div className="body">
                    <div className="table-head">
                        {this.props.cols.map((row, index) => (
                            <div onClick={() => { this.clickHeader(row, this.props.filterables.indexOf(row)) }} key={index} className={row == 'id' ? 'id' : ''}>
                                {
                                    this.props.filterables.indexOf(row) != -1 ?
                                        (<div className="sorter">
                                            {
                                                this.props.filterables.indexOf(row) != -1 ?
                                                    this.state.filters[this.props.filterables.indexOf(row)].curr == 0 ?
                                                        <SortIcon /> :
                                                        this.state.filters[this.props.filterables.indexOf(row)].curr == 1 ?
                                                            <SortUp /> :
                                                            this.state.filters[this.props.filterables.indexOf(row)].curr == 2 ?
                                                                <SortDown />
                                                                : ('')
                                                    : ''
                                            }
                                        </div>)
                                        : ''
                                }
                                <span>{row}</span>
                            </div>
                        ))}
                        {/* 
                        <div className="id">
                            <span>ID</span>
                        </div>
                        <div>
                            <span>Name</span>
                            <div className="sorter">
                            </div>
                        </div> */}
                    </div>
                    <Scrollbars className="list">
                        <div className="table-body">
                            {this.reorderList(this.props.dataset).map((row, index) => (
                                <div className={row.visible+" item"} key={index}>
                                    {
                                        map(this.props.cols, function (r, i) {
                                            return <div key={i} className={r == 'id' ? 'id' : ''}>
                                                <span>{row[r]}</span>
                                            </div>
                                        })
                                    }
                                    {/* <div className="id">
                                        <span>{row.id}</span>
                                    </div>
                                    <div>
                                        <span>{row.name}</span>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </Scrollbars>
                </div>
            </Paper>
        );
    }
}

export default CardList;