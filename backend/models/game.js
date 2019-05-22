const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema ({
    gameDate: String,
    gameType: String,
    opponent: String,
    result: String,
    score: String,
    ourScore: Number,
    opponentScore: Number,
    scorePlayers: Array,
    assistPlayers: Array
})

const game = mongoose.model('game', gameSchema);

export default game;