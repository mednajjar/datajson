const express = require('express');
const route = express.Router();
const { updatePharmacie, addPharmacie, deletePharmacie } = require('../controllers/adminController');


route.post('/update/:id', updatePharmacie);
route.post('/add', addPharmacie);
route.post('/delete/:id', deletePharmacie);

module.exports = route;