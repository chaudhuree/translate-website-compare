const express = require('express');
const DashboardController = require('./dashboard.controller');

const router = express.Router();

router.get('/statistics', DashboardController.getStatistics);

module.exports = router;
