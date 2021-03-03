import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import BayClient from './BayClient';
import BayAdmin from './BayAdmin';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      authenticated: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.passwordEnter = this.passwordEnter.bind(this)
  }

  handleChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  passwordEnter(e) {
    e.preventDefault();
    if (this.state.password === 'abel609') {
      this.setState({
        authenticated: true
      })
    }
  }



  render() {
    
    return (
      <div className='app'>

        <Router>
          <div>
            {!this.state.authenticated ?
              <div>
                <h1>Log In Now</h1>
                <section className='addItem'>
                  <form className="addItem_Form">
                    <input type="text" name="password" onChange={this.handleChange} value={this.state.password} className="itemInput" />
                    <button onClick={this.passwordEnter}>Hello</button>
                  </form>
                </section>
              </div> : null
            }
            <Route exact path="/" component={this.state.authenticated && BayAdmin} currentItem={this.props.currentItem} />
            <Route exact path="/:loc(NY|LA)/:id" component={this.state.authenticated && BayClient} />
            <Route exact path="/:id" component={this.state.authenticated && BayClient} />


          </div>
        </Router>

      </div >
    );
  }
}

export default App;
