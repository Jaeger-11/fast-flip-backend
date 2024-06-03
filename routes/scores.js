const router = require('express').Router();
const { getScores, saveScore, getHighScores } = require('../controllers/scores')
const authenticationMiddleware = require('../middlewares/authentication')

router.route('/').get(authenticationMiddleware, getScores).post(authenticationMiddleware, saveScore);
router.route('/highscores').get(getHighScores);

module.exports = router