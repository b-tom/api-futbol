import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './details.css'


export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state ={
            leagues: [],
        }
    }

    componentDidMount() {
        const options = {
            method: 'GET',
            url: `https://rapidapi.p.rapidapi.com/v2/leagues/country/${this.props.match.params.countryName}`,
            headers: {
              'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
              'x-rapidapi-key': '67f559189fmsh87dee0a3c82426fp1f0399jsn1b45b2994700'
            }
        };
          
        axios
        .request(options)
        .then((response) => {            
            let currentLeagues = response.data.api.leagues.filter(league => league.is_current ===1).sort()
            this.setState({
                leagues: currentLeagues,
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    displayLeagues() {
        return this.state.leagues.map(league => {
            return (
                <div key={league.league_id} className='eachLeague'>
                    <Link to = {`/teams/${league.league_id}`}>
                        <h5>{league.name}</h5>
                        <img src={league.logo} alt={league.name} />
                    </Link>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <h2>Leagues</h2>
                <div className='leagueContainer'>
                    {this.state.leagues ? this.displayLeagues() : <h3>Loading...</h3>}
                </div>
            </div>
        )
    }
}
