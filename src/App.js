import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Details from './components/Details';
import Teams from './components/Teams';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      listOfCountries:[],
    }
  }

  render () {
    return (
      <div className="App">
       <Navbar />
        <Switch>
          <Route 
            exact 
            path='/' 
            component={Home} 
          />
          <Route 
            exact 
            path='/details/:countryName' 
            render={(props) => <Details {...props} countries={this.state.countries} />}  
          />
          <Route
            exact
            path='/teams/:leagueid'
            render={(props) => <Teams {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
