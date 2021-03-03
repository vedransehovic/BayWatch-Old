import React, { Component } from 'react';
import firebase from './firebase';
import 'firebase/database'
import BayItem from './bayItem';
import Welcome from './Welcome';
import ExpendList from './ExpendList';
import catalogItems from './suggested';
import Autocomplete from 'react-autocomplete';
import NavIcons from './components/navigationIcons.js';

class BayClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bay: props.match.params.id,
            loc: props.match.params.loc,
            list: [],
            jobName: '',
            techName: '',
            currentItem: '',
            catalog: [],
            suggestions: [],
            value: '',
            information: true,
            checklist: false,
            expendables: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTechName = this.getTechName.bind(this);
        this.starSubmit = this.starSubmit.bind(this);
        this.viewChecklist = this.viewChecklist.bind(this);
        this.viewInfoPanel = this.viewInfoPanel.bind(this);
        this.viewExpendables = this.viewExpendables.bind(this);
    }

    handleChange(e) {
        const catalog = this.state.catalog;
        this.setState({
            [e.target.name]: e.target.value
        });
        var suggestions = catalog.filter(item => item.toLowerCase().includes(e.target.value.toLowerCase()))
        if (e.target.value.length >= 1) {
            this.setState({
                suggestions: suggestions
            })
        }

        console.log(suggestions);
    }

    viewInfoPanel(e) {
        console.log('show me information please');
        this.setState({
            information: true,
            checklist: false,
            expendables: false
        })
    }

    viewChecklist(e) {
        console.log('show me checklist please');
        this.setState({
            checklist: true,
            information: false,
            expendables: false
        })
    }

    viewExpendables(e) {
        console.log('show me expendables please');
        this.setState({
            expendables: true,
            checklist: false,
            information: false
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref(`bays/bay${this.props.match.params.id}/items/`);
        const classifyRef = firebase.database().ref('classifyitems');


        const item = {
            item: this.state.currentItem,
            grabbed: false,
            received: false,
            starred: false,
            count: 1
        }

        const classifyItem = {
            item: this.state.currentItem
        }



        if (this.state.currentItem.length > 0) {
            itemsRef.push(item);
            classifyRef.push(classifyItem);

            this.setState({
                currentItem: '',
                information: false,
                checklist: true,
                expendables: false
            })
        }
    }

    starSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref(`bays/bay${this.props.match.params.id}/items/`);
        const item = {
            item: this.state.currentItem,
            grabbed: false,
            received: false,
            starred: true,
            count: 1
        }
        if (this.state.currentItem.length > 0) {
            itemsRef.push(item);

            this.setState({
                currentItem: ''
            })
        }

    }

    getTechName() {
        return this.state.techName.length > 2 ? this.state.techName : 'us';
    }

    componentWillMount() {
        document.title = `Bay ${this.props.match.params.id}`;
        const bayRef = firebase.database().ref(`bays/bay${this.props.match.params.id}`);
        bayRef.on('value', (snapshot) => {
            var bayInfo = snapshot.val();
            if (bayInfo) {
                this.setState({
                    jobName: bayInfo.jobName,
                    techName: bayInfo.techName
                })
            }
        });
        const itemsRef = firebase.database().ref(`bays/bay${this.props.match.params.id}/items/`);
        itemsRef.on('value', (snapshot) => {
            var itemsObject = snapshot.val();
            var items = [];
            for (var key in itemsObject) {
                items.push({
                    id: key,
                    item: itemsObject[key].item,
                    grabbed: itemsObject[key].grabbed,
                    received: itemsObject[key].received,
                    starred: itemsObject[key].starred,
                    count: itemsObject[key].count
                })
            }
            var receivedItems1 = items.filter(item => item.received === true && item.starred === true);
            var receivedItems2 = items.filter(item => item.received === true && item.starred === false);
            var notReceivedItems1 = items.filter(item => item.received === false && item.starred === true);
            var notReceivedItems2 = items.filter(item => item.received === false && item.starred === false);
            var arrangedItems = notReceivedItems1.concat(notReceivedItems2).concat(receivedItems1).concat(receivedItems2);
            this.setState({
                list: arrangedItems
            });
        });
        const classifyRef = firebase.database().ref('classifyitems');
        classifyRef.on('value', (snapshot) => {
            this.setState({
                catalog: catalogItems
            });
        });

    }

    render() {
        const items = this.state.list.map(item => {
            return <BayItem
                key={item.id}
                item={item}
                currentItem={this.state.currentItem}
                grabbed={item.grabbed}
                received={item.received}
                bayId={this.props.match.params.id}
                count={this.props.count}
            />
        });

        return (
            <div className='container'>
                <div className="header">
                    <p className="header_item">BAY {this.state.bay.toUpperCase()}</p>
                    <p className="header_item">{this.state.jobName}</p>
                    <p className="header_item">{this.state.techName}</p>
                </div>
                <NavIcons
                    viewChecklist={this.viewChecklist}
                    viewInfoPanel={this.viewInfoPanel}
                    viewExpendables={this.viewExpendables}
                    list={this.state.list}
                />

                <section className='addItem'>
                    <form onSubmit={this.handleSubmit} className="addItem_Form">
                        <Autocomplete
                            items={this.state.catalog}
                            inputProps={{ className: "itemInput" }}
                            wrapperStyle={{ width: '58%', display: 'inline-block' }}
                            shouldItemRender={(item, value) =>
                                this.state.currentItem.length >= 1 ? item.toLowerCase().indexOf(value.toLowerCase()) > -1 : null
                            }
                            getItemValue={item => item}
                            renderItem={
                                (item, highlighted) =>
                                <div className="menuItem" style={{ backgroundColor: highlighted ? '#000' : 'transparent' }} >
                                    {item}
                                </div>
                            }
                            renderMenu = {
                                (items, value) => (
                                    <div className="menu">
                                        <p className="suggestionsTitle">Suggestions</p>
                                        {value === '' ? (
                                            <div className="item"></div>
                                        ) : items.length === 0 ? (
                                            <div className="item">No matches for {value}</div>
                                        ) : items}
                                    </div>
                                )
                            }
                            value = { this.state.currentItem }
                            onChange = { e => this.setState({ currentItem: e.target.value }) }
                            onSelect = { value => this.setState({ currentItem: value }) }
                        />

                        <div className = "formIcons" >
                            <i className="fas fa-plus-circle fa-2x plusicon" onClick={(e) => this.handleSubmit(e)}></i>
                            <i className = "fas fa-hourglass-start fa-2x timeicon" onClick = {(e) => this.starSubmit(e)}></i>
                        </div>
                    </form>
                </section>

                <section className = 'display-item' >
                    <ul className="bayItemList">
                        {
                            this.state.checklist && items.length <= 0 ? <p className="typeSomething">Add your first item!</p> :
                                this.state.checklist && items.length >= 1 ? items :
                                    this.state.information ? <Welcome jobName={this.state.jobName} getTechName={this.getTechName} /> :
                                        this.state.expendables ? <ExpendList/> : console.log('Error')
                        }
                    </ul>
                </section>
            </div >
        );
    }
}


export default BayClient;