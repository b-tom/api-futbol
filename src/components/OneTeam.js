import React, { Component } from 'react'

export default class OneTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            showDetails:false,
        }
    }
    showDetails(e){
        e.preventDefault();
        this.setState({
            showDetails: !this.state.showDetails
        })
    } 
    render() {
        const { team } = this.props
        const { standings } = this.props
        return (
            <div key={team.team_id} className={`team ${this.state.showDetails ? 'expanded': ''}`} >
                <img src={team.logo} alt={team.name} />
                <h6>{team.name}</h6>
                <button className='btn btn-link' onClick={(e) => this.showDetails(e)}>
                    {this.state.showDetails ? 'Collapse Details' : 'Show Details'}
                </button>
                {this.state.showDetails ? <h6><b>Games Played: </b>{standings[0].all.matchsPlayed}</h6> : ''}
                {this.state.showDetails ? <h6><b>Won: </b>{standings[0].all.win}</h6> : ''}
                {this.state.showDetails ? <h6><b>Lost: </b>{standings[0].all.lose}</h6> : ''}
                {this.state.showDetails ? <h6><b>Draw: </b>{standings[0].all.draw}</h6> : ''} 
            </div>
            
        )
    }
}
