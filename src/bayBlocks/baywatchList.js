import React from 'react';

const ItemList = (props) => {
    return (
        const items = props.list.map(item => {
            return <BayItem
                key={item.id}
                item={item}
                currentItem={props.currentItem}
                grabbed={item.grabbed}
                received={item.received}
                bayId={this.props.match.params.id}
                count={props.count}
            />
        })
    )
}