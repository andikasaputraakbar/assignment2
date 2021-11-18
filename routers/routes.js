const express = require("express");
const router = express.Router();

const playerRouter = require('./player.routes');
const barrackRouter = require('./barrack.routes');
const farmRouter = require('./farm.routes');
const marketRouter = require('./market.routes');

router.use('/player', playerRouter);
router.use('/barrack', barrackRouter);
router.use('/farm', farmRouter);
router.use('/market', marketRouter);


module.exports = router;