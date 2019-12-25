'use strinct'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('',controller.since);
router.get('/:username/details',controller.details);
router.get('/:username/repos',controller.repos);

module.exports = router;