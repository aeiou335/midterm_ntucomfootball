import React, { Component} from 'react'
import backendUrl from "../config"

export default class Player extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            currentPlayers: [],
            pastPlayers: [],
            editMode: false,
            editedPlayerId: ""
        }
    }
    componentDidMount = async () => {
        const currBody = JSON.stringify({currentMember:true});
        const pastBody = JSON.stringify({currentMember:false});
        const currResult = await fetch(backendUrl+"/getPlayer", {
            method: 'POST',
            body: currBody,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json());
        const pastResult = await fetch(backendUrl+"/getPlayer", {
            method: 'POST',
            body: pastBody,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json());
        //console.log(currResult)
        //console.log(pastResult)
        this.setState({
            currentPlayers: currResult,
            pastPlayers: pastResult
        })
    }
    changeEditMode = () => {
       this.setState(state => ({
           editMode: !state.editMode
       }))
    }
    editPlayerName = (idx) => {
        this.setState({
            editedPlayerId: idx
        })
    }
    sendPlayerNewName = async (e, idx, type) => {
        if (this.textInput.value !== "" && e.key === "Enter"){
            const body = JSON.stringify({id:this.state.editedPlayerId, newName:this.textInput.value.trim()});
            //console.log(body)
            const result = await fetch(backendUrl+"/updatePlayer", {
                method: 'POST',
                body: body,
                headers: {"Content-Type": "application/json"}
            }).then(res => res.json());
            if (type === "current"){
                this.setState(state => {
                    const newList = this.state.currentPlayers.map(player =>{
                        if (player.id === idx) {
                            player.name = this.textInput.value.trim();
                            //console.log(player)
                            return player;
                        } else return player;
                    })
                    //console.log(newList)
                    return {
                        currentPlayers: newList,
                        editedPlayerId:""
                    }                    
                })
            } else {
                this.setState(state => {
                    const newList = this.state.pastPlayers.map(player =>{
                        if (player.id === idx) {
                            player.id = idx;
                            return player;
                        } else return player;
                    })
                    return {
                        pastPlayers: newList,
                        editedPlayerId: ""
                    }                    
                })
            }
           
        }
    } 
    deletePlayer = async (idx, type) => {
        const body = JSON.stringify({id:idx});
        const result = await fetch(backendUrl+"/deletePlayer", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json())
        .catch(err => console.log(err));
        this.setState(state => {
            let newList;
            if (type === "current"){
                newList = state.currentPlayers.filter((player, index) => player.id !== idx);
                //console.log(newList)
                return {
                    currentPlayers: newList
                }
            } else {
                newList = state.pastPlayers.filter((player, index) => player.id !== idx);
                //console.log(newList)
                return {
                    pastPlayers: newList
                }
            }          
        })
    }
    render() {
        const editButtontext = this.state.editMode ? "離開編輯模式": "進入編輯模式";
        const editButtonStyle = this.state.editMode ? {display: 'inline'}: {display:'none'};
        const currPlayers = this.state.currentPlayers.map(player =>
            (player.id != this.state.editedPlayerId) ?
            <span className="player-item">
                <li className="intro-player" key={player.id}>{player.name}</li>
                <button onClick={() => this.editPlayerName(player.id, "current")} style={editButtonStyle}>編輯球員名稱</button>
                <button onClick={() => this.deletePlayer(player.id, "current")} style={editButtonStyle}>刪除球員</button>
            </span>
            :
            <span className="player-item">
                <li key={player.id} className="intro-player"><input type="text" defaultValue={player.name} ref={ input => this.textInput = input } autoFocus onBlur={() => this.editPlayerName("")} onKeyPress={(e) => this.sendPlayerNewName(e,player.id,"current")}/></li>
                <button onClick={() => this.editPlayerName(player.id, "current")} style={editButtonStyle}>編輯球員名稱</button>
                <button onClick={() => this.deletePlayer(player.id, "current")} style={editButtonStyle}>刪除球員</button>
            </span>
        );
        const pastPlayers = this.state.pastPlayers.map(player => 
            (player.id != this.state.editedPlayerId) ?
            <span className="player-item">                
                <li className="intro-player" key={player.id}>{player.name}</li>
                <button onClick={() => this.editPlayerName(player.id, "past")} style={editButtonStyle}>編輯球員名稱</button>
                <button onClick={() => this.deletePlayer(player.id, "past")} style={editButtonStyle}>刪除球員</button>           
            </span>
            :
            <span className="player-item">                
                <li className="intro-player" key={player.id}>123</li>
                <button onClick={() => this.editPlayerName(player.id, "past")} style={editButtonStyle}>編輯球員名稱</button>
                <button onClick={() => this.deletePlayer(player.id, "past")} style={editButtonStyle}>刪除球員</button>           
            </span>
        );

        return (
            <div className="post">
                <h1 className="post-title">管理球隊</h1>
                <button onClick={this.changeEditMode}>{editButtontext}</button>
                <h3>現任隊員</h3>
                <ul>
                    {currPlayers}
                </ul>
                <h3>過去隊員</h3>
                <ul>
                    {pastPlayers}
                </ul>
            </div>
        )
    }
}