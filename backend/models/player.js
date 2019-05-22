const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    name: {type:String, required: [true, 'Name is required.']},
    //position: String,
    gamePlayed: {type:Number, default:0},
    gameStarted: {type:Number, default:0},
    goals: {type:Number, default:0},
    assists: {type:Number, default:0},
    cleanSheets: {type:Number, default:0},
    currentMember: {type:Number, default:true},
    status: {type:String, required: [true, 'Status is required.']}
})

const player =  mongoose.model('player', playerSchema);

export default player;