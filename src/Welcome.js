import React from 'react';

const Welcome = (props) => {
    return (
        <div>

            <h2>Getting Started</h2>
            <p className="welcomeItem">Welcome{props.jobName ? `, ${props.jobName}` : ` to AbelCine`}. Add an item to your list to let {props.getTechName()} know what you need! </p>

            <div className="instructions">

                <div><span><i className="fas fa-plus-circle fa-1x"></i></span> - add an item to your list.</div>

                <div><span><i className="fas fa-hourglass-start fa-1x"></i></span> - submit an item as a priority item <span><i className="far fa-star staricon"></i></span>.</div>

                <div><span><i className="greenyellow">green</i></span> - item is being grabbed.</div>
               
                <div><span><i className="fas fa-check"></i></span> - your item has been <span className="received">received</span>.</div>
                
                <div><span><i className="fas fa-times"></i></span> - erases an item from your list.</div>
            </div>

        </div >
    )
}

export default Welcome;