import React, { Component} from 'react'
import backendUrl from "../config"

export default class History extends Component {
    constructor(prop){
        super(prop);
        this.state = {
            editMode: false,
            deleteMode: false,
            addMode: false,
            games: [],
            gameDate: "",
            opponent:"",
            result:"",
            score:""
        }
    }
    componentDidMount = async () => {
        const body = JSON.stringify({});
        const result = await fetch(backendUrl+"/getGame", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json());
        this.setState({
            games: result
        })
    }
    changeEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
            deleteMode: false,
            addMode: false
        }))
    }
    changeAddMode = () => {
        this.setState(state => ({
            addMode: !state.addMode
        }))
    }
    changeDeleteMode = () => {
        this.setState(state => ({
            deleteMode: !state.deleteMode
        }))
    }
    handleInputChange = (event) => {
        let changeName = event.target.name;
        this.setState({ [changeName]: event.target.value });
        console.log(this.state)
    }
    addGame = async (event) => {
        
        const body = JSON.stringify({gameDate:this.state.gameDate, opponent:this.state.opponent, result:this.state.result, score:this.state.score});
        const response = await fetch(backendUrl+"/createGame", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json());
        this.setState(state => ({
            games: [...state.games, response],
            addMode: false
        }))
        event.preventDefault();
    }
    deleteGame = async (idx) => {
        const body = JSON.stringify({id:idx});
        //console.log(body)
        const result = await fetch(backendUrl+"/deleteGame", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json());
        this.setState(state => {
            let newList = state.games.filter((game) => game._id !== idx)
            return {
                games: newList,
            }
        })
        
    }
    render () {
        const editButtontext = this.state.editMode ? "離開編輯模式": "進入編輯模式";
        const editButtonStyle = this.state.editMode ? {display: 'inline'}: {display:'none'};
        const deleteButtonStyle = this.state.deleteMode ? {display: 'block'}: {display:'none'};
        const noGameText = this.state.games.length === 0 ? "目前沒有資料": ""
        const games = this.state.games.map(game => 
            <tr key={game._id}>
                <td>{game.gameDate}</td>
                <td>{game.opponent}</td>
                <td>{game.result}</td>
                <td>{game.score}</td>
                <button className="middleButton" onClick={()=>this.deleteGame(game._id)} style={deleteButtonStyle}>刪除比賽</button>               
            </tr>
        );
        let addForm;
        if (this.state.addMode){
            addForm = 
            <div>
            <div>
                <label>比賽日期：</label>
                <input type="text" id="gameDate" name="gameDate" required="required" onChange={this.handleInputChange} />
            </div>
            <div>
                <label>對手：</label>
                <input type="text" id="opponent" name="opponent" required="required" onChange={this.handleInputChange} />
            </div>
            <div>
                <label>結果：</label>
                <input type="text" id="result" name="result" required="required" onChange={this.handleInputChange} />
            </div>
            <div>
                <label>比數：</label>
                <input type="text" id="score" name="score" required="required" onChange={this.handleInputChange} />
            </div>
            <button className="submitButton" onClick={this.addGame}>送出比賽</button>
        
            </div>
            } else {
            addForm = <span></span>
        }
        return (
            <div className="post">
                <h1 className="post-title">
                    比賽成績
                </h1>
                <button onClick={this.changeEditMode}>{editButtontext}</button><br></br>
                <button onClick={this.changeAddMode} style={editButtonStyle}>新增模式</button>
                <button onClick={this.changeDeleteMode} style={editButtonStyle}>刪除模式</button>
                {addForm}
                <table>
                    <tr>
                        <td>比賽日期</td>
                        <td>對手</td>
                        <td>結果</td>
                        <td>比數</td>
                        <td style={deleteButtonStyle}>刪除按鈕</td>
                    </tr>
                    {games}
                </table>
                <div className="noGame">{noGameText}</div>
            </div>
        )
    }
}