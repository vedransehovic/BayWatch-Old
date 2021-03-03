import React from 'react';
import styled from 'styled-components';

const StartList = styled.li`
    animation: ${props => props.list.length < 1 ? "pulse 2s infinite" : "initial"};
    @keyframes pulse {
    0% {
        transform: scale(1)
    }
    50% {
        transform: scale(1.1)
    }
    100% {
        transform: scale(1)
    }
    }
`

const navIcons = (props) => {
    console.log(props.list.length)
    return (
        <ul className="navIcons">
            <li onClick={props.viewChecklist} className="teardrop"><button><i className="fas fa-list checklist navIcon_item"></i></button></li>
            <li onClick={props.viewInfoPanel} className="teardrop"> <button><i className="fas fa-info navIcon_item information"></i></button></li>
            <li onClick={props.viewExpendables} className="teardrop"><button><i className="fas fa-shopping-cart navIcon_item expendables" ></i></button></li>
        </ul>
    )
}

export default navIcons;