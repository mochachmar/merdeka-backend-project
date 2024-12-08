const express = require('express');
const router = express.Router();
const archiveController = require('../controllers/archiveController');


router.post('/archive/:id', archiveController.archiveNote);

router.get('/archive', archiveController.getArchives);

router.post('/archive/restore/:id', archiveController.restoreNote);

module.exports = router;
