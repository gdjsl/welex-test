import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import { Scrollbars } from 'react-custom-scrollbars';
import Paper from 'material-ui/Paper';
import './dashboard.scss';
import UsersIcon from 'material-ui/svg-icons/social/group';
import map from 'lodash/map';
import sortby from 'lodash/sortBy';
import isequal from 'lodash/isEqual';
import find from 'lodash/find';
import filter from 'lodash/filter';
import random from 'lodash/random';
import reverse from 'lodash/reverse';
import SortIcon from 'material-ui/svg-icons/navigation/menu';
import SortUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import SortDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import { isNullOrUndefined } from 'util';


class CardList extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props.prefilter)
        var arr = map(props.filterables, function (f, i) {
            return {
                curr: 0,
                name: f
            }
        })
        this.state = {
            isLoaded: false,
            error: null,
            list: [],
            filters: arr,
            nameFilter: "",
            prefilter: this.props.prefilter,
            filteredList: []
        }
    }
    clickHeader(o, i) {
        if (i !== -1) {
            var arr = this.state.filters;
            var newarr = this.state.filteredList;
            switch (arr[i].curr) {
                case 0:
                case 1:
                    newarr = sortby(newarr, function (f) { return o });
                    break;
                case 2:
                    newarr = reverse(sortby(newarr, function (f) { return o }));
                    break;
            }
            var arr = map(this.state.filters, function (oo, ii) {
                if (i === ii) {
                    return {
                        name: oo.name,
                        curr: (oo.curr + 1) === 3 ? 1 : oo.curr + 1
                    }
                } else {
                    return {
                        name: oo.name,
                        curr: 0
                    }
                }
            });
            switch (arr[i].curr) {
                case 0:
                case 1:
                    newarr = sortby(newarr, function (f) { return o });
                    break;
                case 2:
                    newarr = reverse(sortby(newarr, function (f) { return o }));
                    break;
            }
            this.setState({
                filters: arr,
                filteredList: newarr
            });
        }
    }
    componentDidMount() {
        fetch(this.props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    var mapid = random(1, 10);
                    var list = map(result, function (f) { f.mapid = random(1, 3); return f; });
                    // if (!isNullOrUndefined(prefilter))
                    //     list = map(list, function (f) { return f.mapid == prefilter.id; });
                    this.setState({
                        isLoaded: true,
                        list: list,
                        filteredList: list,
                        mapid: mapid,
                        error: null
                    });
                },
                (error) => {
                    console.log("error in getting data", error);
                    this.setState({
                        isLoaded: true,
                        items: [],
                        error: error
                    });
                }
            )
    }
    nameFilterChange(ev) {
        var arr = this.state.list;
        var filterables = this.props.filterables;
        var newarr = filter(arr, function (f) {
            var key = false;
            filterables.forEach(e => {
                if (f[e].toLowerCase().indexOf(ev.target.value) !== -1)
                    key = true;
            });
            return key;
        });
        this.setState({
            nameFilter: ev.target.value,
            filteredList: newarr
        });
    }
    clickCell(row) {
        if (this.props.clickevent)
            this.props.clickevent(row)
    }
    renderNoData() {
        return (
            <div className="nodata">
                <span>No Data</span>
            </div>
        );
    }
    renderMainList(list) {
        return (list.map((row, index) => (
            <MenuItem onClick={() => { this.clickCell(row) }} className={isequal(this.props.selected, row) ? 'active item' : 'item'} key={index}>
                {
                    map(this.props.cols, function (r, i) {
                        return <div key={i} className={r === 'id' ? 'data id' : 'data'}>
                            <span>{row[r]}</span>
                        </div>
                    })
                }
            </MenuItem>
        )))
    }
    render() {
        var prefilter = this.props.prefilter;
        var list = this.state.filteredList;
        if (prefilter) list = filter(list, function (f) { return f.mapid === prefilter.id; });
        const showProgressBar = !this.state.isLoaded ? <LinearProgress className="line" mode="indeterminate" /> : null;
        const showActiveNumbers = this.props.activedata ? (
            <div className="active-data">
                <span className="title">Active</span>
                <span className="value">999,999</span>
            </div>
        ) : null;
        return (
            <div className="column">
                <Paper zDepth={2} className="card-data">
                    {showProgressBar}
                    <div className="badge">
                        {this.props.icon}
                    </div>
                    <div className="details">
                        <span className="title">999</span>
                        <span className="subtitle">{this.props.title}</span>
                        {showActiveNumbers}
                    </div>
                </Paper>
                <Paper zDepth={2} className="card-item">
                    <div className="head">
                        <div className="filter">
                            <SearchIcon className="text-icon" />
                            <TextField className="search" hintText="Filter Table" value={this.state.nameFilter} onChange={(event) => { this.nameFilterChange(event); }} />
                        </div>
                    </div>
                    <div className="body">
                        <div className="table-head">
                            {this.props.cols.map((row, index) => (
                                <div onClick={() => { this.clickHeader(row, this.props.filterables.indexOf(row)) }} key={index} className={row === 'id' ? 'id' : ''}>
                                    {
                                        this.props.filterables.indexOf(row) !== -1 ?
                                            (<div className="sorter">
                                                {
                                                    this.props.filterables.indexOf(row) !== -1 ?
                                                        this.state.filters[this.props.filterables.indexOf(row)].curr === 0 ?
                                                            <SortIcon /> :
                                                            this.state.filters[this.props.filterables.indexOf(row)].curr === 1 ?
                                                                <SortUp /> :
                                                                this.state.filters[this.props.filterables.indexOf(row)].curr === 2 ?
                                                                    <SortDown />
                                                                    : ('')
                                                        : ''
                                                }
                                            </div>)
                                            : ''
                                    }
                                    <span>{row}</span>
                                </div>
                            ))}</div>
                        <Scrollbars className="list">
                            {
                                list.length > 0 ? this.renderMainList(list) : this.renderNoData()
                            }
                        </Scrollbars>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default CardList;