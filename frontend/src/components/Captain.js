import React, { Component } from "react";
import backendUrl from "../config"

export default class Captain extends Component {
    constructor(prop){
        super(prop);
        this.state = {
            captain: []
        }
    }
    componentDidMount = async () => {
        const body = JSON.stringify({status:"captain"});
        const result = await fetch(backendUrl+"/getPlayer", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json());
        this.setState({
            captain: result
        })
    }
    render() {
        let captain;
        if (this.state.captain.length === 0){
            captain = <li>目前沒隊長</li>
        } else {
            captain = this.state.captain.map(player => 
                <li key={player.id} className="intro-player">{player.name}</li>
            )
        }
       
        return (
            <ul>
                {captain}
            </ul>
        )
    }
}