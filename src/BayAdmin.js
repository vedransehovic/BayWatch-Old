import React, { Component } from 'react';
import firebase from 'firebase';
import Clock from 'react-live-clock';

import './App.css';
import SingleBay from './singleBay';

class BayAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            items: []
        }
    }

    componentDidMount() {
        //const bayRef = firebase.database().ref(`bays/`).orderByKey()
        const bayRef = firebase.database().ref('bays/').orderByChild('sort')

        bayRef.on('value', (snapshot) => {
            var items = [];

            snapshot.forEach( (child) => {
                //console.log( "child: " + child );
                console.log( "child.key: " + child.key )
                console.log( "child.val: " + child.val() );

                items.push({
                    id: child.key,
                    //bay: child.number,
                    //bay: child.key,
                    //acName: child.val().acName,
                    jobName: child.val().jobName,
                    techName: child.val().techName,
                    list: child.val().items,
                    
                    //qr: child.val().qr,
                    sort: child.val().sort
                })
            });


            // var bayInfo = snapshot.val();
            // console.log(bayInfo);
            
            // for (var key in bayInfo) {
            //     console.log( "key: " + key );
            //     console.log( "bayinfo[key]: "+bayInfo[key]);
            //     items.push({
            //         id: key,
            //         //acName: bayInfo[key].acName,
            //         jobName: bayInfo[key].jobName,
            //         techName: bayInfo[key].techName,
            //         list: bayInfo[key].items,
            //         //bay: bayInfo[key].number,
            //         //qr: bayInfo[key].qr,
            //         sort: bayInfo[key].sort
            //     })
            // }

            console.log(items);
            this.setState({
                jobs: items
            });
        })
    }

    render() {
        const items = this.state.jobs.map(item => {
            var itemsObject = item.list;
            var listItems = [];
            for (var key in itemsObject) {
                listItems.push({
                    key: key,
                    item: itemsObject[key].item,
                    grabbed: itemsObject[key].grabbed,
                    received: itemsObject[key].received,
                    starred: itemsObject[key].starred,
                    count: itemsObject[key].count
                })
            }
            return <SingleBay
                key={item.bay}
                sort={item.sort}
                jobName={item.jobName}
                techName={item.techName}
                listItems={listItems}
                bay={item.id}
                listLength={listItems.length}
                qr={item.qr}
            />
        })




        return (
            <div className='app' >
                <header>
                    <div className='wrapper'>
                        <img className="baywatchlogo" src="https://vignette.wikia.nocookie.net/logopedia/images/b/b1/Baywatch_logo.png/revision/latest?cb=20131017020359" alt="baywatch logo"></img>

                    </div>

                </header>
                <div className='container'>
                    <div className='allBays'>
                        {items}
                    </div>
                </div>
                <div className="footer-time">
                    <Clock format={'dddd, MMMM Do YYYY HH:mm'} ticking={true} timezone={'America/New_York'} />
                </div>

            </div>
        );
    }
}
export default BayAdmin;