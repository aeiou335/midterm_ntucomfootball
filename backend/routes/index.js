import express from 'express';
const router = express.Router();
import modifyPlayer from '../utils/modifyPlayer'
import modifyGame from '../utils/modifyGame';
import { readSync } from 'fs';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*
router.post('/signup', async function(req, res, next){
  user = await user.findOne({'user':userName});
  if (err) throw new Error('Something wrong!');
  if (!user){
    newUser = await createUser(req.body);
    return newUser;
  }
  else throw new Error('User already exists!');
});
*/
/*
{
  status: captain, viceCaptain, player
  name: string
}
*/
router.post('/deletePlayer', async function(req, res){
  const deletePlayer = await modifyPlayer.deletePlayer(req.body.id);
  res.send(deletePlayer)
})

router.post('/intro', async function(req, res){
  //console.log("body" + req.body);
  const newPlayer = await modifyPlayer.createPlayer(req.body.status, req.body.name);
  res.send({name:newPlayer.name, id:newPlayer.id});
});

router.get('/intro', async function(req, res){
  const players = await modifyPlayer.getPlayer({status:"player",currentMember:true});
  //console.log(players)
  res.send(players)
})

router.post('/updatePlayer', async function(req, res){
  const updatedPlayer = await modifyPlayer.updatePlayer(req.body.id, {name:req.body.newName});
  res.send(updatedPlayer);
})

router.post('/deactive', async function(req, res){
  const deactivatedPlayer = await modifyPlayer.updatePlayer(req.body.id, {currentMember:false})
  res.send(deactivatedPlayer);
})

router.post('/getPlayer', async function(req, res){
  const players = await modifyPlayer.getPlayer(req.body);
  //console.log(players)
  res.send(players);
})

router.post('/getGame', async function(req, res){
  const games = await modifyGame.getGame(req.body);
  res.send(games);
})

router.post('/createGame', async function (req, res){
  console.log(req.body)
  const newGame = await modifyGame.createGame(req.body);
  res.send(newGame);
})

router.post('/updateGame', async function (req, res){
  const updatedGame = await modifyGame.updateGame(req.body.id, req.body.args);
  res.send(updatedGame);
})

router.post('/deleteGame', async function (req, res){
  const deletedGame = await modifyGame.deleteGame(req.body.id)
  res.send(deletedGame);
})

module.exports = router;

/*
/intro: 介紹 現任球員名單
/history: 歷史
/result: 本季比賽成績
/stats: only for members
*/
