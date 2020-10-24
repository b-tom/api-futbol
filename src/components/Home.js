import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';


export default class Countries extends Component {
    constructor() {
        super();
        this.state = {
            listOfCountries: [],
            countriesToShow: [],
        }
    }

    componentDidMount() {
  
        const options = {
        method: 'GET',
        url: 'https://rapidapi.p.rapidapi.com/v2/countries',
        headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': '67f559189fmsh87dee0a3c82426fp1f0399jsn1b45b2994700'
        }
        };
        
        axios
        .request(options)
        .then((response) => {
            this.setState({
            listOfCountries: response.data.api.countries,
            countriesToShow: response.data.api.countries,
            })
        })
        .catch( (error) => {
            console.error(error);
        }
        );
    
    }

    displayCountries() {
        return this.state.countriesToShow.map(country => {
            return (
                <div key={country.country} className='flags'>
                    <Link to = {`/details/${country.country}`}>
                        <img src={country.flag} alt={country.country} />
                        <h5>{country.country}</h5>
                    </Link>
                </div>
            )
        })
    }

    onChange = (event) => {
        const { name , value } = event.target;
        this.setState({
          [name]: value,
        });
    };

    onSearch = async (event) => {
        const { value } = event.target;
        this.onChange(event);
        const filteredCountry = this.state.listOfCountries.filter((item) =>
          item.country.toLowerCase().includes(value)
        );
        this.setState({
          countriesToShow: filteredCountry,
        });
    };

    render() {
        return (
            <div className='mainContainer'>
                <h2>Countries</h2>
                <div className= "md-form active-cyan active-cyan-2 mb-3 searchBar" >
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search"
                        name="search"
                        onChange={this.onSearch}
                    />
                </div>
                <div className='flagContainer'>
                    {this.state.listOfCountries ? this.displayCountries() : <h3>Loading ...</h3>}
                </div>
            </div>
        )
    }
}
