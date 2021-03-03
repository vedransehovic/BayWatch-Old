import React, { Component } from 'react';
import SingleItem from './singleItem';

class singleBay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleList: true,
            listLength: this.props.listLength,
            jobItems: [] || this.props.listItems,
            allItems: []
        };

        this.handleListClick = this.handleListClick.bind(this);
    }

    componentDidMount() {
        var items = this.props.listItems;
        var receivedItems1 = items.filter(item => item.received === true && item.starred === true );
        var receivedItems2 = items.filter(item => item.received === true && item.starred === false );
        var notReceivedItems1 = items.filter(item => item.received === false && item.starred === true);
        var notReceivedItems2 = items.filter(item => item.received === false && item.starred === false);
        // var arrangedItems = notReceivedItems.concat(receivedItems);
        var arrangedItems = notReceivedItems1.concat(notReceivedItems2).concat(receivedItems1).concat(receivedItems2);
        this.setState({
            allItems: arrangedItems
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.listLength !== prevProps.listLength) {
            this.setState({
                listLength: this.props.listLength
            });
        }
        if (this.props.listItems !== prevProps.listItems) {
            var items = this.props.listItems;
            var receivedItems1 = items.filter(item => item.received === true && item.starred === true );
            var receivedItems2 = items.filter(item => item.received === true && item.starred === false );
            var notReceivedItems1 = items.filter(item => item.received === false && item.starred === true);
            var notReceivedItems2 = items.filter(item => item.received === false && item.starred === false);
            // var arrangedItems = notReceivedItems.concat(receivedItems);
            var arrangedItems = notReceivedItems1.concat(notReceivedItems2).concat(receivedItems1).concat(receivedItems2);
            this.setState({
                allItems: arrangedItems
            });
        }
    }

    handleListClick() {
        this.setState(state => ({
            toggleList: !state.toggleList
        }));
    }

    setListLength() {
        this.setState({
            listLength: this.props.listItems.length
        })
    }

    render() {

        const singleBayItems = this.state.allItems;
        const mapSingleItems = singleBayItems.map(item => {
            return <SingleItem
                handleClick={this.handleClick}
                item={item.item}
                grabbed={item.grabbed}
                received={item.received}
                starred={item.starred}
                count={item.count}
            />
        })

        const bayNum = this.props.bay.toUpperCase().slice(3, 5);


        return (

            <div className="singleBay" onClick={this.handleListClick} id={this.props.bay}>
                
                <div className="singleBay_header">
                    <a href={bayNum} target="_blank">{bayNum}</a>
                    <p>{this.props.techName}</p>
                </div>
                <p className="singleBay_jobName">{this.props.jobName}</p>

                {
                    this.state.toggleList ?
                        <div>
                            <ul>
                                {mapSingleItems}
                            </ul>
                        </div> :
                        <p>Show {this.state.listLength} Item(s)</p>
                }

            </div >

        )
    }
}

export default singleBay;
