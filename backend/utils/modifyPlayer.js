import player from "../models/player";

const modifyPlayer = {
    createPlayer: async (status, name) => {
        const playerExists = await player.findOne({name:name});
        console.log(playerExists)
        if (!playerExists){
            let newPlayer = new player({name:name, status:status});
            await newPlayer.save();
            return newPlayer;
        }
        else{
            throw new Error("Player exists!");
        }
        
    },
    getPlayer: async (args) => {
        const players = await player.find(args);
        //console.log(players)
        let result = [];
        for (let player of players){
            result.push({name:player.name,id:player._id});
        }
        return result;
    },
    getActivePlayer: async () => {
        const activePlayers = await player.find({status:"player",activeMember:true});
        for (let player of activePlayers){
            result.push({name:player.name,id:player._id});
        }
        return result;
    },
    updatePlayer: async (id, args) => {
        const updatedPlayer = await player.findByIdAndUpdate({_id: id}, args);
        return updatedPlayer;
    },
    deletePlayer: async (id) => {
        const deletedPlayer = await player.findByIdAndDelete({_id: id})
        return deletedPlayer;
    }
}
export default modifyPlayer;
