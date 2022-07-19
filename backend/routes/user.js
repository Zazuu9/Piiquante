const express = require('express');
const app = require('../app');
const router = express.Router();
const userCTRL = require('../controllers/user');

router.post('/signup', userCTRL.signup);
router.post('/login', userCTRL.login);
router.get('/', userCTRL.getAllUser);
router.put('/:id', userCTRL.modifyUser);
router.delete('/:id', userCTRL.deleteUser);

module.exports = router;