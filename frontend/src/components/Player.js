import React, { Component } from "react";
import backendUrl from "../config"
import deleteImg from "../img/x.png"
export default class Player extends Component{
    constructor(props){
        super(props);
        this.state = {
            players: [],
            addPlayer: false,
            deactivePlayer: false
        }
    }
    componentDidMount = async () => {
        const data = await fetch(backendUrl+"/intro")
        .then(res => res.json())
        .catch(err => console.log(err));
        console.log(data)
        this.setState({
            players: data
        });
    }
    addNewPlayer = () => {
        this.setState({
            addPlayer: true
        })
    }
    resetAddPlayer = () => {
        this.setState({
            addPlayer: false
        })
    }
    sendNewPlayer = async (e) => {
        //console.log(this.textInput.value)
        //console.log(e.key)
        if (this.textInput.value !== "" && e.key === "Enter"){
            const body = JSON.stringify({status:"player", name:this.textInput.value.trim()});
            //console.log(body)
            const result = await fetch(backendUrl+"/intro", {
                method: 'POST',
                body: body,
                headers: {"Content-Type": "application/json"}
            }).then(res => res.json());
            await this.setState((state) => {
                return {
                    players: [...state.players, result]
                }
            })
            this.resetAddPlayer();
        }
        
    }
    changeDeactiveMode = () => {
        this.setState(state => ({
            deactivePlayer: !state.deactivePlayer
        }))     
    }
    deactivePlayer = async (idx) => {
        const body = JSON.stringify({id:idx});
        const result = await fetch(backendUrl+"/deactive", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json());
        this.componentDidMount();
    }
    render(){
        let deleteButtonStyle, deleteButtonText;
        if (!this.state.deactivePlayer){
            deleteButtonStyle = {display:'none'};
            deleteButtonText = "退役隊員";
        } else {
            deleteButtonStyle = {display: 'inline'}
            deleteButtonText = "離開退役模式";
        }
        const players = this.state.players.map(player =>
            <span className="player-item">
                <li className="intro-player" key={player.id}>{player.name}</li>
                <img onClick={()=>this.deactivePlayer(player.id)} src={deleteImg} style={deleteButtonStyle} className="delete-button" alt="delete button"></img>
                
                </span>
        );
        let playerbutton;
        if(this.state.addPlayer){
            playerbutton = <input type="text" ref={ input => this.textInput = input } placeholder="球員名稱..." autoFocus onBlur={this.resetAddPlayer} onKeyPress={(e) => this.sendNewPlayer(e)}/>
        } else{
            playerbutton = [<button onClick={this.addNewPlayer}>新增隊員</button>,
                <button onClick={this.changeDeactiveMode}>{deleteButtonText}</button>]
        }   
        return (
            <div>
               {playerbutton}
                <ul>
                    {players}
                </ul>
            </div>
            
        )
    }
}