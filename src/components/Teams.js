import React, { Component } from 'react';
import axios from 'axios';
import OneTeam from './OneTeam'
import './teams.css'

export default class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            teamsToShow: [],
            standings:[],
            showDetails: false,
            clickedId:'',
        }
    }

    componentDidMount() {
        const options = {
            method: 'GET',
            url: `https://rapidapi.p.rapidapi.com/v2/teams/league/${this.props.match.params.leagueid}`,
            headers: {
              'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
              'x-rapidapi-key': '67f559189fmsh87dee0a3c82426fp1f0399jsn1b45b2994700'
            }
        };
        const options2 = {
            method: 'GET',
            url: `https://rapidapi.p.rapidapi.com/v2/leagueTable/${this.props.match.params.leagueid}`,
            headers: {
              'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
              'x-rapidapi-key': '67f559189fmsh87dee0a3c82426fp1f0399jsn1b45b2994700'
            }
        };
          
        axios
        .request(options)
        .then((response) => {            
            this.setState({
                teams: response.data.api.teams,
                teamsToShow: response.data.api.teams,
            })
        })
        .catch((error) => {
            console.error(error);
        });
        
        axios
        .request(options2)
        .then((response) => {            
            this.setState({
                standings: response.data.api.standings[0],
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    displayTeams() {
        return this.state.teamsToShow.map(team => {
            const teamStanding = this.state.standings.filter(theTeam => theTeam.team_id === team.team_id);
            return (
                <div key={team.team_id} className={`team ${this.state.showDetails ? 'expanded': ''}`} >
                    <OneTeam team={team} standings={teamStanding}/>
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
        const filteredTeam = this.state.teams.filter((item) =>
          item.name.toLowerCase().includes(value)
        );
        this.setState({
          teamsToShow: filteredTeam,
        });
    };

    displayStandings() {
        return this.state.standings.map(theTeam => {
            return (
                <tr key={theTeam.team_id}>
                    <td>{theTeam.rank}</td>
                    <td>{theTeam.teamName}</td>
                    <td>{theTeam.points}</td>
                </tr>
            )
        })
    }

    showDetails(e){
        e.preventDefault();
        this.setState({
            showDetails: !this.state.showDetails
        })
    } 

    render() {
        return (
            <div className="container">
                <div className= "md-form active-cyan active-cyan-2 mb-3 searchBar" >
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search"
                        name="search"
                        onChange={this.onSearch}
                    />
                </div>
                <div className="row">
                    <div className='col-sm-8'>
                        <h2>Ranking</h2>
                        <table id="dtBasicExample" className="table" width="100%">
                            <thead>
                                <tr>
                                <th className="th-sm">Rank</th>
                                <th className="th-sm">Name</th>
                                <th className="th-sm">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.displayStandings()}
                            </tbody>
                        </table>
                    </div>
                    <div className='col-sm-4 teamsContainer'>
                        <h2>Teams</h2>
                        {this.state.teams ? this.displayTeams() : <h3>Loading...</h3>}

                    </div>
                </div>
            </div>
        )
    }
}
