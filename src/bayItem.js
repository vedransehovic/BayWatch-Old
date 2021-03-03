import React, { Component } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';

const ListItem = styled.li`
    color: ${props => props.grabbed ? "greenyellow" : "white"};
    color: ${props => props.received && (props.grabbed || !props.grabbed) ? 'gray' :
        props.grabbed && !props.received ? 'greenyellow' :
            !props.grabbed && !props.received ? 'white' : 'white'}
`

const ReceivedItem = styled.li`
    color: 'white';
    opacity: 0.8;
`

class bayItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grabbed: this.props.item.grabbed,
            received: this.props.item.received,
            starred: this.props.item.starred,
            count: this.props.item.count
        }

        this.grabItem = this.grabItem.bind(this)
        this.receivedItem = this.receivedItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.starItem = this.starItem.bind(this)
        this.increaseCount = this.increaseCount.bind(this)
        this.decreaseCount = this.decreaseCount.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.item.grabbed !== prevProps.item.grabbed || this.props.item.received !== prevProps.item.received) {
            this.setState({
                grabbed: this.props.item.grabbed,
                received: this.props.item.received,
            })
        }

        if (this.props.item.starred !== prevProps.item.starred) {
            this.setState({
                starred: this.props.item.starred,
            })
        }

        if (this.props.item.count !== prevProps.item.count) {
            this.setState({
                count: this.props.item.count,
            })
        }

    }

    grabItem(itemId) {
        const itemToGrab = firebase.database().ref(`bays/bay${this.props.bayId}/items/${itemId}`);
        console.log('it was grabbed?')
        itemToGrab.update({ grabbed: !this.state.grabbed })
    }

    notifyTech(itemId) {
        setTimeout(() => {
            if (this.state.received === true) {
                console.log('received')
            } else {
                console.log('what are you waiting for?')
            }
        }, 10000)
    }

    increaseCount(itemId) {
        const itemToIncrease = firebase.database().ref(`bays/bay${this.props.bayId}/items/${itemId}`);
        console.log('it was increased?')
        itemToIncrease.update({ count: this.state.count + 1 })
    }

    decreaseCount(itemId) {
        const itemToDecrease = firebase.database().ref(`bays/bay${this.props.bayId}/items/${itemId}`);
        console.log('it was increased?')
        itemToDecrease.update({ count: this.state.count - 1 })
    }

    receivedItem(itemId) {
        const itemToGrab = firebase.database().ref(`bays/bay${this.props.bayId}/items/${itemId}`);
        console.log('it was received?')
        itemToGrab.update({ received: !this.state.received })
        if (!this.state.received) {
            console.log('this was definitely received')
        }
    }

    removeItem(itemId) {
        const itemToRemove = firebase.database().ref(`bays/bay${this.props.bayId}/items/${itemId}`)
        itemToRemove.remove()
    }

    starItem(itemId) {
        const itemToStar = firebase.database().ref(`bays/bay${this.props.bayId}/items/${itemId}`)
        itemToStar.update({ starred: !this.state.starred })
    }



    render() {

        var item = this.props.item
        return (
            < ListItem
                className={this.props.received ? "bayItems finished" : "bayItems"}
                grabbed={item.grabbed}
                received={item.received}
            >

                <div className="bayItemsName" >


                    <p onClick={(itemId) => this.decreaseCount(item.id)} class="subtract"> - </p>
                    <p class="math">{this.state.count}</p>
                    <p onClick={(itemId) => this.increaseCount(item.id)} class="add"> + </p>
                    {this.state.starred
                        ? <span class="starred"><i class="far fa-star staricon" onClick={(itemId) => { this.starItem(item.id) }}></i></span>
                        : <span className="notStarred"><i class="far fa-star staricon" onClick={(itemId) => { this.starItem(item.id) }}></i></span>
                    }
                    <p onClick={(itemId) => this.grabItem(item.id)}>{item.item}</p>

                </div>

                <div className="bayItemsActions">
                    <i class="fas fa-check fa-2x itemicon" onClick={(itemId) => { this.receivedItem(item.id) }}></i>
                    <i class="fas fa-times fa-2x itemicon" onClick={(itemId) => { this.removeItem(item.id) }}></i>
                </div>
            </ListItem >
        )
    }
}

export default bayItem;