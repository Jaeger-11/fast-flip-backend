const Score = require('../models/scores');
const CustomError = require('../errors/custom-error');
const {StatusCodes} = require('http-status-codes')

const getScores = async (req,res) => {
    const scores = await Score.find({playerId : req.user.playerId}).select('score username timeTaken')
    const totalScores = scores.reduce((acc, item) => {
        return acc += item.score;
    },0)
    const totalTimeTaken = scores.reduce((acc, item) => {
        return acc += item.timeTaken;
    },0)
    let topScore = 0;
    scores.forEach(elem => {
        elem.score > topScore ? topScore = elem.score : topScore = topScore
    });
    res.status(200).json({
        totalScores, 
        totalTimeTaken, 
        count: scores.length, 
        averageScore: (totalScores/scores.length).toFixed(2), 
        averageTimeTaken: (totalTimeTaken/scores.length).toFixed(2), 
        topScore
    })
}

const getHighScores = async (req,res) => {
    const scores = await Score.find({}).select('score username timeTaken').sort('-score')
    const highscores = scores.reduce((acc, current) => {
        let existing = acc.find(item => item.username === current.username);
        if(!existing){
            acc.push(current);
        } else if (existing.score < current.score){
            acc[acc.indexOf(existing)] = current;
        }
        return acc;
    },[]);
    res.status(200).json({highscores: highscores.slice(0,10), count: highscores.length})
}

const saveScore = async (req,res) => {
    const { username, playerId } = req.user
    const { score, timeTaken, flipsCount } = req.body
    if(!score || !timeTaken || !flipsCount){
        throw new CustomError('Required Field is missing', StatusCodes.BAD_REQUEST)
    }
    const playerScore = await Score.create({score,timeTaken, playerId, username})
    res.status(200).json(playerScore)
}

module.exports = { getScores, saveScore, getHighScores };