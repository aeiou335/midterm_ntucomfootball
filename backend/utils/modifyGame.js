import game from "../models/game";

const modifyGame = {
    createGame: async (args) => {
        const newGame = new game(args);
        await newGame.save();
        return newGame;

    },
    getGame: async (args) => {
        const games = await game.find(args);
        return games;
    },
    updateGame: async (id, args) => {
        const updatedGame = await game.findByIdAndUpdate({_id:id}, args);
        return updatedGame;
    },
    deleteGame: async (id) => {
        const deletedGame = await game.findByIdAndDelete({_id:id});
        return deletedGame;

    }
}

export default modifyGame;