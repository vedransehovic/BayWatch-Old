import React, { Component } from 'react';
import firebase from './firebase';
import 'firebase/database';


class ExpendList extends Component {
    constructor(props) {
    	console.log("ExpendList.js - constructor()");

    	super(props);
    	this.state = {
    		itemCount : 0,
    		expendItems : []
    	}
    }

    componentDidMount() {
    	console.log("ExpendList.js - componentDidMount()");

    	const itemsRef = firebase.database().ref('expendables/');
        itemsRef.on('value', (snapshot) => {
        	console.log("ExpendList.js - on value");
        	console.log()

            var itemsObject = snapshot.val();
            var items = [];
            for (var key in itemsObject) {
                items.push({
                    id: key,
                    cat: itemsObject[key].cat,
                    code: itemsObject[key].code,
                    name: itemsObject[key].name,
                    price: itemsObject[key].price
                })
            }

            this.setState({ 
            	expendItems: items,
            	itemCount: items.length
            });
        });
    }

    render(){
    	console.log("ExpendList.js - render()");

    	const mapExpendItems = this.state.itemCount > 0 
    	?
	    	this.state.expendItems.map(item=>{
	    		return(
	    			<tr id="{item.id}" className="expend-item">
	    				<td className="expend-cell category">{item.cat}</td>
	    				<td className="expend-cell code">{item.code}</td>
	    				<td className="expend-cell name">{item.name}</td>
	    				<td className="expend-cell price">${item.price}</td>
	    			</tr>
	    		)
	    	})
	    :
	    	<div>Loading items...</div>
	    ;

    	return(
    		<div className="expend-list">
	    		<div className="expend-title">ABELCINE EXPENDABLES</div>
	    		<br/>
	    		<table className="expend-table">
	    			<tr>
    					<th>CODE</th>
    					<th>NAME</th>
    					<th>PRICE</th>
	    			</tr>
	    			{mapExpendItems}
	    		</table>
	    	</div>
    	);
    }

}

export default ExpendList;
        