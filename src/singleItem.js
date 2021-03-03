import React, { Component } from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
    color: ${props => props.grabbed ? "greenyellow" : "white"};
    color: ${props => props.received && (props.grabbed || !props.grabbed) ? 'gray' :
        props.grabbed && !props.received ? 'greenyellow' :
            !props.grabbed && !props.received ? 'white' : 'white'}
    display: flex;
    flex-wrap: wrap;
    font-size: .9em;
`
const StarIcon = styled.span`
    color: ${props => props.received ? 'gray' : 'yellow'}
`

class SingleItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleList: false,
            grabbed: this.props.grabbed,
            received: this.props.received
        }
    }

    render() {
        return (
            <ListItem
                grabbed={this.props.grabbed}
                received={this.props.received}
                className={this.props.received ? "finished" : null}>
                {this.props.starred
                    ? <span className="starred"><i className="far fa-star staricon"></i></span>
                    : <span className="notStarred"><i className="far fa-star staricon"></i></span>
                }
                <p> <span>({this.props.count})</span> {this.props.item} </p>

            </ListItem>
        )
    }
}



export default SingleItem;
